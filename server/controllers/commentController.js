const Comment = require('../models/Comment');

async function createComment(req, res) {
    const { creator_id, issue_id, content, date } = req.body;

    if (!creator_id || !issue_id || !date) {
        return res.status(422).json({'message': 'Failed to send comment!'});
    }
    if (!content) {
        return res.status(422).json({'message': 'The content for comment is required!'});
    }

    try {
        const comment = await Comment.create({
            creator_id,
            issue_id,
            content,
            date
        });

        return res.status(200).json(comment);
    } catch (error) {
        return res.status(400).json({'message': 'Something went wrong! Please try again.'});
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
        const comment = await Comment.findByIdAndDelete(id);
    
        if (!comment) {
          return res.status(404).send('Comment not found!');
        }
    
        res.status(200).send('Comment deleted successfully!');
      } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while deleting the comment!');
      }
}

module.exports = { createComment, getIssueComments, removeComment };