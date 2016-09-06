var router= require('express').Router();

router.get('/', function(req, res, next){
  var loggedin =  req.user? true: false;
  var name= '';
  if(loggedin){
    name = req.user.facebook? req.user.facebook.name: req.user.google.name;
  }

  res.render('home', {message: "Hello "+name, logged:!loggedin});
  res.end();
});

module.exports= router;