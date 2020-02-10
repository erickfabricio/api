const Collection = require('../models/adm-collections');

module.exports = {

    find: async (req, res, next) => {
        const collections = await Collection.find(req.body.query, req.body.parms);
        //res.status(200).json({ ok: true, message: 'It´s OK', collections: collections});
        res.status(200).json(collections);
    },

    findById: async (req, res, next) => {
        const { collectionId } = req.params;
        const collection = await Collection.findById(collectionId);
        res.status(200).json(collection);
    },

    save: async (req, res, next) => {
        const newCollection = new Collection(req.body);
        const collection = await newCollection.save();
        res.status(200).json(collection);
    },

    update: async (req, res, next) => {
        const { collectionId } = req.params;
        const updateCollection = req.body;
        const oldCollection = await Collection.findByIdAndUpdate(collectionId, updateCollection, { useFindAndModify: false });
        const newCollection = await Collection.findById(oldCollection.id);
        res.status(200).json(newCollection);
    },

    remove: async (req, res, next) => {
        const { collectionId } = req.params;
        const collection = await Collection.findByIdAndRemove(collectionId);
        res.status(200).json(collection);
    }
            
}