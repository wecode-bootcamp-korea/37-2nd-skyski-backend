const { productService } = require("../services");

const getFakeStartDate = async () => {
  return await productService.getFakeStartDate();
};

const getPriceByDate = async (req, res) => {
  const result = await productService.getPriceByDate();
  console.log(result);
  return res.status(200).json({ result });
};

// const getFakeEndDate = () => {
//     const
// }

module.exports = {
  getPriceByDate,
  getFakeStartDate,
};
