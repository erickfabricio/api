const Data = require('../models/adm-data');

module.exports = {

    find: async (req, res, next) => {
        const datas = await Data.find(req.body.query, req.body.parms).sort('-creationDate');
        res.status(200).json(datas);
    },

    findById: async (req, res, next) => {
        const { dataId } = req.params;
        const data = await Data.findById(dataId);
        res.status(200).json(data);
    },

    save: async (req, res, next) => {
        const newData = new Data(req.body);
        const data = await newData.save();
        res.status(200).json(data);
    },

    update: async (req, res, next) => {
        const { dataId } = req.params;
        const newData = req.body;
        const olddata = await Data.findByIdAndUpdate(dataId, newData, { useFindAndModify: false });
        res.status(200).json({ success: true });
    },

    remove: async (req, res, next) => {
        const { dataId } = req.params;
        await Data.findByIdAndRemove(dataId);
        res.status(200).json({ success: true });
    }

}