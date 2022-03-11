const router = require('express').Router();
const indexCntrl = require('../controllers/index');

router.get('/', indexCntrl.home_get);

module.exports = router;