var 
  router= require('express').Router();

router.get('/', function(req, res, next){
  var loggedin =  req.user? true: false;
  res.render('home', {logged:!loggedin});
  res.end();
});

//====DISPLAY ONE POLL==========================================
router.get('/single',
  function(req, res, next){
    var loggedin =  req.user? true: false;
    res.render('single', {logged:!loggedin, pollid: req.query.pollid});
});

module.exports= router;