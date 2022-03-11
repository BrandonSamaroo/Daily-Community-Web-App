const User = require("../models/Users");
const bcrypt = require('bcrypt');
const salt = 10;
const passport = require('passport');
const {validationResult} = require('express-validator');
const flash = require('connect-flash');