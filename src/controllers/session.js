const User = require('../models/adm-users');
const Role = require('../models/adm-roles');
const Token = require('../models/adm-tokens');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

    signUp: async (req, res, next) => {
        //validate email existence
        const user = await User.findOne({ mail: req.body.mail });
        if (!user) {
            req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
            const newUser = new User(req.body);
            const user = await newUser.save();
            res.status(200).json({ ok: true, menssage: "User registered successfully", user: user });
        } else {
            res.status(401).json({ ok: false, menssage: "Email is already registered" });
        }
    },

    login: async (req, res, next) => {
        console.log(req.body);
        //Search user        
        const user = await User.findOne({ mail: req.body.mail });
        if (user) {
            bcrypt.compare(req.body.password, user.password, async function (err, result) {
                if (result) {

                    //Search role
                    const role = await Role.findById(user.role);
                    console.log(role);

                    let time = Math.floor(Date.now() / 1000) + (60 * 60 * 24);
                    let payload = { 
                        userId: user._id,
                        userName: user.name,
                        privileges: role.privileges
                    };

                    //Generate token
                    let token = jwt.sign(
                        {
                            exp: time,
                            data: payload
                        },
                        config.key
                    );
                    //console.log(token);

                    //Save token
                    const tokenModel = new Token();
                    tokenModel.generation = user._id;
                    tokenModel.time = time;
                    tokenModel.key = config.key;
                    tokenModel.payload = payload;
                    tokenModel.token = token;
                    tokenModel.state = "Active";
                    tokenModel.save();
                    console.log(tokenModel);

                    

                    res.status(200).json({ ok: true, menssage: "Correct login", tokenId: tokenModel._id, token: token, user: user, role: role });
                } else {
                    res.status(200).json({ ok: false, menssage: "Incorrect password" });
                }
            })
        } else {
            res.status(200).json({ ok: false, menssage: "Email not registered" });
        }
    },

    validate: async (req, res, next) => {
        var token = req.headers['authorization'];

        if (!token) {
            return res.status(401).send({ ok: false, message: 'Authentication failed' });
        }

        token = token.replace('Bearer ', '');

        jwt.verify(token, config.key, function (err, info) {
            if (err) {
                return res.status(401).send({ ok: false, message: 'Token invalid, ' + err.name + ' ' + err.message + '.' });
            } else {
                res.status(200).json({ ok: true, menssage: "Correct token", info: info });
            }
        });
    }

}