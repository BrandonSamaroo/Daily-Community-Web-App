//requires
const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./helper/ppConfig');
require('dotenv').config();


//static variables
const PORT = process.env.PORT;
const app = express();

//static uses
app.use(express.urlencoded({extended: true}));
app.use(expressLayouts);
app.use(session({
    secret: process.env.secret,
    saveUninitialized: true, 
    resave: false, 
    cookie: {maxAge: 360000} 
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.alerts = req.flash();
    next();
})

// Import Routes
const profilesRoute = require('./routes/profiles');
const communitiesRoute =  require('./routes/communities');
const postsRoute =  require('./routes/posts');
const authRoute =  require('./routes/auth');
app.use(express.static('public'));

// Mount Routes
app.use('/', profilesRoute);
app.use('/', communitiesRoute);
app.use('/', postsRoute);
app.use('/', authRoute);

//set view engine
app.set("view engine", "ejs");


//connect to mongodb
mongoose.connect(process.env.mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    },
    () => {
        console.log("mongodb connected successfully!");
});
  
//listen for requests
app.listen(PORT, () => console.log(`App is running on ${PORT}`));