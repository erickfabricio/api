const router = require('express-promise-router')();

const {
    find,
    findById,
    save,
    update,
    remove
} = require('../controllers/adm-roles');

router.get('/', find);
router.get('/:rolId', findById);
router.post('/', save);
router.put('/:rolId', update);
router.delete('/:rolId', remove);

module.exports = router;