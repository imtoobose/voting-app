//====DEPENDENCIES =========================================
var 
  path       = require('path'),
  express    = require('express'),
  app        = express(),
  bodyParser = require('body-parser'),
  session    = require('express-session'),
  passport   = require('passport'),
  favicon    = require('serve-favicon'),
  mongoose   = require('mongoose');

//====ROUTES=================================================
var 
  home      = require(__dirname +'/app/routes/home'),
  auth      = require(__dirname + '/app/routes/auth'),
  userpolls = require(__dirname +'/app/routes/addpolls');

//====SERVE FAVICOM================================================
app.use(favicon(path.join(__dirname, "app", "static", "dist", "assets", "favicon.ico")));
//====MONGOOOSE AND MONGOD==========================================  
var url = process.env.MONGOLAB_URI ||
          process.env.MONGOHQ_URL  ||
          'mongodb://localhost/votingapp';
mongoose.connect(url);
//====CONFIGURATION OF EXPRESS AND PASSPORT======================
app.use(express.static(path.join(__dirname,'app', 'static', 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'oh121hellofedfj',
  cookie:{
    maxAge: 1000*60*60*24*5
  },
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');
require(path.join(__dirname, 'app', 'config', 'strategies'))(passport);

//====ROUTING=====================================================
app.use('/', home, userpolls);
app.use('/auth', auth(passport));
app.get('/auth', function(req, res){
  res.redirect('/');
});

//====LISTEN TO THE SERVER =======================================
app.listen(process.env.PORT || 8080, 
  ()=> console.log('started server'));