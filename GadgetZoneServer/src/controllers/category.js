const Category = require("../models/category.js");
const Subcategory = require("../models/subcategory");
const Product = require("../models/product.js");

const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, icon } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: `${name} already existis` });
    }

    const category = await new Category({ name, slug: slugify(name), icon }).save();
    res.status(201).json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const removed = await Category.findByIdAndDelete(categoryId);
    // Remove subcategory
    await Subcategory.deleteMany({ category: categoryId });

    res.json(removed);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.list = async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.productsByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    const products = await Product.find({ category }).populate("category");

    res.json({
      category,
      products,
    });
  } catch (err) {
    console.log(err);
  }
};
