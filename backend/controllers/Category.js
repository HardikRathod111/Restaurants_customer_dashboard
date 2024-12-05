const Category = require('../models/Category');
const newCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const image = req.file ? req.file.path : null;

        if (!categoryName || !image) {
            return res.status(400).json({ error: 'Category name and image are required' });
        }

        const category = new Category({ categoryName, image });
        await category.save();

        res.status(201).json({ message: 'Category added successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCategory = async(req , res) => {
    try {
        const categories = await Category.find();
        res.json(categories); // Send all categories as response
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories" });
    }
}
module.exports = {newCategory , getCategory}