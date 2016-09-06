//====DEPENDENCIES =========================================
var 
  express    = require('express'),
  app        = express(),
  bodyParser = require('body-parser'),
  session    = require('express-session'),
  passport   = require('passport'),
  mongoose   = require('mongoose');

//====ROUTES=================================================
var 
  home      = require('./app/routes/home'),
  auth      = require('./app/routes/auth'),
  userpolls = require('./app/routes/addpolls');
  //user = require('./app/mongo/user');

//====MONGOOOSE AND MONGOD===================================  
var url = process.env.MONGOLAB_URI ||
          process.env.MONGOHQ_URL  ||
          'mongodb://localhost/votingapp';
mongoose.connect(url);

//For cleaning mongodb
// user.find({}, function(err, use){
//   for(var i=0; i<use.length; i++)
//     use[i].remove();
// });

//====CONFIGURATION OF EXPRESS AND PASSPORT======================
app.use(express.static('./app/static/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'oh121hellofedfj',
  /*cookie:{
    maxAge: 1000*60*60*24*5
  },*/
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', './app/views');
app.set('view engine', 'pug');
require('./app/config/strategies')(passport);

//====ROUTING=====================================================
app.use('/', home, userpolls);
app.use('/auth', auth(passport));
app.get('/auth', function(req, res){
  res.redirect('/');
});

//====LISTEN TO THE SERVER =======================================
app.listen(process.env.PORT || 8080, 
  ()=> console.log('started server'));