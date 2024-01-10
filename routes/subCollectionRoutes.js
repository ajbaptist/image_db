const express = require('express');
const router = express.Router();
const subCollectionController = require('../controller/subCollectionController');

router.get('/getSubCollections', subCollectionController.getAllSubCollections);
router.post('/createSubcollection', subCollectionController.createSubCollection);
router.get('/searchSubcollection', subCollectionController.searchSubCollectionsByCollectionName);

// Other routes pointing to respective controller methods

module.exports = router;
