const { productDao } = require("../models");

const getFakeStartDate = async () => {
  const fakeS = await productDao.getFakeStartDate();
  for (let i = 0; i < fakeS.length; i++) {
    console.log(fakeS[i].price);
  }
  return fakeS;
};

const getPriceByDate = async () => {
  const result = await productDao.getPriceByDate();
  for (let i = 0; i < result.length; i++) {
    // console.log(result[i].price);
  }
  return result;
};

module.exports = {
  getPriceByDate,
  getFakeStartDate,
};
