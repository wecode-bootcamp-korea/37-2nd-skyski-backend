const dataSource = require("./dataSource");

const getHotlesNearByAirport = async (filter, flightFirst, flightSecond) => {
  let sort = (filter != "rate") ? (`ORDER BY ${filter}`) : (`ORDER BY ${filter} DESC`);
  let result = await dataSource.query(
    `
    SELECT 
      hotels.name,
      hotels.image,
      hotels.rate,
      hotels.latitude,
      hotels.longitude, 
      hotels.price,
      regions.name AS region, 
      FORMAT(ST_DISTANCE_SPHERE(point(hotels.longitude, hotels.latitude),point(airports.longitude, airports.latitude))/1000,2) AS distance 
    FROM hotels 
    INNER JOIN regions
     ON hotels.region_id = regions.id
    INNER JOIN airports
    ON airports.region_id = regions.id
    INNER JOIN routes
     ON routes.arrival =  hotels.region_id
    INNER JOIN flights
     ON flights.route_id = routes.id
    WHERE flights.id = ${flightFirst}
    ${sort}
    `
  );

  return result;
};

module.exports = {
  getHotlesNearByAirport,
};
