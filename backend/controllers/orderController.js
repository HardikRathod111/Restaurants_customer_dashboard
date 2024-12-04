   // Backend: Order Controller (Node.js/Express example)
const Order = require("../models/OrderModel"); // Import the Order model
const Item = require("../models/manageOrderModel"); // Import the Item model

// Function to handle the order placement
const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Process each item
    for (const item of items) {
      const { itemId, quantity, customizations = [] } = item; // Default to empty array if customizations are missing

      if (!itemId || !quantity) {
        return res.status(400).json({ message: 'Item missing itemId or quantity' });
      }

      const itemDetails = await Item.findById(itemId);
      if (!itemDetails) {
        return res.status(404).json({ message: `Item with id ${itemId} not found` });
      }

      let itemPrice = itemDetails.price;

      // Ensure customizations is an array (if it's not, default to empty array)
      const safeCustomizations = Array.isArray(customizations) ? customizations : [];

      // Calculate price based on customizations
      safeCustomizations.forEach(customization => {
        itemPrice += customization.extraRate || 0; // Assuming `extraRate` is a property in your customization object
      });

      const orderItem = {
        itemId,
        quantity,
        customizations: safeCustomizations,
        totalPrice: itemPrice * quantity,
      };

      orderItems.push(orderItem);
      totalAmount += orderItem.totalPrice;
    }

    // Create new order
    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount,
    });

    // Save order
    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const {id} = req.params; 
    const userId = id;// Extract ID from URL

    console.log("User ID received in getOrder:", userId);
    const order = await Order.find({ userId });

    if (!order) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    res.status(200).json({ message: "Order fetched successfully.", order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Error fetching order.", error });
  }
};
const deleteItem = async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);
  

  try {
    const result = await Order.deleteOne({ _id: orderId });

    if (result.deletedCount > 0) {
      res.status(200).json({ success: true, message: "Order deleted successfully." });
    } else {
      res.status(404).json({ success: false, message: "Order not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error.", error });
  }
}

module.exports = { createOrder,getOrder, deleteItem };
