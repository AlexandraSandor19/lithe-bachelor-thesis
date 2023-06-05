const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SprintSchema = Schema(
    {
        team_id: { 
            type: String 
        },
        startDate: { 
            type: Date, 
            required: true 
        },
        endDate: { 
            type: Date, 
            required: true 
        },
        issues: [String],
        goal: { 
            type: String 
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

module.exports = mongoose.model('Sprint', SprintSchema);