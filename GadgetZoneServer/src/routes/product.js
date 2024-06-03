const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();

// Middlewares
const { requireSignin, isAdmin } = require("../middlewares/auth.js");

// Controllers
const {
  create,
  list,
  read,
  photo,
  photos,
  remove,
  update,
  filteredProducts,
  productCount,
  listProducts,
  productSearch,
  relatedProducts,
  trendingProducts,
  featuredProducts,
  getToken,
  processPayment,
  orderStatus,
} = require("../controllers/product.js");

// Create Product With Single Image
// router.post("/product", requireSignin, isAdmin, formidable(), create);

// Create Product With Multiple Images
router.post(
  "/product",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  create
);

router.get("/products", list);
router.get("/product/:slug", read);
router.get("/product/photo/:productId", photo);
router.get("/product/photos/:productId", photos);
router.delete("/product/:productId", requireSignin, isAdmin, remove);

// Update Product With Single Image
// router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);

// Update Product With Multiple Images
router.put(
  "/product/:productId",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  update
);

router.post("/filtered-products", filteredProducts);
router.get("/products-count", productCount);
router.get("/list-products/:page/:perPage", listProducts);
router.get("/products/search", productSearch);
router.get("/related-products/:productId/:categoryId", relatedProducts);
router.get("/trending-products", trendingProducts);
router.get("/featured-products", featuredProducts);

router.get("/braintree/token", getToken);
router.post("/braintree/payment", requireSignin, processPayment);
router.put("/order-status/:orderId", requireSignin, isAdmin, orderStatus);

module.exports = router;
