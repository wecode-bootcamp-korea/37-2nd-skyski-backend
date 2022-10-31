require("dotenv").config();

const { createApp } = require("./app");
const { dataSource } = require("./src/models");

const start = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  await dataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error(`Error during Data Source initialization, ${err}`);
    });

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

start();
