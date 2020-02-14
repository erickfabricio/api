const router = require('express-promise-router')();

const {
    find,
    findById,
    save,
    update,
    remove
} = require('../controllers/adm-catalogs');

router.get('/', find);
router.get('/:catalogId', findById);
router.post('/', save);
router.put('/:catalogId', update);
router.delete('/:catalogId', remove);

module.exports = router;