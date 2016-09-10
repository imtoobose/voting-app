var 
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

 var userScheme = new Schema({
  facebook:{
    id: String,
    token: String,
    name: String
  },
  google:{
    id: String,
    token: String,
    name: String
  },
  github:{
    id: String,
    token: String,
    name: String
  },
  votedPolls: []
 });

userScheme.methods.hasVoted =  function(pollid){
  var check = false;
  for(var i=0; i<this.votedPolls.length; i++){
    if(this.votedPolls[i] ==  pollid){
      check= true;
      break;
    }
  }

  if(check==false){
    this.votedPolls.push(pollid);
  }
  return;
}

var User = mongoose.model('User', userScheme);
module.exports = User;