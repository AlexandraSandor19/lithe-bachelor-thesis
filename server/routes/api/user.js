const express = require('express');
const multer = require('multer');
const userRouter = express.Router();
const userController = require('../../controllers/userController');
const storage = require('../../middleware/storage');
const upload = multer({ storage: storage })

userRouter.get('/getAll', userController.getAll);

userRouter.get('/data/:id', userController.data);

userRouter.put('/update/:id', userController.update);

module.exports = userRouter;