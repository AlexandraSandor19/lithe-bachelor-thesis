const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = Schema(
    {
        project_name: {
            type: String,
            required: true
        },        
        team_id: {
            type: String,
            required: true
        },
        po_id: String,
        repository_url: String,
        labels: [String],
        target: String,
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

module.exports = mongoose.model('Project', ProjectSchema);