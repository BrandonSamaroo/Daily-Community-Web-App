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

module.exports = router;