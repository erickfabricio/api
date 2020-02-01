const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    creationDate: { type: Date, default: Date.now },
    generation: String, //user or aplication
    time: String, //seconds
    key: String,
    payload: String,
    token: String,
    state: String
}, {
        versionKey: false
    });

module.exports = mongoose.model('adm-tokens', schema);
