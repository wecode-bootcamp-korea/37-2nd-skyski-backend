const { hotelService } = require("../services");
const { catchAsync } = require("../utils");

const getHotlesNearByAirport = catchAsync(async (req, res, next) => {
  const { flightFirst, flightSecond, filter } = req.query;
  const result = await hotelService.getHotlesNearByAirport(filter, +flightFirst, +flightSecond);

  res.status(201).json(result);
});

module.exports = {
  getHotlesNearByAirport,
};
