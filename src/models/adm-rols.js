const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,    
    description: String,
    creationDate: { type: Date, default: Date.now },
    state: String,
    privileges: {
        entities : [{
            _id: false,
            entity: String,
            view: Boolean,
            edit: Boolean,
            delete: Boolean
        }],
        modules : [{
            _id: false,
            module: String,
            access: Boolean
        }]
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('adm-rols', schema);
