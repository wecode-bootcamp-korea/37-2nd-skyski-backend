const express = require("express");
const router = express.Router();

const hotelRouter = require("./hotelRouter");

router.use("/hotel", hotelRouter);

module.exports = router;