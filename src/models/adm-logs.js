const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: String,    
    description: String,
    creationDate: { type: Date, default: Date.now },
    state: String    
}, {
        versionKey: false
    });

module.exports = mongoose.model('adm.logs', schema);
