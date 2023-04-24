const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LabelSchema = Schema(
    {
        label_name: {
            type: String,
            required: true
        },        
        leader_id: {
            type: String,
            required: true
        },
    },
)

module.exports = mongoose.model('Label', LabelSchema);