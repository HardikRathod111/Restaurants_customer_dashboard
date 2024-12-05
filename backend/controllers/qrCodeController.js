const QRCode = require("../models/qrCodeModel");

const CreateQrCode = async (req, res) => {
  try {
    const {activeTab, link, qrName, additionalText, chooseColor, frameColor, qrColor, contentCategory } = req.body;

    if (!link) {
      return res.status(400).json({ message: 'Link is required' });
    }

    // Create a new QR code document
    const qrCode = new QRCode({
      activeTab,
      link,
      qrName,
      additionalText,
      chooseColor,
      frameColor,
      qrColor,
      contentCategory,
    });

    // Save to the database
    const savedQRCode = await qrCode.save();

    res.status(201).json({ message: 'QR Code created successfully', QRCode: savedQRCode });
  } catch (error) {
    console.error('Error saving QR Code:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};


    const getAllQrCodes = async (req, res) => {
    try {
        // Fetch all QR codes from your database (replace with actual DB query)
        const qrCodes = await QRCode.find();  // Assuming you're using MongoDB or a similar DB
    
        if (!qrCodes.length) {
            return res.status(404).json({ message: 'No QR codes found' });
        }
    
        res.status(200).json(qrCodes);
        } catch (error) {
        console.error('Error fetching QR Codes:', error);
        res.status(500).json({ message: 'Internal server error', error });
        }
    };

    const updateQrCode = async (req, res) => {
        try {
          // Get the QR code ID from the request parameters
        const { id } = req.params;
          // Find the QR code by ID
            const qrCode = await QRCode.findById(id);
            if (!qrCode) {
            return res.status(404).json({ message: 'QR Code not found' });
          }
      
          // Extract updated data from the request body
          const {activeTab, link, qrName, additionalText, chooseColor, frameColor, qrColor, contentCategory } = req.body;
      
          // Update QR code fields
          qrCode.activeTab = activeTab || qrCode.activeTab;
          qrCode.link = link || qrCode.link;
          qrCode.qrName = qrName || qrCode.qrName;
          qrCode.additionalText = additionalText || qrCode.additionalText;
          qrCode.chooseColor = chooseColor || qrCode.chooseColor;
          qrCode.frameColor = frameColor || qrCode.frameColor;
          qrCode.qrColor = qrColor || qrCode.qrColor;
          qrCode.contentCategory = contentCategory || qrCode.contentCategory;
      
          // Save the updated QR code
          const updatedQRCode = await qrCode.save();
      
          // Send success response
          res.status(200).json({ message: 'QR Code updated successfully', QRCode: updatedQRCode });
        } catch (error) {
          console.error('Error updating QR Code:', error);
          res.status(500).json({ message: 'Internal server error', error });
        }
      };


    const deleteQrCode = async (req, res) => {
        const { id } = req.params;

        try {
          // Find and delete the QR code from the database
          const result = await QRCode.findByIdAndDelete(id);
      
          if (!result) {
            return res.status(404).json({ message: 'QR Code not found' });
          }
      
          res.status(200).json({ message: 'QR Code deleted successfully' });
        } catch (error) {
          console.error('Error deleting QR Code:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      };


module.exports = { CreateQrCode,getAllQrCodes ,updateQrCode , deleteQrCode };
