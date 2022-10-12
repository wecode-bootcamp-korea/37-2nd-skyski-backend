const express = require("express");
const router = express.Router();

const searchRouter = require('./searchRouter');

router.use('/filter', searchRouter);

module.exports = router;