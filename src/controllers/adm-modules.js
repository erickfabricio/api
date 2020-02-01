const Module = require('../models/adm-modules');

module.exports = {

    find: async (req, res, next) => {
        const modules = await Module.find(req.body.query, req.body.parms);
        res.status(200).json({ ok: true, message: 'It´s OK', modules: modules});
        //res.status(200).json(modules);
    },

    findById: async (req, res, next) => {
        const { entityId } = req.params;
        const module = await Module.findById(entityId);
        res.status(200).json(module);
    },

    save: async (req, res, next) => {
        const newEntity = new Module(req.body);
        const module = await newEntity.save();
        res.status(200).json(module);
    },

    update: async (req, res, next) => {
        const { entityId } = req.params;
        const updateEntity = req.body;
        const oldEntity = await Module.findByIdAndUpdate(entityId, updateEntity, { useFindAndModify: false });
        const newEntity = await Module.findById(oldEntity.id);
        res.status(200).json(newEntity);
    },

    remove: async (req, res, next) => {
        const { entityId } = req.params;
        const module = await Module.findByIdAndRemove(entityId);
        res.status(200).json(module);
    }
            
}