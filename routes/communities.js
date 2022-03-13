const router = require('express').Router();
const communitiesCntrl = require('../controllers/communities');
const isLoggedIn =  require('../helper/isLoggedIn')

router.get('/create/community',isLoggedIn, communitiesCntrl.create_community_get);
router.post('/create/community', isLoggedIn, communitiesCntrl.create_community_post);
router.get('/community/:name', isLoggedIn, communitiesCntrl.community_get);

module.exports = router;