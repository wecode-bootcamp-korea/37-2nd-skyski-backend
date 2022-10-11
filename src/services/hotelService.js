const { hotelDao } = require("../models");

const getHotlesNearByAirport = async (filter, flightFirst, flightSecond) => {
  return await hotelDao.getHotlesNearByAirport(filter, flightFirst, flightSecond);
};

module.exports = {
  getHotlesNearByAirport,
};
