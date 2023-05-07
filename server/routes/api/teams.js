const express = require('express');
const teamRouter = express.Router();
const teamControllers = require('../../controllers/teamController');

teamRouter.post('/create', teamControllers.createTeam);

teamRouter.get('/getAll', teamControllers.getAll);

teamRouter.get('/getUserTeams/:id', teamControllers.getTeamsOfUser);

module.exports = teamRouter;