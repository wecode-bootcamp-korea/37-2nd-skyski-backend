const router = require("express").Router();

const { hotelController } = require("../controllers");

router.get("", hotelController.getHotlesNearByAirport);

module.exports = router;
