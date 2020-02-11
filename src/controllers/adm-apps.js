const App = require('../models/adm-apps');

module.exports = {

    find: async (req, res, next) => {
        const apps = await App.find(req.body.query, req.body.parms).sort('-creationDate');
        res.status(200).json(apps);
    },

    findById: async (req, res, next) => {
        const { appId } = req.params;
        const app = await App.findById(appId);
        res.status(200).json(app);
    },

    save: async (req, res, next) => {
        const newApp = new App(req.body);
        const app = await newApp.save();
        res.status(200).json(app);
    },

    update: async (req, res, next) => {
        const { appId } = req.params;
        const newApp = req.body;
        const oldapp = await App.findByIdAndUpdate(appId, newApp, { useFindAndModify: false });
        res.status(200).json({ success: true });
    },

    remove: async (req, res, next) => {
        const { appId } = req.params;
        await App.findByIdAndRemove(appId);
        res.status(200).json({ success: true });
    }

}