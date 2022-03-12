const router = require('express').Router();
const authCntrl = require('../controllers/auth');
const {body} = require('express-validator');

router.get('/', authCntrl.home_signin_get);
router.get('/auth/signup', authCntrl.home_signup_get);
router.post('/auth/signup', [
    body('firstName').isLength({min:3, max:20}).withMessage('First name must be longer than 3 & less than 20 characters'),
    body('lastName').isLength({min:3, max:20}).withMessage('Last name must be longer than 3 & less than 20 characters'),
    body('emailAddress').isEmail().withMessage('Must be valid email'),
    body('password').isLength({min:6}).withMessage('password must be longer than 6 characters'),
    body('userName').isLength({min:5, max: 15}).withMessage('username must be longer than 5 & less than 15 characters')
] ,authCntrl.home_signup_post);
router.post('/', authCntrl.home_signin_post);
router.get('/auth/signout', authCntrl.home_signout_get);

module.exports = router;