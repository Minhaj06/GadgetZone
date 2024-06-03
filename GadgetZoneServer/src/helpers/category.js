const Category = require("../models/category.js");

exports.validCategory = (name, res) => {
  return new Promise((resolve, reject) => {
    if (!name.trim()) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const existingCategory = Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: `${name} already exists` });
    }
    resolve();
  });
};

// exports.validCategory = (name, res) => {
//   return new Promise((resolve, reject) => {
//     if (!name.trim()) {
//       return res.status(400).json({ error: "Category name is required" });
//     }

//     Category.findOne({ name }, (err, existingCategory) => {
//       if (err) {
//         return reject(err);
//       }

//       if (existingCategory) {
//         return res.status(400).json({ error: `${name} already exists` });
//       }

//       resolve();
//     });
//   });
// };

// exports.validCategory = (name, res) => {
//   return new Promise((resolve, reject) => {
//     if (!name.trim()) {
//       return res.status(400).json({ error: "Category name is required" });
//     }

//     Category.findOne({ name }, (err, category) => {
//       if (err) {
//         return res.status(400).json({ error: err.message });
//       }

//       if (category) {
//         return res.status(400).json({ error: `${name} already exists` });
//       }

//       resolve();
//     });
//   });
// };

// exports.validCategory = (name, res) => {
//   return new Promise((resolve, reject) => {
//     if (!name.trim()) {
//       return res.json({ error: "Category name is required" });
//     }

//     const existingCategory = Category.findOne({ name });
//     if (existingCategory) {
//       return res.json({ error: `${name} already exists` });
//     }
//   });
// };

// exports.validCategory = async (name, res) => {
//   try {
//     if (!name.trim()) {
//       return res.status(400).json({ error: "Category name is required" });
//     }

//     const existingCategory = await Category.findOne({ name });
//     if (existingCategory) {
//       return res.status(400).json({ error: `${name} already exists` });
//     }

//     return Promise.resolve();
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };
