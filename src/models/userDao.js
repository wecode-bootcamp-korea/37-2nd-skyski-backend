const dataSource = require("./dataSource");

const getUserbyId = async (kakaoId) => {
  const result = await dataSource.query(
    `
    SELECT 
      users.kakao_id as kakaoId,
      users.email
    FROM users
    WHERE kakao_id = ${kakaoId}
    `
  );
  return result;
};

const createUserByKakao = async (kakaoId, email) => {
  return await dataSource.query(
    `
    INSERT INTO users(
      kakao_id,
      email
      ) VALUES (?, ?)
    `,
    [kakaoId, email]
  );
};

module.exports = {
  getUserbyId,
  createUserByKakao,
};
