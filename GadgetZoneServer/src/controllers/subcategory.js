const Subcategory = require("../models/subcategory");
const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    // Check Parent Category Exists or Not
    const existingCategory = await Category.findOne({ _id: categoryId });
    if (!existingCategory) {
      return res.json({ error: "Parent category not exists" });
    }

    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }

    const existingSubcategory = await Subcategory.findOne({ name });
    if (existingSubcategory) {
      return res.json({ error: `${name} already existis` });
    }

    const subcategory = await new Subcategory({
      name,
      slug: slugify(name),
      category: categoryId,
    }).save();
    res.status(201).json(subcategory);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const { subcategoryId } = req.params;

    console.log(name);
    console.log("CategoryID", categoryId);
    console.log("SubcategoryID", subcategoryId);
    // Check Parent Category Exists or Not
    const existingCategory = await Category.findOne({ _id: categoryId });
    if (!existingCategory) {
      return res.json({ error: "Parent category not exists" });
    }

    const subcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      {
        name,
        slug: slugify(name),
        category: categoryId,
      },
      { new: true }
    );
    res.status(201).json(subcategory);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.list = async (req, res) => {
  Subcategory.find()
    .populate("category", "name")
    .exec((err, subcategories) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to retrieve subcategories",
        });
      }
      res.json(subcategories);
    });
};

exports.subcategoriesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const all = await Subcategory.find({ category: categoryId });
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.read = (req, res) => {
  const subcategoryId = req.params.subcategoryId;

  // Find the subcategory by ID
  Subcategory.findById(subcategoryId)
    .populate("category", "name")
    .exec((err, subcategory) => {
      if (err || !subcategory) {
        return res.status(400).json({
          error: "Subcategory not found",
        });
      }
      res.json(subcategory);
    });
};

// exports.update = (req, res) => {
//   const subcategoryId = req.params.subcategoryId;
//   const { name, category } = req.body;

//   // Find the subcategory by ID and update it
//   Subcategory.findByIdAndUpdate(
//     subcategoryId,
//     { name, category },
//     { new: true, runValidators: true }
//   )
//     .populate("category", "name")
//     .exec((err, subcategory) => {
//       if (err || !subcategory) {
//         return res.status(400).json({
//           error: "Failed to update subcategory",
//         });
//       }
//       res.json(subcategory);
//     });
// };

exports.remove = (req, res) => {
  const subcategoryId = req.params.subcategoryId;

  // Find the subcategory by ID and remove it
  Subcategory.findByIdAndRemove(subcategoryId, (err, subcategory) => {
    if (err || !subcategory) {
      return res.status(400).json({
        error: "Failed to remove subcategory",
      });
    }
    res.json({
      message: "Subcategory deleted successfully",
    });
  });
};
