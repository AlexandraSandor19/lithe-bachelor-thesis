const express = require('express');
const router = express.Router();
const getterControllers = require('../../controllers/getterController');

router.get('/getUser/:id', getterControllers.getUserById);

module.exports = router;