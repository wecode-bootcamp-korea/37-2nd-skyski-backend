const { searchService } = require('../services');
const { catchAsync, ApiError } = require('../utils');

const getKeyword = catchAsync(async (req, res) => {

  const { limit } = req.query

  if (!limit) {
    const err = ApiError.keyError("QUERYSTRING_OMITTED")
    res.status(err.statusCode).json({ message: err.message })
  };

  const getKeyword = await searchService.getKeyword(req.params, req.query, +limit);

  res.status(200).send({ list: getKeyword });
});


module.exports = {
  getKeyword
}