var 
  express= require('express'),
  app = express(),
  bodyParser  = require('body-parser'),
  session = require('express-session'),
  passport = require('passport'),
  mongoose = require('mongoose');

require('./app/config/strategies')(passport);

var 
  home = require('./app/routes/home'),
  auth = require('./app/routes/auth'),
  user = require('./app/mongo/user');
  
var url = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/votingapp';
mongoose.connect(url);

//For cleaning mongodb
// user.find({}, function(err, use){
//   for(var i=0; i<use.length; i++)
//     use[i].remove();
// });


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

app.use('/', home);
app.listen(process.env.PORT || 8080, 
  ()=> console.log('started server'));

app.use('/auth', auth(passport));
app.get('/auth', function(req, res){
  res.redirect('/');
});