const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const shippingAddressSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  division: { type: String, required: true },
  district: { type: String, required: true },
  postalCode: { type: String, required: true },
  streetAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const orderSchema = new Schema(
  {
    products: [{ type: ObjectId, ref: "Product" }],
    discountPercentage: { type: Number },
    payment: {},
    buyer: { type: ObjectId, ref: "User" },
    shippingAddress: { type: shippingAddressSchema },
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true, versionKey: false }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
