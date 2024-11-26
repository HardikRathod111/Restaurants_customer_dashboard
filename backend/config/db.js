require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ayushipaladiya1133:8Jj7BexJOQK6UIKN@cluster0.o8caq.mongodb.net/Restaurants_customer_dashboard");
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
}

module.exports = connectDB;