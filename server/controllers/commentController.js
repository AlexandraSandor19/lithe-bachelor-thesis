const Comment = require('../models/Comment');

async function createComment(req, res) {
    const { creator_id, issue_id, content, date } = req.body;

    if (!creator_id || !issue_id || !content || !date) {
        return res.status(422).json({'message': 'Failed to send comment!'});
    }

    try {
        await Comment.create({
            creator_id,
            issue_id,
            content,
            date
        });
        return res.sendStatus(201);
    } catch (error) {
        return res.status(400).json({'message': 'Could not create comment!'});
    }
}

async function getIssueComments(req, res) {
    const { id } = req.params;

    try {
        const comments = await Comment.find({issue_id: id}).exec();
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(400).json({'message': 'Failed to load comments!'});
    }
}

async function removeComment(req, res) {
    const { id } = req.params;

    try {
        const comment = await Comment.findOne({ _id: id });
        if (!comment) {
            return res.status(400).json({'message': 'Failed to remove commenttt!'});
        }
        await Comment.findByIdAndDelete(id);
    } catch (error) {
        return res.status(400).json({'message': 'Failed to remove comment!'});
    }
}

module.exports = { createComment, getIssueComments, removeComment };