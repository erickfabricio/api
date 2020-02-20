const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    mail: String,
    hash: String,
    password: String,
    description: String,
    creationDate: { type: Date, default: Date.now },
    state: String,    
    role: String,
    creator: String
}, {
    versionKey: false
});

module.exports = mongoose.model('adm.users', schema);
