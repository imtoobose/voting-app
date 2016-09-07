//====HANDLE POLLS ROUTE====================================

var router = require('express').Router();
var polls  = require('../mongo/polls');

//====GET POLLS BELONGING TO USER==============================
function getpolldata(userid, req, res, next){
  var result = [];
  polls.find({creator: userid}, function(err, pollarr){
    for(var i=0; i<pollarr.length; i++){
      result.push(pollarr[i]._id);
    }
    res.locals.result=  result;
    next();
  });
}

//====SHOW THE POLLS OF A USER===============================
router.get('/polls', 
  function(req, res, next){
    if(req.user){
      getpolldata(req.user.id, req, res, next);
    }
    else{
      //redirect to 401 page later
      res.end('errorwoops');
    }
  }, 
  function(req, res, next){
    if(res.locals.result && res.locals.result.length>0){
      console.log(res.locals.result);
    }
    res.render('polls', {logged: (req.user? false: true)});
  }
);

//=====POST REQUESTS====================================================
router.post('/polls', 
  function(req, res, next){
    if(req.user){
      if(req.body && req.body.action){
        switch(req.body.action){
          //=====ADD A NEW POLL==========================================
          case "add":
            var newPoll = new polls();
            newPoll.name    = req.body.name;
            newPoll.options = req.body.options;
            newPoll.creator = req.user.id;
            newPoll.save(function(err){
              //redirect to 500 page
              if(err) throw err;
            });
            res.end();
          break;

          //====DELETE A POLL================================================
          case "delete":
            if(req.body.pollid){
              polls.findOneAndRemove({_id: req.body.pollid}, function(err){
                if(err) throw err;
              });
              res.end();
            }
            else {
              res.end(JSON.stringify({"error": "Invalid query"}));
            }
          break;

          //====VOTE ON A POLL================================================
          case "vote":
            if(req.body.pollid && req.body.option){
              polls.findOne({_id: req.body.pollid}, function(err, found){
                if(err) throw err;
                found.updateVotes(+req.body.option);
                found.save(function(err){
                  if(err) throw err;
                  res.end();
                });
              });
            }
            else{
              res.end(JSON.stringify({"error": "Invalid query"}));;
            }
            break;

          //====ADD AN OPTION====================================================
          case "addoption":
            if(req.body.pollid && req.body.option){
              polls.findOne({_id: req.body.pollid}, function(err, found){
                if(err) throw err;
                found.addOption(req.body.option, res);
                if(res.locals.added==="no") {
                  res.end('Option not added');
                }
                else {
                  found.save(function(err){
                    if(err) throw err;
                    res.end();
                  });
                }
              });
            }
            else{
              res.end(JSON.stringify({"error": "Invalid query"}));;
            }
            break;

          //====INVALID QUERY==================================================
          default:
            res.end(JSON.stringify({"error": "Invalid query"}));;
        }
      }
      else{
        res.end(JSON.stringify({"error": "Invalid query"}));;
      }
    }
    else{
      res.end(JSON.stringify({"error": "Invalid query"}));;
    }
  }
);

module.exports= router;