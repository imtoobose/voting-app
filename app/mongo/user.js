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
  }
 });

var User = mongoose.model('User', userScheme);
module.exports = User;