const collection = require('../model/collection.js');

const collectionController = {
  getAllCollections: async (req, res) => {
    try {
      const collections = await collection.find();
      res.json({message:"success",data: collections});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createCollection: async (req, res) => {
    try {
      const { name, description, imageUrl } = req.body;
      const newCollection = await collection.create({ name, description, imageUrl });
      res.status(201).json(newCollection);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Add other controller methods for updating, deleting, or specific operations
};

module.exports = collectionController;
