const router = require('express-promise-router')();

const {
    find,
    findById,
    save,
    update,
    remove
} = require('../controllers/adm-tokens');

router.get('/', find);
router.get('/:tokenId', findById);
router.post('/', save);
router.put('/:tokenId', update);
router.delete('/:tokenId', remove);

module.exports = router;