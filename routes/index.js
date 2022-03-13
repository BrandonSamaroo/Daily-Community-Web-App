const router = require('express').Router();
const indexCntrl = require('../controllers/index');
const isLoggedIn =  require('../helper/isLoggedIn')

router.get('/main',isLoggedIn, indexCntrl.main_get);
router.get('/search',isLoggedIn, indexCntrl.search_get);
router.get('/notifications',isLoggedIn, indexCntrl.notifications_get);
router.get('/messages',isLoggedIn, indexCntrl.messages_get);
router.get('/settings',isLoggedIn, indexCntrl.settings_get);

module.exports = router;