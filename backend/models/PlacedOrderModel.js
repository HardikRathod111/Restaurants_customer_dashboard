const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      items: [
        {
          itemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "MenuItem" },
          quantity: { type: Number, required: true },
          totalPrice: { type: Number, required: true },
          customizations: [{ type: String }],
        },
      ],
      paymentMethod: {
        type: String,
        enum: ["Online", "Cash"],
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
      cookingRequest: {
        type: String,
      },
      status: {
        type: String,
        default: "Pending",
      },
      orderDate: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model('PlacedOrder', orderSchema);
