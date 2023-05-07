const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema(
    {
        username: {
            type: String,
            //required: true
        },
        surname: {
            type: String,
            //required: true
        },
        forename: {
            type: String,
            //required: true
        },
        email: {
            type: String,
            //required: true,
            lowercase:true,
            trim: true,
            unique: true,
            validate: [
                (value) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value),
            ]
        },
        role: {
            type: String,
            //required: true
        },
        password: {
            type: String,
            //required: true,
        },
        refresh_token: String,
    },
    {
        virtuals: {
            fullName: {
                get() {
                    return this.forename + ' ' + this.surname;
                }
            },
            id: {
                get() {
                    return this._id;
                }
            }
        }
    }
)

module.exports = mongoose.model('User', UserSchema);