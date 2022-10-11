const express = require("express");
const router = express.Router();

const searchRouter = require('./searchRouter');

router.use('/search', searchRouter);

module.exports = router;