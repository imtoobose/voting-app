var router= require('express').Router();

router.get('/', function(req, res, next){
  res.render('home', {message: 'Hello'});
  res.end();
});

module.exports= router;