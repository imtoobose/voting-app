//====HANDLE POLLS ROUTE========================================================

var router = require('express').Router();
var polls  = require('../mongo/polls');
var User   = require('../mongo/user');

//====UTILITY FUNCTIONS========================================================

//====GET POLLS BELONGING TO USER===============================================
function getpolldata(userid, req, res, next){
  var searchfor = {};
  if(userid) searchfor.creator = userid;

  polls.find(searchfor, function(err, pollarr){
    if(err) {
      res.redirect('/')
    }

    else{
      res.locals.result = pollarr;
      next();
    }
  });
}

//====GET POLL BY ID===========================================================
function getpollbyid(id, req, res, next){
  polls.find({_id: id}, function(err, poll){
    if(err) {
      res.redirect('/404');
    }
    else{
      res.locals.poll = poll;
      next();
    }
  })
}

//====ADD POLL TO USER==========================================================
function addpolltouser(pollid, req, res, next){
  User.findOne({_id: req.user.id}, function(err, user){
    user.hasVoted(pollid);
  
    user.save(function(err){
      if(err) {
        console.log(err);
        res.redirect('/500');
      }
      else
        res.redirect('/single?pollid='+req.params.pollid);
    })
  })
}

//====ADD POLL TO OFFLINE STORAGE TO PREVENT DOUBLE VOTING===================
function addpollsoffline(pollid, req, res, next){
  if(req.session.pollsVoted){
    req.session.pollsVoted.push(pollid);
  }
  else{
    req.session.pollsVoted= [];
    req.session.pollsVoted.push(pollid); 
  }
  res.redirect('/single?pollid='+req.params.pollid);
}

//====GET REQUESTS==============================================================

//====GET POLLS OF CURRENT USER --- USER PAGE ==================================
router.get('/polls', 
  function(req, res, next){
    if(req.user){
      getpolldata(req.user.id, req, res, next);
    }
    else{
      res.redirect('/401');
      res.end();
      return;
    }
  }, 
  function(req, res, next){
    res.jsonp({polls:res.locals.result});
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

//====ADD A NEW POLL=====================================================
router.post('/polls/add', function(req, res, next){
  if(req.user){
    var 
      newPoll  = new polls(),
      options  = [],
      voteName = +req.body.voteName;

    for(var i = 0; i< req.body.addoption.length; i++){
      if(req.body.addoption[i].length>0){
        options.push({
          optionName: req.body.addoption[i],
          votes: 0 
        })
      }
    }

    if(req.body.addoption[voteName-1] && req.body.addoption[(+voteName)-1].length>0){
      options[(+voteName)-1].votes = 1;
    }

    newPoll.name      = req.body.pollname;
    newPoll.options   = options;
    newPoll.creator   = req.user.id;
    newPoll.chartType = req.body.chartName;
    
    newPoll.save(function(err){
      if(err) {
        console.log(err);
        res.redirect('/500');
      }
      res.redirect('/single?pollid='+newPoll._id);
    });
  } 

  else{
    res.redirect('/401');
  } 
});

//====ADD OPTION OR VOTE FOR A POLL=====================================
router.post('/polls/vote/:pollid', function(req, res, next){
  
  if(req.body.vote && req.params.pollid){
    //====ADD AN OPTION AND VOTE FOR IT=================================
    if(req.body.vote=="add"){
      if(req.body.addoption.length>0){
        //===FIND ONE POLL BY ID AND RETURN IT==========================
        polls.findOne({_id: req.params.pollid}, function(err, found){          
          if(err) {
            console.log(err);
            res.redirect('/404');
          }

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
              if(err) {
                console.log(err);
                res.redirect('/500');
              }
              req.user.votedPolls.push(found._id);
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
        if(err) {
          console.log(err);
          res.redirect('/500');
        }
        //====UPDATE REQUIRED VOTE=======================================
        //====THIS FUNCTION IS PART OF THE PROTOTYPE OF POLLS SCHEMA=====
        //====IT IS DEFINED IN app/mongo/polls.js========================
        found.updateVotes(+req.body.vote);
        
        found.save(function(err){
          if(err) throw err;
          if(req.user){
            addpolltouser(req.params.pollid, req, res, next);
          }
          else{
            addpollsoffline(req.params.pollid, req, res, next);
          }
        });
      });
    }
  }

  else{
    res.redirect('/500');
  }
});

//====DELETE A POLL====================================================
router.post('/polls/delete/:pollid', function(req, res, next){
  if(req.user){
    if(req.params.pollid.length>0){
      polls.findOne({_id: req.params.pollid}, function(err, found){
        if(err){
          console.log(err);
          res.redirect('/user');
        }

        if(found.creator == req.user.id){
          found.remove(function(error){
            if(error){
              console.log(error);
              res.redirect('/500');
            }
            else{
              res.redirect('/user');
            }
          });
        }
        else{
          res.redirect('/user');
        }
      });
    }
    else {
      res.redirect('/404');
    }
  }
  else{
    res.redirect('/401');
  }
});

module.exports= router;