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
        members_ids: {
            type: [String],
            required: true,
            default: [],
        },
        team_leader_id: {
            type: String,
            default: "",
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

module.exports = mongoose.model('Team', TeamSchema);