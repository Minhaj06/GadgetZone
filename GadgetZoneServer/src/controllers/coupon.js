const Coupon = require("../models/coupon.js");

exports.create = async (req, res) => {
  try {
    const { code, discountPercentage, expiresInDays } = req.body;

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expiresInDays);

    const coupon = new Coupon({
      code,
      discountPercentage,
      expiresAt: expirationDate,
    });

    await coupon.save();

    res.json(coupon);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.read = async (req, res) => {
  try {
    const code = req.params.code;
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found!" });
    }

    res.json(coupon);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
