const database = require('./dataSource');

const getRoute = async (departureId, arrivalId) => {

  const result = await database.query(
    `
  SELECT distinct
  ro.id,
  ro.departure,
  ro.arrival
  FROM routes ro
  INNER JOIN airports a ON ro.departure = a.id
  INNER JOIN regions re ON re.id = a.region_id
  WHERE (ro.departure = ? AND ro.arrival = ?) OR (ro.departure = ? AND ro.arrival = ?) 
  `, [departureId, arrivalId, arrivalId, departureId]
  )
  return result;
}

const getRoundTrip = async (getRoute, query, limit) => {

  const routeId = [];
  getRoute.map(el => {
    routeId.push(el.id)
  })

  let roundTripData = '';
  let roundTripData2 = '';

  if (query.departureTime == undefined) {
    query.departureTime1 = '00:00'
    query.departureTime2 = '24:00'
  }

  if (query.arrivalTime == undefined) {
    query.arrivalTime1 = '00:00'
    query.arrivalTime2 = '24:00'
  }

  if (query.roundTrip == 'T') {
    console.log(query)
    roundTripData =
      `
    ,
    f2.id AS flightId2,
    ro2.id AS routeId2,
    CASE WHEN re4.id = ro2.arrival THEN re2.name END AS departure2,
    CASE WHEN re3.id = ro2.departure THEN re1.name END AS arrival2,
    LEFT(f2.departure_date,10) AS departureDate2,
    SUBSTRING(f2.departure_date,12,5) AS departureTime2,
    SUBSTRING(f2.arrival_date,12,5) AS arrivarrivalTime2,
    f2.duration AS duration2,
    al2.name AS airlineName2,
    al2.image AS airlineImage2,
    f2.price AS price2,
    f2.eco AS eco2,
    f.price + f2.price AS totalPrice,
    f.duration + f2.duration AS totalDutration
    `

    roundTripData2 = `
    AND LEFT(f2.departure_date,10) = ${query.arrivalDate}
    AND SUBSTRING(f2.departure_date,12,5) > ${query.arrivalTime1}
    AND SUBSTRING(f2.departure_date,12,5) <  ${query.arrivalTime2}
    `
    console.log("=============---------------------"
    )
    console.log(query.arrivalDate)
    console.log(roundTripData)
    console.log(roundTripData2
    )
    console.log("=============---------------------"
    )
  }

  console.log(roundTripData)
  console.log(roundTripData2)



  if (query.sort == 'minPrice' || query.sort == undefined) {
    query.sort = `f.price + f2.price`
  } else if (query.sort == "minDuration") {
    query.sort = `f.duration + f2.duration`
  }

  let filterEco = '';
  if (query.eco = 'T') {
    filterEco = `AND (f.eco = '친환경' OR f2.eco = '친환경')`
  }

  const sql = `
  SELECT distinct
  f.id AS flightId1,
  ro.id AS routeId1,
  CASE WHEN re1.id = ro.departure THEN re1.name END AS departure1,
  CASE WHEN re2.id = ro.arrival THEN re2.name END AS arrival1,
  LEFT(f.departure_date,10) AS departureDate1,
  SUBSTRING(f.departure_date,12,5) AS departureTime1,
  SUBSTRING(f.arrival_date,12,5) AS arrivarrivalTime1,
  f.duration AS duration1,
  f.eco AS eco1,
  al.name AS airlineName1,
  al.image AS airlineImage1,
  f.price AS price1
  
  ${roundTripData}

  FROM flights f
  

  INNER JOIN flights f2 ON f2.seat = f.seat 
  
  INNER JOIN routes ro ON ro.id = f.route_id
  INNER JOIN regions re1 ON re1.id = ro.departure
  INNER JOIN regions re2 ON re2.id = ro.arrival
  INNER JOIN airlines al ON al.id = f.airline_id
  INNER JOIN routes ro2 ON ro2.id = f2.route_id
  INNER JOIN regions re3 ON re3.id = ro2.departure
  INNER JOIN regions re4 ON re4.id = ro2.arrival
  INNER JOIN airlines al2 ON al.id = f2.airline_id
  
  WHERE (ro.id = ? AND ro2.id = ?)
  AND (LEFT(f.departure_date,10) = ?)
  ${roundTripData2}
  
  AND (f.seat = ? AND f2.seat = ?)
  AND (SUBSTRING(f.departure_date,12,5) >= ? AND SUBSTRING(f.departure_date,12,5) < ?)
  
  ${filterEco}
  AND NOT (al.id IN (?) OR al2.id IN (?))

  `

  console.log(sql)

  const result = await database.query(sql
    , [routeId[0], routeId[1], query.departureDate, query.flightSeatClass, query.flightSeatClass,
    query.departureTime1, query.departureTime2, query.airline, query.airline]
  )

  console.log(result)
  return result;

}


module.exports = {
  getRoute,
  getRoundTrip,
}