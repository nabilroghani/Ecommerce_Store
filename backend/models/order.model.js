const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Kis user ne order kiya
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User model ka naam yahan aayega
      required: true,
    },
    
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", 
          required: true,
        },
      },
    ],
    
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
      postalCode: { type: String },
    },
    
    paymentMethod: {
      type: String,
      required: true,
      default: "COD", 
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      required: true,
      default: "Pending", // Pending, Shipped, Delivered, Cancelled
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;