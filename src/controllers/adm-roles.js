const Role = require('../models/adm-roles');

module.exports = {

    find: async (req, res, next) => {
        const roles = await Role.find(req.body.query, req.body.parms);        
        res.status(200).json(roles);
    },

    findById: async (req, res, next) => {
        const { roleId } = req.params;
        const rol = await Role.findById(roleId);
        res.status(200).json(rol);
    },

    save: async (req, res, next) => {
        const newRole = new Role(req.body);
        const rol = await newRole.save();
        res.status(200).json(rol);
    },

    update: async (req, res, next) => {
        const { roleId } = req.params;
        const updateRole = req.body;
        const oldRole = await Role.findByIdAndUpdate(roleId, updateRole, { useFindAndModify: false });
        const newRole = await Role.findById(oldRole.id);
        res.status(200).json(newRole);
    },

    remove: async (req, res, next) => {
        const { roleId } = req.params;
        const rol = await Role.findByIdAndRemove(roleId);
        res.status(200).json(rol);
    }
            
}