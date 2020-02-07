const router = require('express-promise-router')();

const {
    find,
    findById,
    save,
    update,
    remove
} = require('../controllers/adm-roles');

router.get('/', find);
router.get('/:roleId', findById);
router.post('/', save);
router.put('/:roleId', update);
router.delete('/:roleId', remove);

module.exports = router;