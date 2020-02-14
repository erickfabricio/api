const Catalog = require('../models/adm-catalogs');

module.exports = {

    find: async (req, res, next) => {
        const catalogs = await Catalog.find(req.body.query, req.body.parms).sort('-creationDate');        
        res.status(200).json(catalogs);
    },

    findById: async (req, res, next) => {
        const { catalogId } = req.params;
        const catalog = await Catalog.findById(catalogId);
        res.status(200).json(catalog);
    },

    save: async (req, res, next) => {
        const newCatalog = new Catalog(req.body);
        const catalog = await newCatalog.save();
        res.status(200).json(catalog);
    },

    update: async (req, res, next) => {
        const { catalogId } = req.params;
        const updateCatalog = req.body;
        const oldCatalog = await Catalog.findByIdAndUpdate(catalogId, updateCatalog, { useFindAndModify: false });
        const newCatalog = await Catalog.findById(oldCatalog.id);
        res.status(200).json(newCatalog);
    },

    remove: async (req, res, next) => {
        const { catalogId } = req.params;
        const catalog = await Catalog.findByIdAndRemove(catalogId);
        res.status(200).json(catalog);
    }
            
}