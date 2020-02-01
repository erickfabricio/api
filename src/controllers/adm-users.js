const User = require('../models/adm-users');

module.exports = {

    find: async (req, res, next) => {
        const users = await User.find(req.body.query, req.body.parms);
        res.status(200).json({ ok: true, message: 'It´s OK', users: users});
        //res.status(200).json(users);
    },

    findById: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },

    save: async (req, res, next) => {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(200).json(user);
    },

    update: async (req, res, next) => {
        const { userId } = req.params;
        const updateUser = req.body;
        const oldUser = await User.findByIdAndUpdate(userId, updateUser, { useFindAndModify: false });
        const newUser = await User.findById(oldUser.id);
        res.status(200).json(newUser);
    },

    remove: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findByIdAndRemove(userId);
        res.status(200).json(user);
    }
            
}