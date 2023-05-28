const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var imageSchema = Schema(
    {
        name: String,
        img: {
            data: Buffer,
            contentType: String
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
);
 
module.exports = mongoose.model('ProfileImage', imageSchema);