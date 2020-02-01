const router = require('express-promise-router')();

const {
    find,
    findById,
    save,
    update,
    remove
} = require('../controllers/adm-entities');

router.get('/', find);
router.get('/:entityId', findById);
router.post('/', save);
router.put('/:entityId', update);
router.delete('/:entityId', remove);

module.exports = router;