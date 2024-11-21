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