const router = require("express").Router();
const { userController } = require("../controllers");

router.post("", userController.getKakaoLogin);

module.exports = router;
