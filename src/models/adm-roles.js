const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    description: String,
    creationDate: { type: Date, default: Date.now },
    state: String,
    privileges: {
        collections: [{
            _id: false,
            name: String,
            view: Boolean,
            edit: Boolean,
            delete: Boolean
        }],
        modules: [{
            _id: false,
            name: String,
            access: Boolean
        }]        
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('adm-roles', schema);
