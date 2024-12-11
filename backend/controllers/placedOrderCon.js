const PlacedOrder = require('../models/PlacedOrderModel');

// Create a new order
const createOrder = async (req, res) => {
    try {
        console.log("Request body received:", req.body); // Log incoming data for debugging
    
        const { userId, items, paymentMethod, totalAmount, cookingRequest } = req.body;
    
        // Validate incoming data
        if (!userId || !items || items.length === 0 || !paymentMethod || !totalAmount) {
          return res.status(400).json({ message: "All fields are required" });
        }
    
        // Create a new PlacedOrder
        const newOrder = new PlacedOrder({
          userId,
          items,
          paymentMethod,
          totalAmount,
          cookingRequest: cookingRequest || null,
        });
    
        // Save the order to the database
        const savedOrder = await newOrder.save();
    
        res.status(201).json({
          message: "Order created successfully",
          order: savedOrder,
        });
      } catch (error) {
        console.error("Error creating order:", error);
    
        // Send a helpful error response
        res.status(500).json({
          message: "Failed to create order",
          error: error.message,
        });
      }
  };

  const getAllOrders = async (req, res) => {
    try {
      const orders = await PlacedOrder.find(); // Fetch all orders from the database
      res.status(200).json(orders); // Send orders to the frontend
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
  };

  const acceptOrder = async (req, res) => {
    const { orderId } = req.params;  // Assuming the orderId is passed in the URL
  
    try {
      // Find the order and update orderAccepted and status fields
      const updatedOrder = await PlacedOrder.findByIdAndUpdate(
        orderId,
        {
          orderAccepted: true,  // Set orderAccepted to true
          status: "isProgress",   // Change status to Accepted
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Send the updated order details back to the frontend
      res.status(200).json({
        message: "Order accepted successfully",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Error accepting order:", error);
      res.status(500).send("Error accepting the order");
    }
    }
  const deliverOrder = async (req, res) => {
    const { orderId } = req.params;  // Assuming the orderId is passed in the URL
  
    try {
      // Find the order and update orderAccepted and status fields
      const updatedOrder = await PlacedOrder.findByIdAndUpdate(
        orderId,
        {
          orderAccepted: true,  // Set orderAccepted to true
          status: "isDelivered",   // Change status to Accepted
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Send the updated order details back to the frontend
      res.status(200).json({
        message: "Order accepted successfully",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Error accepting order:", error);
      res.status(500).send("Error accepting the order");
    }
    }
  
  
  

module.exports = { createOrder, getAllOrders , acceptOrder ,deliverOrder };
