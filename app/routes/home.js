var router= require('express').Router();

router.get('/', function(req, res, next){
  var name = req.user? req.user.facebook.name: '';

  res.render('home', {message: "Hello "+name});
  res.end();
});

module.exports= router;