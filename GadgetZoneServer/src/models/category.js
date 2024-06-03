const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLenght: 32,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    icon: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
