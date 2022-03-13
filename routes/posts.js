const router = require('express').Router();
const postsCntrl = require('../controllers/posts');
const isLoggedIn =  require('../helper/isLoggedIn')

router.post('/post', isLoggedIn, postsCntrl.post_post);

module.exports = router;