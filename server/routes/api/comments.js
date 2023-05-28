const express = require('express');
const commentRouter = express.Router();
const commentControllers = require('../../controllers/commentController');

commentRouter.post('/create', commentControllers.createComment);

commentRouter.get('/issue/:id', commentControllers.getIssueComments);

commentRouter.delete('/:id', commentControllers.removeComment);

module.exports = commentRouter;