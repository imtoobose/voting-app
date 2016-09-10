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
    var 
      loggedin   =  req.user? true: false,
      hasVoted   = false,
      votedPolls = [];

    votedPolls =  (loggedin === true ? req.user.votedPolls: ('undefined' !== typeof req.session.pollsVoted? req.session.pollsVoted : []));
    
    for(var i = 0; i<votedPolls.length; i++){
      if(req.query.pollid==votedPolls[i]){
        hasVoted = true;
        break;
      }
    }
    res.render('single', {logged:!loggedin, pollid: req.query.pollid, hasVoted: hasVoted});
});

//====DISPLAY POLLS BELONGING TO THE LOGGED IN USER============================
router.get('/user', 
  function(req, res, next){
    var loggedin = req.user? true: false;
    if(loggedin){
      res.render('user', {page:'user'});
      res.end();
    }
    else{
      res.redirect('/401');
    }
});

//====FORM FOR ADDING A NEW POLL===============================================
router.get('/add',
  function(req, res, next){
    var loggedin = req.user? true: false;
    if(req.user)
      res.render('add', {logged: !loggedin, page: 'add'});
    else
      res.redirect('/401');
})

//====ERROR PAGES========================================================

//====404 PAGE NOT FOUND=================================================
router.get('/404',
  function(req, res, next){
    res.status('404');
    res.end('The page you are looking for does not exist');
  });

//====500 INTERNAL SERVER ERROR=========================================
router.get('/500', 
  function(req, res, next){
    res.status('500');
    res.end('Internal server error');
});

//====401 UNAUTHORIZED ACCESS==============================================
router.get('/401',
  function(req, res, next){
    res.status('401').end('Unauthorized access');
  })
module.exports= router;