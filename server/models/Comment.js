const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = Schema(
    {     
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
        date: {
            type: Date,
            required: true
        }
    },
    {
        virtuals: {
            id: {
                get() {
                    return this._id;
                }
            }
        }
    },
)

module.exports = mongoose.model('Comment', CommentSchema);