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
        //Test 
        console.log(req.body);
        
        //Search user        
        const user = await User.findOne({ mail: req.body.mail });
        
        if (user) {
            bcrypt.compare(req.body.password, user.password, async function (err, result) {
                if (result) {
                    
                    //Creating token JSON
                    const tokenModel = new Token();
                    tokenModel.save();                    
                    //console.log(tokenModel);

                    //Assignment of values
                    let time = Math.floor(Date.now() / 1000) + (60 * 60 * 24);
                    let playload = { tokenId: tokenModel._id };
                    
                    //Generate token
                    let token = jwt.sign(
                        {
                            exp: time,
                            data: playload
                        },
                        config.key
                    );
                    //console.log(token);

                    //Update token                    
                    tokenModel.generation = user._id;
                    tokenModel.time = time;
                    tokenModel.key = config.key;
                    tokenModel.playload = JSON.stringify(playload);
                    tokenModel.token = token;                    
                    tokenModel.state = "Active";                                                            
                    tokenModel.update();

                    //console.log(tokenModel);

                    res.status(200).json({ ok: true, menssage: "Correct login", token: token });
                } else {
                    res.status(200).json({ ok: false, menssage: "Incorrect password" });
                }
            })
        } else {
            res.status(200).json({ ok: false, menssage: "Email not registered" });
        }
    },

    signOut: async (req, res, next) => {

        let token = req.headers['authorization'];

        if (!token) {
            return res.status(401).send({ ok: false, message: 'Authentication failed' });
        }

        token = token.replace('Bearer ', '');

        jwt.verify(token, config.key, async function (err, info) {
            if (!err) {
                
                let tokenModel = await Token.findById(info.data.tokenId);
                tokenModel.state = "Inactive";
                tokenModel.signOut = new Date();
                tokenModel.update();
             
                return res.status(200).json({ ok: true, menssage: "Token sign out correct" });

            } else {                
                return res.status(401).send({ ok: false, message: 'Token invalid, ' + err.name + ' ' + err.message + '.' });
            }
        });
        
    },

    validate: async (req, res, next) => {

        let token = req.headers['authorization'];

        if (!token) {
            return res.status(401).send({ ok: false, message: 'Authentication failed' });
        }

        token = token.replace('Bearer ', '');

        jwt.verify(token, config.key, async function (err, info) {
            if (!err) {

                //State validation
                let tokenModel = await Token.findById(info.data.tokenId);
                let userModel = await User.findById(tokenModel.generation);
                let roleModel = await Role.findById(userModel.role);
                                                
                console.log(tokenModel);
                console.log(userModel);
                console.log(roleModel);

                //Return user information and role
                let data = {
                    user: userModel,
                    role: roleModel
                }
             
                return res.status(200).json({ ok: true, menssage: "Token validation correct", info: info, data: data });

            } else {                
                return res.status(401).send({ ok: false, message: 'Token invalid, ' + err.name + ' ' + err.message + '.' });
            }
        });
    }

}