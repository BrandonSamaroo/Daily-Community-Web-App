const router = require('express').Router();
const { route } = require('express/lib/application');
const profilesCntrl = require('../controllers/profiles');
const isLoggedIn =  require('../helper/isLoggedIn');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/assets/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
  })

var upload = multer({ storage: storage })

router.get('/profile/:username', isLoggedIn,profilesCntrl.profile_get);
router.get('/communities/:username', isLoggedIn, profilesCntrl.profile_communities_get);
router.get('/follow/:username', isLoggedIn, profilesCntrl.profile_follow_get);
router.get('/following/:username', isLoggedIn, profilesCntrl.profile_following_get);
router.get('/followers/:username', isLoggedIn, profilesCntrl.profile_followers_get);
router.post('/uploadProfilePic', isLoggedIn, upload.single('image'), profilesCntrl.profile_picture_post);
router.post('/setBio/:username', isLoggedIn, profilesCntrl.profile_bio_post);
router.post('/message/:username', isLoggedIn, profilesCntrl.profile_message_post);

module.exports = router;