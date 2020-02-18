const User = require('../models/adm-users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

    find: async (req, res, next) => {
        const users = await User.find(req.body.query, req.body.parms);
        //res.status(200).json({ ok: true, message: 'It´s OK', users: users});
        res.status(200).json(users);
    },

    findById: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },

    save: async (req, res, next) => {
        const user = await User.findOne({ mail: req.body.mail });
        if (!user) {
            req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
            const newUser = new User(req.body);
            const user = await newUser.save();
            res.status(200).json({ ok: true, menssage: "User registered successfully", user: user });
        } else {
            res.status(401).json({ ok: false, menssage: "Email is already registered" });
        }

        /*
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(200).json(user);
        */
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