const Rol = require('../models/adm-rols');

module.exports = {

    find: async (req, res, next) => {
        const rols = await Rol.find(req.body.query, req.body.parms);
        res.status(200).json({ ok: true, message: 'It´s OK', rols: rols});
        //res.status(200).json(rols);
    },

    findById: async (req, res, next) => {
        const { userId } = req.params;
        const rol = await Rol.findById(userId);
        res.status(200).json(rol);
    },

    save: async (req, res, next) => {
        const newUser = new Rol(req.body);
        const rol = await newUser.save();
        res.status(200).json(rol);
    },

    update: async (req, res, next) => {
        const { userId } = req.params;
        const updateUser = req.body;
        const oldUser = await Rol.findByIdAndUpdate(userId, updateUser, { useFindAndModify: false });
        const newUser = await Rol.findById(oldUser.id);
        res.status(200).json(newUser);
    },

    remove: async (req, res, next) => {
        const { userId } = req.params;
        const rol = await Rol.findByIdAndRemove(userId);
        res.status(200).json(rol);
    }
            
}