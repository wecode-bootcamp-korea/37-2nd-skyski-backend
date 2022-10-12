const express = require("express");
const router = express.Router();

const flightRouter = require('./flightRouter');

router.use('/flights', flightRouter);

module.exports = router;