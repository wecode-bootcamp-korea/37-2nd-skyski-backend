const { EventListenerTypes } = require('typeorm/metadata/types/EventListenerTypes');
const { searchDao } = require('../models');

const getKeyword = async (params, filtered, limit, offset) => {

  if (params.departure == "GMP") {
    params.departure = 1
  } else if (params.departure == 'PUS') {
    params.departure = 2
  } else {
    params.departure = 3
  }

  if (params.arrival == "GMP") {
    params.arrival = 1
  } else if (params.arrival == 'PUS') {
    params.arrival = 2
  } else {
    params.arrival = 3
  }

  const getRoute = await searchDao.getRoute(params)


  if (!Array.isArray(filtered.airline)) filtered.airline = [filtered.airline]
  const airlineId = [];
  filtered.airline.map(el => {
    let airline = ""
    if (el == "KE") {
      airline = 1
    } else if (el == "OZ") {
      airline = 2
    } else if (el == "7C") {
      airline = 3
    }
    airlineId.push(airline)
  })
  filtered.airline = airlineId

  if (filtered.detime) {
    filtered.detime1 = filtered.detime.substr(0, 2) + ":" + filtered.detime.substr(2, 2)
    filtered.detime2 = filtered.detime.substr(4, 2) + ":" + filtered.detime.substr(6, 2)
  }

  if (filtered.altime) {
    filtered.altime1 = filtered.altime.substr(0, 2) + ":" + filtered.altime.substr(2, 2)
    filtered.altime2 = filtered.altime.substr(4, 2) + ":" + filtered.altime.substr(6, 2)
  }


  // if (params.sort == undefined) {
  //   params.sort = 'minP'
  // }

  const getKeyword = await searchDao.getKeyword(getRoute, params, filtered, limit, offset)

  return getKeyword;
};

module.exports = {
  getKeyword
}