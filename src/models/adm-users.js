const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    user: String,
    mail: String,
    password: String,
    description: String,
    creationDate: { type: Date, default: Date.now },
    state: String,
    rol: String    
}, {
    versionKey: false
});

module.exports = mongoose.model('adm-users', schema);
