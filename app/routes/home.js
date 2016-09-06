var router= require('express').Router();

router.get('/', function(req, res, next){
  var loggedin =  req.user? true: false;
  var name= '';
  
  if(loggedin){
    name = req.user.facebook.name===undefined? req.user.google.name: req.user.facebook.name;
  }

  res.render('home', {message: "Hello "+name, logged:!loggedin});
  res.end();
});

module.exports= router;