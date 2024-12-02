
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
  
const getItem = async(req , res) => {
  const { id } = req.params;
 
  try {
    const item = await manageorder.findById(id); // Replace with your database logic
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}


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
const updateItemsController = async (req, res) => {
  try {
    let updatedItem = req.body;
    console.log("Received item to update:", updatedItem);

    // Check if customizations is a string and parse it if it's a valid JSON string
    if (typeof updatedItem.customizations === 'string') {
      try {
        // First, try parsing it as a JSON string
        updatedItem.customizations = JSON.parse(updatedItem.customizations);
      } catch (error) {
        console.error("Error parsing customizations:", error);

        // If the string is '[object Object]' or similar invalid data, try to clean it
        // Check if customizations contains '[object Object]'
        if (updatedItem.customizations.includes('[object Object]')) {
          // Attempt to clean the string and parse it as JSON
          let cleanedString = updatedItem.customizations.replace(/\[object Object\]/g, '{}');
          try {
            updatedItem.customizations = JSON.parse(`[${cleanedString}]`);
          } catch (innerError) {
            return res.status(400).json({ message: "Invalid customizations format." });
          }
        } else {
          return res.status(400).json({ message: "Invalid customizations format." });
        }
      }
    } else if (typeof updatedItem.customizations === 'object') {
      // If customizations is already an object, no need to parse
      console.log("Customizations is already an object.");
    }

    // Proceed with the update logic
    const item = await manageorder.findByIdAndUpdate(req.params.id, updatedItem, { new: true });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully', item });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const deleteItemsController = async(req,res) => {
  const itemId = req.params.id;
    
    if (!itemId) {
        return res.status(400).json({ message: 'Item ID is required' });
    }
    
    try {
        const item = await manageorder.findByIdAndDelete(itemId);
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        
        res.status(200).json({ message: 'Item deleted successfully', item });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { getAllItemCon, getsingleitemscontroller, updateItemsController,deleteItemsController, addItem, getItem};

