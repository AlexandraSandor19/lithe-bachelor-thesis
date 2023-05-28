const express = require('express');
const projectRouter = express.Router();
const projectControllers = require('../../controllers/projectController');

projectRouter.post('/create', projectControllers.createProject);

projectRouter.get('/getAll', projectControllers.getAll);

projectRouter.get('/:id', projectControllers.getProjectById);

projectRouter.get('/teams/:id', projectControllers.getTeamProjects);

module.exports = projectRouter;