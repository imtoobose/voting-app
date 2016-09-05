var 
  express= require('express'),
  app = express(),
  mongoose = require('mongoose');

var 
  home = require('./app/routes/home'),
  User = require('./app/mongo/datawoo');
var url = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/HelloMongoose';

mongoose.connect(url);

app.use(express.static('./app/static/dist'));
app.set('views', './app/views');
app.set('view engine', 'pug');

app.use('/', home);
app.listen(process.env.PORT || 8080, ()=> console.log('started server'));