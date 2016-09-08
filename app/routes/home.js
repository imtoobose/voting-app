var 
  router= require('express').Router(),
  Polls = require('../mongo/polls');

function getChartData(req, res, next){

  Polls.find({}, function(err, poll){
    if(err) res.redirect('/');
    res.locals.polls = poll;
    next();
  })
}

router.get('/', getChartData, function(req, res, next){
  var loggedin =  req.user? true: false;
  var name= '';
  //console.log(res.locals.polls);
  if(loggedin){
    name = req.user.facebook.name===undefined? req.user.google.name: req.user.facebook.name;
  }

  res.render('home', {message: "Hello "+name, logged:!loggedin});
  res.end(res.locals.polls.join(','));
});

module.exports= router;