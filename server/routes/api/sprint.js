const express = require('express');
const sprintRouter = express.Router();
const sprintControllers = require('../../controllers/sprintController');

sprintRouter.post('/create', sprintControllers.startSprint);

sprintRouter.put('/issues', sprintControllers.addIssues);

module.exports = sprintRouter;