const router = require('express-promise-router')();

const {
    find,
    findById,
    save,
    update,
    remove
} = require('../controllers/adm-logs');

router.get('/', find);
router.get('/:logId', findById);
router.post('/', save);
router.put('/:logId', update);
router.delete('/:logId', remove);

module.exports = router;