const router = require('express').Router();
const authCntrl = require('../controllers/auth');

router.get('/', authCntrl.home_get);

module.exports = router;