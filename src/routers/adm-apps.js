const router = require('express-promise-router')();

const {
    find,
    findById,
    save,
    update,
    remove
} = require('../controllers/adm-apps');

router.get('/', find);
router.get('/:appId', findById);
router.post('/', save);
router.put('/:appId', update);
router.delete('/:appId', remove);

module.exports = router;