import firebase from "firebase/app";
import {
  fetchMockarooCategories,
  fetchMockarooRecords
} from "../utils/mockaroo";
import _ from "lodash";
import { lorem } from "../utils/descriptionGenerator";
import { randomDate } from "../utils/dateGenerator";
import { reduceRecords, reduceRecords2 } from "@/utils/reduceRecords";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        console.log(dispatch);
        commit("setError", e);
        throw e;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");

        const categories = await fetchMockarooCategories();
        await dispatch("createCategories", { categories });

        const categoriesWithId = await dispatch("fetchCategories");
        const categoriesIds = categoriesWithId.map(category => category.id);
        console.log("#register - categories", categoriesWithId);

        const records = await fetchMockarooRecords();
        const recordsToSave = records.map(r => ({
          ...r,
          categoryId: _.sample(categoriesIds),
          date: randomDate(new Date(2020, 0, 1), new Date()).toJSON(),
          description: lorem.generateSentences(1)
        }));
        console.log("#register - records", recordsToSave);
        await dispatch("createRecords", { records: recordsToSave });

        const updatedCategories = categoriesWithId.map(category => {
          console.log("@@@@@@@", category);

          const categoryCosts = reduceRecords2(recordsToSave)(
            category.id,
            "outcome"
          );

          const defaultLimit = 2500;

          const categoryLimitToStartWith =
            categoryCosts < defaultLimit ? defaultLimit : categoryCosts + 1500;

          return {
            id: category.id,
            title: category.title,
            limit: categoryLimitToStartWith
          };
        });

        console.log("#updated", updatedCategories);
        updatedCategories.forEach(
          async updatedCategory =>
            await dispatch("updateCategory", updatedCategory)
        );

        const calculatedValue = records.reduce(reduceRecords, 0);

        console.log("#register - bill", calculatedValue);

        const billToStartWith =
          calculatedValue > 0
            ? calculatedValue + 5000
            : calculatedValue + Math.abs(calculatedValue) + 5000;

        console.log("#register - starting bill", billToStartWith);

        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            bill: billToStartWith,
            name
          });
      } catch (e) {
        commit("setError", e);
        console.log(dispatch);
        throw e;
      }
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("clearInfo");
    }
  }
};
