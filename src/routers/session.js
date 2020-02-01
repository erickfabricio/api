const router = require('express-promise-router')();

const {
    signUp,
    login,
    validate
} = require('../controllers/session');

router.post('/signup', signUp);
router.post('/login', login);
router.get('/validate', validate);

module.exports = router;