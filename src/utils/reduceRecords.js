export const reduceRecords = (total, record) => {
  if (record.type === "income") {
    total += record.amount;
  } else if (record.type === "outcome") {
    total -= record.amount;
  }
  return total;
};

export const reduceRecords2 = records => (categoryId, recordType) => {
  return records
    .filter(r => r.categoryId === categoryId)
    .filter(r => r.type === recordType)
    .reduce((total, record) => (total += record.amount), 0);
};
