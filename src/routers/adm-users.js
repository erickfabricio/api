const router = require('express-promise-router')();

const {
    find,
    findById,
    save,
    update,
    remove
} = require('../controllers/adm-users');

router.get('/', find);
router.get('/:userId', findById);
router.post('/', save);
router.put('/:userId', update);
router.delete('/:userId', remove);

module.exports = router;