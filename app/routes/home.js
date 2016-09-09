//====HANDLE HOME PAGE ROUTES AS WELL AS RENDERING OF OTHER PAGES=============
var 
  router= require('express').Router();

//====DISPLAY THE HOME PAGE===================================================
router.get('/', function(req, res, next){
  var loggedin =  req.user? true: false;
  res.render('home', {logged:!loggedin});
  res.end();
});

//====DISPLAY ONE POLL========================================================
router.get('/single',
  function(req, res, next){
    var loggedin =  req.user? true: false;
    res.render('single', {logged:!loggedin, pollid: req.query.pollid});
});

//====DISPLAY POLLS BELONGING TO THE LOGGED IN USER============================
router.get('/user', 
  function(req, res, next){
    var loggedin = req.user? true: false;
    if(loggedin){
      res.render('user');
      res.end();
    }
    else{
      res.end('Unauthorized access');
    }
  })

module.exports= router;