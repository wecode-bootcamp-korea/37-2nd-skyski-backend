const searchRouter = require('express').Router();
const { searchController } = require('../controllers');

searchRouter.get('', searchController.getKeyword);

module.exports = searchRouter;