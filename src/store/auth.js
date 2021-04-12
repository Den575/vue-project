import firebase from "firebase/app";
import {
  fetchMockarooCategories,
  fetchMockarooRecords
} from "../utils/mockaroo";
import _ from "lodash";

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
        console.log("#register - categories", categories);
        await dispatch("createCategories", { categories });

        const categoriesWithId = await dispatch("fetchCategories");
        const categoriesIds = categoriesWithId.map(category => category.id);

        const records = await fetchMockarooRecords();
        // TODO: change description during autogeneration
        const recordsToSave = records.map(r => ({
          ...r,
          categoryId: _.sample(categoriesIds),
          date: new Date().toJSON(),
          description: "ABC"
        }));
        console.log("#register - records", recordsToSave);
        await dispatch("createRecords", { records: recordsToSave });

        const calculatedValue = records.reduce((total, record) => {
          if (record.type === "income") {
            total += record.amount;
          } else if (record.type === "outcome") {
            total -= record.amount;
          }
          return total;
        }, 0);

        console.log("#register - records value", calculatedValue);

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
