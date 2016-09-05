var 
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

 var userScheme = new Schema({
  name: String,
  username: String,
  token: String,
  created_at: Date,
  polls: [String]
 });

var User = mongoose.model('User', userScheme);
module.exports = User;