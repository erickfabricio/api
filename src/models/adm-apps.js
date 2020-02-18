const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    contact: String,
    description: String,
    creationDate: { type: Date, default: Date.now },
    state: String    
}, {
        versionKey: false
    });

module.exports = mongoose.model('adm.apps', schema);
