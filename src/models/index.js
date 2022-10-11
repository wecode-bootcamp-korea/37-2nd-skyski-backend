const { dataSource } = require("./dataSource");
const userDao = require("./userDao");
const hotelDao = require("./hotelDao");
const productDao = require("./productDao");

module.exports = {
  dataSource,
  userDao,
  hotelDao,
  productDao,
};
