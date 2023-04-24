const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = Schema(
    {
        team_name: {
            type: String,
            required: true
        },        
        creator_id: {
            type: String,
            required: true
        },
        leader_id: String,
    },
)

module.exports = mongoose.model('Team', TeamSchema);