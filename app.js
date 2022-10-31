const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./src/routes");
const { ApiError, globalErrorHandler } = require("./src/utils");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("combined"));

  app.use(routes);
  
  app.get("/ping", (req, res, next) => {
    res.status(200).json({ message: "pong" });
  });

  app.all("*", (req, res, next) => {
    const err = ApiError.notFoundError(
      `Can't fine '${req.originalUrl}' on this server or your '${req.method}' method is incorrect!`
    );

    res.status(err.statusCode).json({ message: err.message });
  });

  app.use(globalErrorHandler);

  return app;
};

module.exports = { createApp };
