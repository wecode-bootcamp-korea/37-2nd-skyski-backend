const { catchAsync } = require("../utils");
const { userService } = require("../services");

const getKakaoLogin = catchAsync(async (req, res) => {
  console.log("start cont");
  let { client_id, redirect_uri, code } = req.query;
  const accesstoken = await userService.getKakao(client_id, redirect_uri, code);

  return res.status(201).json({ message: "login success", accesstoken });
});

module.exports = { getKakaoLogin };
