const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const subcategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Subcategory = mongoose.model("Subcategory", subcategorySchema);
module.exports = Subcategory;
