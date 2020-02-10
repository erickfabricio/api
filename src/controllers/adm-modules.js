const Module = require('../models/adm-modules');

module.exports = {

    find: async (req, res, next) => {
        const modules = await Module.find(req.body.query, req.body.parms);        
        res.status(200).json(modules);
    },

    findById: async (req, res, next) => {
        const { moduleId } = req.params;
        const module = await Module.findById(moduleId);
        res.status(200).json(module);
    },

    save: async (req, res, next) => {
        const newModule = new Module(req.body);
        const module = await newModule.save();
        res.status(200).json(module);
    },

    update: async (req, res, next) => {
        const { moduleId } = req.params;
        const updateModule = req.body;
        const oldModule = await Module.findByIdAndUpdate(moduleId, updateModule, { useFindAndModify: false });
        const newModule = await Module.findById(oldModule.id);
        res.status(200).json(newModule);
    },

    remove: async (req, res, next) => {
        const { moduleId } = req.params;
        const module = await Module.findByIdAndRemove(moduleId);
        res.status(200).json(module);
    }
            
}