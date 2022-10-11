const { searchDao } = require('../models');

const searchService = async (filtered, limit, offset) => {

  const getKeyword = await searchDao.getKeyword(filtered, limit, offset)



};

module.exports = {
  searchService
};

//1. detime/altime/excludeAirline 받아올 때
//3. 편도/왕복 구분 어떻게