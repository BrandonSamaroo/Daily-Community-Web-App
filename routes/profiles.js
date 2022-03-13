const router = require('express').Router();
const profilesCntrl = require('../controllers/profiles');
const isLoggedIn =  require('../helper/isLoggedIn')

router.get('/profile/:username', isLoggedIn,profilesCntrl.profile_get);
router.get('/communities/:username', isLoggedIn, profilesCntrl.profile_communities_get);

module.exports = router;