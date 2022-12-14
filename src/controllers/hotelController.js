const { hotelService } = require("../services");
const { catchAsync } = require("../utils");

const getHotlesNearByAirport = catchAsync(async (req, res, next) => {
  const { flightFirst, flightSecond, filter, limit } = req.query;
  const result = await hotelService.getHotlesNearByAirport(filter, +flightFirst, +flightSecond, +limit);

  res.status(200).json(result);
});

module.exports = {
  getHotlesNearByAirport,
};
