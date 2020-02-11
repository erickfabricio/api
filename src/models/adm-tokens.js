const mongoose = require('mongoose');

const schema = new mongoose.Schema({    
    generation: String, //user or aplication
    time: String, //seconds
    key: String,
    payload: String,
    token: String,
    creationDate: { type: Date, default: Date.now },
    state: String
}, {
        versionKey: false
    });

module.exports = mongoose.model('adm-tokens', schema);
