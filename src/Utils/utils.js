export const generatedRandomString = (len = 36) => {
  return Math.random()
    .toString(len)
    .slice(2);
};

export const isObjectEmpty = obj => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};
