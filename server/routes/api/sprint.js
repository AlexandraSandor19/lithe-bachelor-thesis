const express = require('express');
const sprintRouter = express.Router();
const sprintControllers = require('../../controllers/sprintController');

sprintRouter.post('/create', sprintControllers.createSprint);

sprintRouter.get('/upcomming', sprintControllers.getUpcommingSprints);

sprintRouter.put('/issues', sprintControllers.addIssues);

sprintRouter.put('/state', sprintControllers.updateState);

module.exports = sprintRouter;