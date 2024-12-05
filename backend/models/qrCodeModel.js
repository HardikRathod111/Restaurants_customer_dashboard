const mongoose = require('mongoose');

// Define the schema for the QR Code data
const qrCodeSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    trim: true,
  },
  qrName: {
    type: String,
    trim: true,
    default: null, // Optional field
  },
  additionalText: {
    type: String,
    trim: true,
    default: null, // Optional field
  },
  chooseColor: {
    type: String,
    required: true,
    default: '#ffffff', // Default QR background color
  },
  frameColor: {
    type: String,
    required: true,
    default: '#000000', // Default frame color
  },
  qrColor: {
    type: String,
    required: true,
    default: '#000000', // Default QR color
  },
  contentCategory: {
    type: String,
    required: true,
    enum: ['Food & Drink', 'Other'], // Validate allowed categories
    default: 'Other',
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation timestamp
  },
});

// Create the model
const QRCode = mongoose.model('QRCode', qrCodeSchema);

module.exports = QRCode;
