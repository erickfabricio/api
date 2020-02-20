const Token = require('../models/adm-tokens');

module.exports = {

    find: async (req, res, next) => {
        const tokens = await Token.find(req.body.query, req.body.parms).sort('-creationDate');
        res.status(200).json(tokens);
    },

    findById: async (req, res, next) => {
        const { tokenId } = req.params;
        const token = await Token.findById(tokenId);
        res.status(200).json(token);
    },

    save: async (req, res, next) => {
        const newToken = new Token(req.body);
        const token = await newToken.save();
        res.status(200).json(token);
    },

    update: async (req, res, next) => {
        const { tokenId } = req.params;
        const updateToken = req.body;
        const oldToken = await Token.findByIdAndUpdate(tokenId, updateToken, { useFindAndModify: false });
        const newToken = await Token.findById(oldToken.id);
        res.status(200).json(newToken);
    },

    remove: async (req, res, next) => {
        const { tokenId } = req.params;
        const token = await Token.findByIdAndRemove(tokenId);
        res.status(200).json(token);
    }
            
}