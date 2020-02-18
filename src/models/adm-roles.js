const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    description: String,
    creationDate: { type: Date, default: Date.now },
    state: String,
    privileges: {        
        modules: [{            
            name: String,
            access: Boolean
        }],
        collections: [{
            //_id: false,
            name: String,
            create: Boolean,
            read: Boolean,
            update: Boolean,
            delete: Boolean
        }]        
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('adm.roles', schema);
