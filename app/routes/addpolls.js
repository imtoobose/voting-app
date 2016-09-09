//====HANDLE POLLS ROUTE========================================================

var router = require('express').Router();
var polls  = require('../mongo/polls');

//====UTILITY FUNCTIONS========================================================

//====GET POLLS BELONGING TO USER===============================================
function getpolldata(userid, req, res, next){
  var searchfor = {};
  if(userid) searchfor.creator = userid;

  polls.find(searchfor, function(err, pollarr){
    if(err) throw err;
    console.log(pollarr);
    res.locals.result = pollarr;
    next();
  });
}

//====GET POLL BY ID===========================================================
function getpollbyid(id, req, res, next){
  polls.find({_id: id}, function(err, poll){
    if(err) throw err;
    res.locals.poll = poll;
    next();
  })
}

//====GET REQUESTS==============================================================

//====GET POLLS OF CURRENT USER --- USER PAGE ==================================
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
    res.jsonp({polls:res.locals.result});
  //   if(res.locals.result && res.locals.result.length>0){
  //     console.log(res.locals.result);
  //   }
  //   res.render('polls', {logged: (req.user? false: true)});
  }
);

//====GET ALL POLLS --- FOR HOME PAGE=====================================
router.get('/polls/all',
  function(req, res, next){
    getpolldata(null, req, res, next);
  }, 
  function(req, res, next){
    res.jsonp({polls: res.locals.result});
  });

//====GET ONE POLL --- SINGLE PAGE=========================================
router.get('/polls/getone/:pollid',
  function(req, res, next){
    if(req.params.pollid){
      getpollbyid(req.params.pollid, req, res, next);
    }
    else { 
      res.end();
    }
  },
  function(req, res, next){
    res.jsonp({poll: res.locals.poll});
  }
);

//=====POST REQUESTS====================================================

router.post('/polls/vote/:pollid', function(req, res, next){
  
  if(req.body.vote && req.params.pollid){
    //====ADD AN OPTION AND VOTE FOR IT=================================
    if(req.body.vote=="add"){
      if(req.body.addoption.length>0){
        //===FIND ONE POLL BY ID AND RETURN IT==========================
        polls.findOne({_id: req.params.pollid}, function(err, found){          
          if(err) res.redirect('/');

          //====ADD AN OPTION TO THE POLL================================

          //====THIS FUNCTION IS PART OF THE PROTOTYPE OF POLLS SCHEMA====
          //====IT IS DEFINED IN app/mongo/polls.js=======================

          found.addOption(req.body.addoption, res);

          //====CHECK IF THE OPTION IS ADDED=============================
          if(res.locals.added==="no") {
            res.redirect('/single?pollid='+req.params.pollid);
          }

          else {
            found.save(function(err){
              if(err) throw err;
              res.redirect('/single?pollid='+req.params.pollid);
            });
          }
        });
      }
      else{
        res.redirect('/single?pollid='+req.params.pollid);
      }
    }

    //====VOTE FOR EXISTING OPTION=======================================
    else {
      //====FIND POLL BY ID==============================================
      polls.findOne({_id: req.params.pollid}, function(err, found){
        if(err) res.redirect('/');
        //====UPDATE REQUIRED VOTE=======================================
        //====THIS FUNCTION IS PART OF THE PROTOTYPE OF POLLS SCHEMA=====
        //====IT IS DEFINED IN app/mongo/polls.js========================
        found.updateVotes(+req.body.vote);
        
        found.save(function(err){
          if(err) throw err;
          res.redirect('/single?pollid='+req.params.pollid);
        });
      });
    }
  }

  else{
    res.end(JSON.stringify({"error": "Invalid query"}));;
  }
});

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
            newPoll.chartType = req.body.chartType;
            console.log(req.user);
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