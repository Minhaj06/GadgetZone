const express = require("express");
const router = express.Router();

// Middlewares
const { requireSignin, isAdmin } = require("../middlewares/auth.js");

// Controllers
const { create, read } = require("../controllers/coupon.js");

router.post("/coupon", requireSignin, isAdmin, create);
router.get("/coupons/:code", read);

module.exports = router;
