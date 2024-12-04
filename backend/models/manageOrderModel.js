const mongoose = require("mongoose");

// Define Customization Schema
const CustomizationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  selection: {
    type: String,
    enum: ["multiple", "single"],
    required: true,
  },
  options: [
    {
      name: { type: String, required: true },
      detail: { type: String },
      extraRate: { type: Number, default: 0 },
    },
  ],
});

// Define Item Schema
const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0, // Optional discount field
  },
  type: {
    type: String,
    enum: ["Spicy", "Sweet"],
    required: true,
  },
  spiceLevel: {
    type: String,
    enum: ["Less Spicy", "Regular Spicy", "Extra Spicy"],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true, // Path to uploaded image
  },
  availability: {
    type: String,
    required: false, // Marked as not mandatory
    enum: ['available', 'unavailable'], // Ensure it can only have these two values
    default: 'available' // Default value
  },
  itemType: {
    type: String,
    required: true, // Ensure the type is always provided
    enum: ['veg', 'nonveg'], // Allowed values
    default: 'veg', // Default to 'veg'
  },
  customizations: [CustomizationSchema], // Embed customizations
});

module.exports = mongoose.model("Item", ItemSchema);