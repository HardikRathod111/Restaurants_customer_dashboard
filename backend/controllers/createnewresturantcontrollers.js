const Restaurant = require("../models/createnewresturantmodel");

const createnewresturantcontroller = async (req, res) => {
    try {
        const { restaurantName, restaurantAddress, country, state, city, zipCode } = req.body;
    
        // Check if any field is missing
        if (!restaurantName || !restaurantAddress || !country || !state || !city || !zipCode) {
          return res.status(400).json({
            success: false,
            message: 'All fields are required',
          });
        }
    
        // Create new restaurant document
        const newRestaurant = new Restaurant({
          restaurantName,
          restaurantAddress,
          country,
          state,
          city,
          zipCode,
        });
    
        // Save to the database
        await newRestaurant.save();  // This will save to the database
    
        // Return success message
        res.status(201).json({
          success: true,
          message: 'Restaurant created successfully',
          data: newRestaurant,
        });
      } catch (err) {
        console.error('Error creating restaurant:', err);
        res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: err.message,
        });
      }
  };

  const getRestaurant = async (req, res) => {
    console.log('GET /getRestaurant endpoint hit');
    try {
      const restaurants = await Restaurant.find();
      res.status(200).json(restaurants);
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      res.status(500).json({ message: 'Error fetching restaurants' });
    }
  };
  
module.exports = { createnewresturantcontroller , getRestaurant};
