const router = require('express').Router();
const profilesCntrl = require('../controllers/profiles');

router.get('/main', profilesCntrl.main_get);

module.exports = router;