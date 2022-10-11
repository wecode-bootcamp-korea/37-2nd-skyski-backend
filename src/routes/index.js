const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const hotelRouter = require("./hotelRouter");

router.use("/oauth", userRouter);
router.use("/hotel", hotelRouter);

module.exports = router;
