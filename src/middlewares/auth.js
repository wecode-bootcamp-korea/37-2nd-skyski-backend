const jwt = require("jsonwebtoken");

const accessToken = async (req, res, next) => {
  const access = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
  const { userId, userKakaoId, userAdmin } = access;

  req.userId = userId;
  req.userKakaoId = userKakaoId;
  req.userAdmin = userAdmin;
  
  return next();
};

module.exports = { accessToken };
