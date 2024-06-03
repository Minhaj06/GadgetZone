const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 160,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    description: {
      type: {},
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: ObjectId,
      ref: "Subcategory",
    },
    quantity: {
      type: Number,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    sold: {
      type: Number,
      default: 0,
    },
    // photo: {
    //   data: Buffer,
    //   contentType: String,
    // },
    photos: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  { timestamps: true, versionKey: false }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
