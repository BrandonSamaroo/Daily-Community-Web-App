const router = require('express').Router();
const { route } = require('express/lib/application');
const postsCntrl = require('../controllers/posts');
const isLoggedIn =  require('../helper/isLoggedIn')

router.post('/post', isLoggedIn, postsCntrl.post_post);
router.post('/like/:id', isLoggedIn, postsCntrl.post_like_post)
router.get('/post/:username', isLoggedIn, postsCntrl.post_get);
router.post('/reply/:id', isLoggedIn, postsCntrl.reply_post)

module.exports = router;