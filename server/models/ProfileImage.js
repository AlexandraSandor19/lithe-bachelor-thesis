const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            data: Buffer,
            contentType: String
        },
        owner_id: {
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
);
 
module.exports = mongoose.model('ProfileImage', imageSchema);