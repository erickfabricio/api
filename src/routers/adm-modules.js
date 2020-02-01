const router = require('express-promise-router')();

const {
    find,
    findById,
    save,
    update,
    remove
} = require('../controllers/adm-modules');

router.get('/', find);
router.get('/:moduleId', findById);
router.post('/', save);
router.put('/:moduleId', update);
router.delete('/:moduleId', remove);

module.exports = router;