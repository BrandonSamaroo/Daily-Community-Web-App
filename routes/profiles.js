const router = require('express').Router();
const { route } = require('express/lib/application');
const profilesCntrl = require('../controllers/profiles');
const isLoggedIn =  require('../helper/isLoggedIn')

router.get('/profile/:username', isLoggedIn,profilesCntrl.profile_get);
router.get('/communities/:username', isLoggedIn, profilesCntrl.profile_communities_get);
router.get('/follow/:username', isLoggedIn, profilesCntrl.profile_follow_get);
router.get('/following/:username', isLoggedIn, profilesCntrl.profile_following_get);
router.get('/followers/:username', isLoggedIn, profilesCntrl.profile_followers_get);


module.exports = router;