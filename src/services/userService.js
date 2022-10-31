const axios = require("axios");
const qs = require("qs");
const jwt = require("jsonwebtoken");

const { userDao } = require("../models");
const { ApiError } = require("../utils");

const getKakao = async (client_id, redirect_uri, code) => {
  const response = await axios.post(
    "https://kauth.kakao.com/oauth/token",
    qs.stringify({
      grant_type: "authorization_code",
      client_id: client_id,
      redirect_uri: redirect_uri,
      code: code,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    }
  );

  const kakaoAccessToken = response.data.access_token;

  const userInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`,
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
  });

  const id = userInfo.data.id;
  const email = userInfo.data.kakao_account.email;

  if (!id || !email) throw ApiError.keyError("KEY_ERROR");
  
  const [user] = await userDao.getUserbyId(id);

  if (!user) await userDao.createUserByKakao(id, email);

  return jwt.sign({ kakao_id: user.kakaoId }, process.env.JWT_KEY);
};

module.exports = {
  getKakao,
};
