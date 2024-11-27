const manageorder = require("../models/manageOrderModel");

const addItem = async (req, res) => {
    try {
      console.log("req", req.file);
      
      // Extract data from the request body
      const { itemName, ingredients, price, discount, type, spiceLevel, customizations } = req.body;
  
      // Construct the new item
      const newItem = {
        itemName,
        ingredients,
        price,
        discount,
        type,
        spiceLevel,
        customizations,
        imageUrl: req.file?.path, // Ensure Multer is configured for file uploads
      };

      console.log("new Items", newItem);

  
      // Save to the database
      const manageOrderDoc = new manageorder(newItem);
      await manageOrderDoc.save();
  
      res.status(201).json({ message: 'Item created successfully!', data: manageOrderDoc });
    } catch (error) {
      console.error("Error while creating item:", error); // Log the error for debugging
      res.status(500).json({
        message: 'Failed to create item.',
        error: error.message || 'An unknown error occurred',
      });
    }
  };
  
const createitemcontroller = async(req,res) => {
    
};


const getAllItemCon = async(req,res) => {
  try {
    const items = await manageorder.find();
    res.status(200).json(items); // Ensure this is an array
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error: error.message });
  }
};

const getsingleitemscontroller = async(req,res) => {
    
};

const updataitemscontroller = async(req,res) => {
    
}

const deleteitemscontroller = async(req,res) => {
    
}


module.exports = {createitemcontroller, getAllItemCon, getsingleitemscontroller, updataitemscontroller,deleteitemscontroller, addItem};