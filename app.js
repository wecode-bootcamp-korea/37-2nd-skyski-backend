require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./src/routes");
const { dataSource } = require("./src/models");
const { ApiError, globalErrorHandler } = require("./src/utils");

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
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

const start = async () => {
  await dataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error(`Error during Data Source initialization, ${err}`);
    });

  app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
};

start();
