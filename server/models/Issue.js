const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IssueSchema = Schema(
    {
        issue_name: {
            type: String,
            required: true
        },        
        creator_id: {
            type: String,
            required: true
        },
        project_id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        story_points: String,
        priority: String,
        labels: [String],
        assignee_id: String,
        goal: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
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

module.exports = mongoose.model('Issue', IssueSchema);