const searchRouter = require('express').Router();
const { searchController } = require('../controllers');

searchRouter.get('/pd', searchController.getKeyword);
searchRouter.get('/wb/:departure/:arrival/:departureDate/:arrivalDate/:flightSeatClass', searchController.getKeyword);

module.exports = searchRouter;