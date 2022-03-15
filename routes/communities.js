const router = require('express').Router();
const communitiesCntrl = require('../controllers/communities');
const isLoggedIn =  require('../helper/isLoggedIn')

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

router.get('/create/community',isLoggedIn, communitiesCntrl.create_community_get);
router.post('/create/community',isLoggedIn, upload.single('image'), communitiesCntrl.create_community_post);
router.get('/community/:name', isLoggedIn, communitiesCntrl.community_get);
router.get('/follow/community/:name', isLoggedIn, communitiesCntrl.community_follow_get);
router.get('/settings/:name', isLoggedIn, communitiesCntrl.community_settings_get);
router.post('/uploadCommunityPic/:name', isLoggedIn, upload.single('image'), communitiesCntrl.community_picture_post);
router.get('/delete/:name', isLoggedIn, communitiesCntrl.community_delete_get);
router.post('/delete/:name', isLoggedIn, communitiesCntrl.community_delete_post);
router.post('/community/setBio/:name', isLoggedIn, communitiesCntrl.community_bio_post);

module.exports = router;