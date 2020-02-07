const router = require('express-promise-router')();

const {
    find,
    findById,
    save,
    update,
    remove
} = require('../controllers/adm-collections');

router.get('/', find);
router.get('/:collectionId', findById);
router.post('/', save);
router.put('/:collectionId', update);
router.delete('/:collectionId', remove);

module.exports = router;