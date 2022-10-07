const catchAsync = (asyncFn) => {
  return async (req, res, next) => {
    try {
      await asyncFn(req, res, next);
    } 
    catch (err) {
      next(err);
    }
  };
};
class ApiError {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
  static badRequest(message) {
    return new this(message, 400);
  }
  static keyError(message) {
    return new this(message, 400);
  }
  static notFoundError(message) {
    return new this(message, 404);
  }
  static internalError(message) {
    return new this(message, 500);
  }
};

const globalErrorHandler = (err, req, res) => {
  if (err instanceof ApiError) res.status(err.statusCode).json(err.message);
  err = ApiError.internalError("INTERNAL_SERVER_ERROR");
  res.status(err.statusCode).json({ message: err.message });
};

module.exports = {
  catchAsync,
  ApiError,
  globalErrorHandler,
};
