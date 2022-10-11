const router = require("express").Router();
const { productController } = require("../controllers");

router.get("", productController.getPriceByDate);

module.exports = router;
