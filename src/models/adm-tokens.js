const mongoose = require('mongoose');

const schema = new mongoose.Schema({    
    generation: String, //user or aplication
    generationName: String,
    time: String, //seconds
    key: String,
    playload: String,
    token: String,
    signOut: { type: Date, default: null },    
    creationDate: { type: Date, default: Date.now },
    state: String
}, {
        versionKey: false
    });

module.exports = mongoose.model('adm.tokens', schema);
