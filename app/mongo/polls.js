var 
  mongoose= require('mongoose');
  Schema = mongoose.Schema;

var PollSchema = new Schema({
  name: String,
  id: String,
  options: [String],
  creator: String
});

var Polls = mongoose.model('Polls', PollSchema);
module.exports= Polls;