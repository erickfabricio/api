const router = require('express-promise-router')();

const {
    find,
    findById,
    save,
    update,
    remove
} = require('../controllers/adm-data');

router.get('/', find);
router.get('/:dataId', findById);
router.post('/', save);
router.put('/:dataId', update);
router.delete('/:dataId', remove);

module.exports = router;