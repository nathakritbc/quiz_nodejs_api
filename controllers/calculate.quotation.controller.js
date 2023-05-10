const constants = require("../constants");

exports.calculateQuotation = async (req, res) => {
  try {
    const products = [
      { p_name: "ปลากระป๋อง", p_price: 25, p_amount: 5, discount: 5 },
      { p_name: "มาม่า", p_price: 6, p_amount: 500, discount: 25 },
      { p_name: "ยางลบ", p_price: 2, p_amount: 1570, discount: 3 },
      { p_name: "ไข่ไก่", p_price: 3, p_amount: 2590, discount: 2 },
      { p_name: "น้ำเปล่า", p_price: 7, p_amount: 5578, discount: 31 },
    ];

    let total_price = 0;
    let total_discount = 0;
    const productSum = products.map((value) => {
      const p_sum = value.p_price * value.p_amount;
      const sum_discount = p_sum * (value.discount / 100);
      total_price = total_price + p_sum;
      total_discount = total_discount + sum_discount;

      return {
        ...value,
        sum_discount,
        p_sum,
      };
    });
    const vat = 0.07;
    const tato_price_after_discount = total_price - total_discount;
    const tato_vat = tato_price_after_discount * vat;
    const total_net_price = tato_price_after_discount - tato_vat;
    const result = {
      productAll: productSum,
      total_price,
      total_discount,
      vat: 0.07,
      tato_price_after_discount,
      tato_vat,
      total_net_price,
    };

    res.status(200).send({
      message: constants.kResultOk,
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: constants.kResultNok,
    });
  }
};
