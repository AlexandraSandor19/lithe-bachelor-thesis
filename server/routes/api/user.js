const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/userController');

router.get('/getOne/:id', userControllers.getUserById);

module.exports = router;