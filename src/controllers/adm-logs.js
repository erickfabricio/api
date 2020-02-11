const Log = require('../models/adm-logs');

module.exports = {

    find: async (req, res, next) => {
        const logs = await Log.find(req.body.query, req.body.parms).sort('-creationDate');
        res.status(200).json(logs);
    },

    findById: async (req, res, next) => {
        const { logId } = req.params;
        const log = await Log.findById(logId);
        res.status(200).json(log);
    },

    save: async (req, res, next) => {
        const newLog = new Log(req.body);
        const log = await newLog.save();
        res.status(200).json(log);
    },

    update: async (req, res, next) => {
        const { logId } = req.params;
        const newLog = req.body;
        const oldlog = await Log.findByIdAndUpdate(logId, newLog, { useFindAndModify: false });
        res.status(200).json({ success: true });
    },

    remove: async (req, res, next) => {
        const { logId } = req.params;
        await Log.findByIdAndRemove(logId);
        res.status(200).json({ success: true });
    }

}