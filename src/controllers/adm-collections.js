const Collection = require('../models/adm-collections');

module.exports = {

    find: async (req, res, next) => {
        const collections = await Collection.find(req.body.query, req.body.parms);
        //res.status(200).json({ ok: true, message: 'It´s OK', collections: collections});
        res.status(200).json(collections);
    },

    findById: async (req, res, next) => {
        const { entityId } = req.params;
        const entity = await Collection.findById(entityId);
        res.status(200).json(entity);
    },

    save: async (req, res, next) => {
        const newCollection = new Collection(req.body);
        const entity = await newCollection.save();
        res.status(200).json(entity);
    },

    update: async (req, res, next) => {
        const { entityId } = req.params;
        const updateCollection = req.body;
        const oldCollection = await Collection.findByIdAndUpdate(entityId, updateCollection, { useFindAndModify: false });
        const newCollection = await Collection.findById(oldCollection.id);
        res.status(200).json(newCollection);
    },

    remove: async (req, res, next) => {
        const { entityId } = req.params;
        const entity = await Collection.findByIdAndRemove(entityId);
        res.status(200).json(entity);
    }
            
}