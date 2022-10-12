const { flightService } = require('../services');
const { catchAsync, ApiError } = require('../utils');

const getFlights = catchAsync(async (req, res) => {

  const { limit } = req.query

  if (!limit) {
    const err = ApiError.keyError("QUERYSTRING_OMITTED")
    res.status(err.statusCode).json({ message: err.message })
  };

  const getFlights = await flightService.getFlights(req.query, +limit);

  res.status(200).send(getFlights);
});


module.exports = {
  getFlights
}