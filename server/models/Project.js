const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = Schema(
    {
        project_name: {
            type: String,
            required: true
        },        
        creator_id: {
            type: String,
            required: true
        },
        repository_url: String,
        labels: [String],
        po_id: String,
    },
)

module.exports = mongoose.model('Project', ProjectSchema);