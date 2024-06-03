const Product = require("../models/product.js");

exports.validProduct = (name, res) => {
  return new Promise((resolve, reject) => {
    if (!name?.trim()) {
      return res.status(400).json({ error: "Product name is required" });
    }

    const existingProduct = Product.findOne({ name });

    if (existingProduct) {
      console.log(existingProduct);
      return res.json({ error: `Product already exists` });
    }
    resolve();
  });
};

// const Product = require("../models/product.js");

// exports.validProduct = (name, res) => {
//   return new Promise((resolve, reject) => {
//     if (!name?.trim()) {
//       return res.status(400).json({ error: "Product name is required" });
//     }

//     // const Products = Product.find({ name });
//     // return res.json(Products);
//     Product.findOne({ name }, (err, existingProduct) => {
//       if (err) {
//         // return reject(err);
//         return res.status(400).json(err);
//       }
//       if (existingProduct) {
//         console.log(existingProduct);
//         return res.status(400).json(`Product already existis`);
//         // return reject(`Product ${name} already exists`);
//       }
//       resolve();
//     });
//   });
// };
