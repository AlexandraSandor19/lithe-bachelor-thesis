const express = require('express');
const issueRouter = express.Router();
const issueControllers = require('../../controllers/issueController');

issueRouter.post('/create', issueControllers.createIssue);

issueRouter.get('/getAll', issueControllers.getAll);

issueRouter.get('/projects/:id', issueControllers.getProjectIssues);

issueRouter.get('/assignees/:id', issueControllers.getUserIssues);

issueRouter.get('/creators/:id', issueControllers.getCreatorIssues);

issueRouter.get('/:id', issueControllers.getIssueById);

issueRouter.put('/points/:id', issueControllers.pointIssue);

module.exports = issueRouter;