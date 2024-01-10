const express = require('express');
const router = express.Router();
const collectionController = require('../controller/collectionController');

router.get('/getCollections', collectionController.getAllCollections);
router.post('/CreateCollections', collectionController.createCollection);

// Other routes pointing to respective controller methods

module.exports = router;
