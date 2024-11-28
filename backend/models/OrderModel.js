// Order Schema (MongoDB Example)
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who placed the order
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }, // Reference to the item
      quantity: { type: Number, default: 1 },
      itemName:{type:String},
      customizations: [
        {
          title: String,
          option: String,
        },
      ],
      totalPrice: { type: Number },
    },
  ],
  totalAmount: { type: Number },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" }, // Order status (Pending, Delivered, etc.)
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
