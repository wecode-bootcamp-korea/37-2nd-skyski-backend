const { dataSource } = require("./dataSource");

const getFakeStartDate = async () => {
  return await dataSource.query(`
    SELECT
        flights.departure_date as Ddate,
        flights.arrival_date as Adate,
        flights.price
        FROM flights`);
};

const getPriceByDate = async () => {
  const result = await dataSource.query(`
    SELECT
        flights.departure_date as Ddate,
        flights.arrival_date as Adate,
        flights.price
        FROM flights
    `);
  console.log(result);
  return result;
};

module.exports = {
  getPriceByDate,
  getFakeStartDate,
};
