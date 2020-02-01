const App = require('../models/adm-apps');

module.exports = {

    find: async (req, res, next) => {
        const apps = await App.find(req.body.query, req.body.parms).sort('-creationDate');
        res.status(200).json(apps);
    },

    findById: async (req, res, next) => {
        const { applicationId } = req.params;
        const app = await App.findById(applicationId);
        res.status(200).json(app);
    },

    save: async (req, res, next) => {
        const newApplication = new App(req.body);
        const app = await newApplication.save();
        res.status(200).json(app);
    },

    update: async (req, res, next) => {
        const { applicationId } = req.params;
        const newApplication = req.body;
        const oldapplication = await App.findByIdAndUpdate(applicationId, newApplication, { useFindAndModify: false });
        res.status(200).json({ success: true });
    },

    remove: async (req, res, next) => {
        const { applicationId } = req.params;
        await App.findByIdAndRemove(applicationId);
        res.status(200).json({ success: true });
    }

}