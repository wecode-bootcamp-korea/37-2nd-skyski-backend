require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./src/routes");
const { database } = require("./src/models");

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes);

app.get("/ping", (req, res, next) => {
  res.status(200).json({ message: "pong" });
});

const start = async () => {
  await database
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
