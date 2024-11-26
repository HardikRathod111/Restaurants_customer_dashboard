<<<<<<< HEAD
const mongoose = require("mongoose");

// Define Customization Schema
const CustomizationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  selectionType: {
    type: String,
    enum: ["Multiple Selection", "Single Selection"],
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
  customizations: [CustomizationSchema], // Embed customizations
});

module.exports = mongoose.model("Item", ItemSchema);
=======
const mongoose = require('mongoose');

const manageorderadditemSchema = new mongoose.Schema(
    {
        itemname:{
            type: String,
            require: [true, "itemname name is required"],
        },
        itemsingredients:{
            type: String,
            require: [true, "itemsingredients name is required"],
        },
        itemprice:{
            type: Number,
            require: [true, "itemprice is required"],
        },
        adddiscount:{
            type: Number,
        },
        selectitemtype:{
            type: String,
            require: [true, "selectitemtype is required"],
        },
        imageurl:{
            type: String,
            default: "https://www.google.com/imgres?q=food%20menu&imgurl=https%3A%2F%2Fmarketplace.canva.com%2FEAF5zO9Utvk%2F2%2F0%2F1131w%2Fcanva-orange-and-brown-breakfast-restaurant-menu-Qu02Z9iuDjc.jpg&imgrefurl=https%3A%2F%2Fwww.canva.com%2Fmenus%2Ftemplates%2Fbreakfast%2F&docid=-CKJi0u6rvmV6M&tbnid=aYURUdUvo_0PBM&vet=12ahUKEwiozqHBrdiJAxVdd2wGHSz_ArgQM3oECGQQAA..i&w=1131&h=1600&hcb=2&ved=2ahUKEwiozqHBrdiJAxVdd2wGHSz_ArgQM3oECGQQAA"
        },
    },{timestamps:true}
)

module.exports = mongoose.model('additem',manageorderadditemSchema);
>>>>>>> f67d06d35eb50586b28fc9bc855ec648655fbfa4
