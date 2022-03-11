const router = require('express').Router();
const authCntrl = require('../controllers/auth');

router.get('/', authCntrl.home_get);
router.get('/auth/signup', authCntrl.home_signup_get)

module.exports = router;