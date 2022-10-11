const database = require('./dataSource');

const getKeyword = async (filtered, limit, offset) => {

  let filter = '';

  if (detime !== undefined) {
    filter += `AND` + detime;
  }
  if (altime !== undefined) {
    filter += `AND` + altime;
  }
  if (excludeAirline !== undefined) {
    filter += `AND !` + excludeAirline
  }

  const result = await database.query(
    `
    SELECT distinct
    ro.id AS routeId1,
    CASE WHEN re1.id = ro.departure THEN re1.name END AS departure,
    CASE WHEN re2.id = ro.arrival THEN re2.name END AS arrival,
    f.departure_date,
    f.arrival_date,
    SUBSTRING(f.departure_date,12,5) AS departureTime,
    SUBSTRING(f.arrival_date,12,5) AS arrivalTime,
    f.duration,
    al.name AS airlineName,
    al.image AS airlineImage,
    
    ro2.id AS routeId2,
    CASE WHEN re3.id = ro2.departure THEN re1.name END AS departure,
    CASE WHEN re4.id = ro2.arrival THEN re2.name END AS arrival,
    f2.departure_date,
    f2.arrival_date,
    SUBSTRING(f2.departure_date,12,5) AS departureTime,
    SUBSTRING(f2.arrival_date,12,5) AS arrivalTime,
    f2.duration,
    al2.name AS airlineName2,
    al2.image AS airlineImage2

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
    
    WHERE ro.id = 1 AND ro2.id = 3 AND
    (f.departure_date < '2022-10-25 13:00' AND f.departure_date >= '2022-10-20 19:00')
    AND (f2.departure_date < '2022-10-30 13:00' AND f2.departure_date >= '2022-10-25 19:00')
    
    ORDER BY f.departure_date
    ASC
   
    `
  )
  return result;

}

module.exports = {

  getKeyword
}
