const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = Schema(
    {
        commentor_id: {
            type: String,
            required: true
        },        
        creator_id: {
            type: String,
            required: true
        },
        issue_id: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    },
)

module.exports = mongoose.model('Comment', CommentSchema);