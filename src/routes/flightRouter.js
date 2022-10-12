const flightRouter = require('express').Router();
const { flightController } = require('../controllers');

flightRouter.get('', flightController.getFlights);

module.exports = flightRouter;

