const express = require("express");
const router = express.Router();

// Middlewares
const { requireSignin, isAdmin } = require("../middlewares/auth.js");

// Controllers
const {
  create,
  update,
  remove,
  list,
  subcategoriesByCategoryId,
  read,
} = require("../controllers/subcategory");

router.post("/subcategory/create/:categoryId", requireSignin, isAdmin, create);
router.put("/subcategory/create/:categoryId/:subcategoryId", requireSignin, isAdmin, update);
router.get("/subcategories", list);
router.get("/subcategories-by-categoryId/:categoryId", subcategoriesByCategoryId);

// const { categoryById } = require("../middleware/category");

// // Create a new subcategory
// router.post("/subcategory/create/:categoryId", requireSignin, isAdmin, create);

// // Read a subcategory by ID
// router.get("/subcategory/:subcategoryId", read);

// // Update a subcategory by ID
// router.put("/subcategory/:subcategoryId/:userId", requireSignin, isAdmin, update);

// // Delete a subcategory by ID
// router.delete("/subcategory/:subcategoryId/:userId", requireSignin, isAdmin, remove);

// // Get a list of all subcategories
// router.get("/subcategories", list);

// // Middleware to handle userId parameter in URL
// router.param("userId", userById);

// // Middleware to handle categoryId parameter in URL
// router.param("categoryId", categoryById);

// // Middleware to handle subcategoryId parameter in URL
// router.param("subcategoryId", (req, res, next, id) => {
//   Subcategory.findById(id).exec((err, subcategory) => {
//     if (err || !subcategory) {
//       return res.status(400).json({
//         error: "Subcategory not found",
//       });
//     }
//     req.subcategory = subcategory;
//     next();
//   });
// });

module.exports = router;
