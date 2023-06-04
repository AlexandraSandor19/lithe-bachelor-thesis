const imageController = require('../../controllers/imageController');
const express = require("express");
const imageRouter = express.Router();
const upload = require('../../middleware/storage');


imageRouter.post('/upload', imageController.uploadImage);

imageRouter.post('/upload/encoded', imageController.uploadEncoded);

imageRouter.get('/user/:id', imageController.getUserImage);

imageRouter.get('/encoded/user/:id', imageController.getImageEncoded);

imageRouter.put('/update/user/:id', imageController.update);

module.exports = imageRouter;
