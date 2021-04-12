import _ from "lodash";

export const fetchMockarooCategories = async () => {
  const numberOfCategories = Math.floor(Math.random() * 10 + 1);
  const categories = await fetch(
    `https://my.api.mockaroo.com/categories/${numberOfCategories}.json?key=2acaba40`
  ).then(categories => categories.json());

  return _.uniqBy(categories, "title");
};

export const fetchMockarooRecords = async () => {
  const records = await fetch(
    `https://my.api.mockaroo.com/records.json?key=2acaba40`
  ).then(records => records.json());

  return records;
};
