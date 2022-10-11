const { searchService } = require('../services');
const { catchAsync } = require('../utils/error');

const getKeyword = catchAsync(async (req, res) => {
  // const {
  //   departureRegion, arrivalRegion, flightDepartureDate, flightArrivalDate, flightSeatClass, personnel, type,
  //   departTime, arriveTime, duration, airline, eco,
  //   sort, limit, offset } = req.query;
  const { limit, offset } = req.query

  if (!limit || !offset) { //페이지네이션을 위해 

    const err = new Error('QUERYSTRING_OMITTED');
    err.statusCode = 400;
    throw err;
  }

  const getKeyword = await searchService.getKeyword(req.query, +limit, +offset);

  res.status(200).send({ list: getKeyword });
});


module.exports = {
  getKeyword
}