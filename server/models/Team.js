const mongoose = require('mongoose');
const User = require('../models/User').schema;

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
        members_ids: {
            type: [String],
            required: true,
            default: [],
        },
        lead: {
            type: String,
            default: "",
        },
    },
)

module.exports = mongoose.model('Team', TeamSchema);