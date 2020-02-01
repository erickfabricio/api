const Entity = require('../models/adm-entities');

module.exports = {

    find: async (req, res, next) => {
        const entities = await Entity.find(req.body.query, req.body.parms);
        res.status(200).json({ ok: true, message: 'It´s OK', entities: entities});
        //res.status(200).json(entities);
    },

    findById: async (req, res, next) => {
        const { entityId } = req.params;
        const entity = await Entity.findById(entityId);
        res.status(200).json(entity);
    },

    save: async (req, res, next) => {
        const newEntity = new Entity(req.body);
        const entity = await newEntity.save();
        res.status(200).json(entity);
    },

    update: async (req, res, next) => {
        const { entityId } = req.params;
        const updateEntity = req.body;
        const oldEntity = await Entity.findByIdAndUpdate(entityId, updateEntity, { useFindAndModify: false });
        const newEntity = await Entity.findById(oldEntity.id);
        res.status(200).json(newEntity);
    },

    remove: async (req, res, next) => {
        const { entityId } = req.params;
        const entity = await Entity.findByIdAndRemove(entityId);
        res.status(200).json(entity);
    }
            
}