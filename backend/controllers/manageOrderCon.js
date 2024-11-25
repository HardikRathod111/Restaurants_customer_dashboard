const manageorder = require("../models/manageOrderModel");


const addItem = async (req, res) => {
    try {
        const { itemName, ingredients, price, discount, type, spiceLevel, customizations } = JSON.parse(req.body.data);

        // Save the data in your database
        const newItem = {
            itemName,
            ingredients,
            price,
            discount,
            type,
            spiceLevel,
            customizations: JSON.parse(customizations),
            image: req.file?.path,
        };

        // Save to DB (Example with Mongoose)
        // await Item.create(newItem);

        res.status(201).json({ message: 'Item created successfully!', data: newItem });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create item.', error });
    }
  };

const createitemcontroller = async(req,res) => {
    
};


const getallitemscontroller = async(req,res) => {
    
};

const getsingleitemscontroller = async(req,res) => {
    
};

const updataitemscontroller = async(req,res) => {
    
}

const deleteitemscontroller = async(req,res) => {
    
}


module.exports = {createitemcontroller, getallitemscontroller, getsingleitemscontroller, updataitemscontroller,deleteitemscontroller, addItem};