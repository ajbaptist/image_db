const subCollection = require("../model/SubCollection.js");
const collection = require("../model/collection.js");

const subCollectionController = {
  getAllSubCollections: async (req, res) => {
    try {
      const { collectionName } = req.query;

      if (collectionName) {
        // If collectionId is provided, fetch sub-collections by that collectionId
        const subCollections = await subCollection.find({
          collectionName: collectionName,
        });
        if (subCollections.length === 0) {
          return res.status(404).json({
            message: "No sub-collections found for the provided collectionId",
          });
        }
        res.status(200).json({ message: "success", data: subCollections });
      } else {
        // If collectionId is not provided, fetch all sub-collections
        const allSubCollections = await subCollection.find();
        if (allSubCollections.length === 0) {
          return res.status(404).json({ message: "No sub-collections found" });
        }
        res.status(200).json({ message: "success", data: allSubCollections });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createSubCollection: async (req, res) => {
    try {
      const { name, collectionId, imageUrl } = req.body;
      if (!collectionId) {
        return res.status(500).json({ message: "collectionId Required" });
      }
      const existingCollection = await collection.findById(collectionId); // Assuming Collection is the model for collections
      if (!existingCollection) {
        return res.status(400).json({ message: "Invalid collectionId" });
      }
      const collectionName = existingCollection.name;
      const newSubCollection = await subCollection.create({
        name,
        collectionId,
        collectionName,
        imageUrl,
      });
      res.status(201).json(newSubCollection);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  searchSubCollectionsByCollectionName: async (req, res) => {
    try {
      const { collectionName, page = 1, limit = 10 } = req.query;

      let query = {};

      if (collectionName && collectionName.trim() !== "") {
        const regexPattern = new RegExp(`^${collectionName}`, "i");
        query = { collectionName: { $regex: regexPattern } };
      }

      const subCollections = await subCollection.paginate(query, {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        select: "-__v",
        populate: {
          path: "collectionId",
          select: "_id",
        },
      });

      if (!subCollections || subCollections.docs.length === 0) {
        return res
          .status(404)
          .json({ message: "No sub-collections found for this collection" });
      }

      const formattedSubCollections = subCollections.docs.map((sub) => {
        const formattedSub = sub.toObject();
        if (formattedSub._id) {
          formattedSub.id = formattedSub._id.toString(); // Convert ObjectId to string for id field
          delete formattedSub._id; // Remove the _id field
        }
        formattedSub.collectionId = formattedSub.collectionId
          ? formattedSub.collectionId._id.toString()
          : null;
        return formattedSub;
      });

      res.status(200).json({
        currentPage: subCollections.page,
        totalPages: subCollections.totalPages,
        totalItems: subCollections.totalDocs,
        perPage: subCollections.limit,
        subCollections: formattedSubCollections,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Add other controller methods for updating, deleting, or specific operations
};

module.exports = subCollectionController;
