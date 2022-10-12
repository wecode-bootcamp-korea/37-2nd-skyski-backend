const { flightService } = require('../services');
const { catchAsync, ApiError } = require('../utils');

const getFlights = catchAsync(async (req, res) => {
  if (!limit) {
    const err = ApiError.keyError('QUERYSTRING_OMITTED');
    res.status(err.statusCode).json({ message: err.message });
  }

  const getFlights = await flightService.getFlights(req.query);

  console.log(getFlights);

  res.status(200).send(getFlights);
});

module.exports = {
  getFlights,
};

