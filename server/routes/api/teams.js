const express = require('express');
const teamRouter = express.Router();
const teamControllers = require('../../controllers/teamController');

teamRouter.post('/create', teamControllers.createTeam);

teamRouter.get('/getAll', teamControllers.getAll);

teamRouter.get('/:id', teamControllers.getTeamById);

teamRouter.get('/users/:id', teamControllers.getUserTeams);

module.exports = teamRouter;