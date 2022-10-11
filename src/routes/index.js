const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const hotelRouter = require("./hotelRouter");
const productRouter = require("./productRouter");

router.use("/oauth", userRouter);
router.use("/hotel", hotelRouter);
router.use("/price", productRouter);

module.exports = router;
