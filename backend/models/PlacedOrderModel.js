const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      items: [
        {
          itemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Item" },
          quantity: { type: Number, required: true },
          totalPrice: { type: Number, required: true },
          customizations: [
            {
              _id: { type: mongoose.Schema.Types.ObjectId }, // Original customization ID
              title: { type: String }, // Title of the customization
              option: { type: String }, // Option of the customization
            },
          ],
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
        default: "make it best!",
      },
      status: {
        type: String,
        enum: ["Pending", "isProgress", "isDelivered"],
        default: "Pending",
      },
      orderDate: {
        type: Date,
        default: Date.now,
      },
      orderType: {
        type: String,
        enum: ["Onsite", "Parcel"],
        default: "Parcel",
        required: true,
      },
      orderAccepted: {
        type: Boolean,
        enum: [true, false],
        default: false,
      },
});   

orderSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: "items.itemId", // Populate itemId in the items array
      model: "Item",        // Reference the Item model
    },
    {
      path: "userId",       // Populate userId
      model: "User",        // Reference the User model
    }
  ]);
  next();
});

module.exports = mongoose.model('PlacedOrder', orderSchema);