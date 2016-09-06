var 
  mongoose= require('mongoose');
  Schema = mongoose.Schema;

var PollSchema = new Schema({
  name: String,
  options: [{
    optionName: String,
    votes: Number
  }],
  creator: String
});

PollSchema.methods.updateVotes = function(optionnumber){
  if(typeof optionnumber === 'number' && optionnumber<this.options.length){
    this.options[optionnumber].votes+=1;
  }
}

PollSchema.methods.addOption = function(option, res){
  if(typeof option === 'string'){
    for(var i=0; i<this.options.length; i++){
      if(this.options[i].optionName.toLowerCase()===option.toLowerCase()) {
        res.locals.added = "no";
        return;
      }
    }
    this.options.push({
      optionName: option,
      votes: 0
    });
  }
}

var Polls = mongoose.model('Polls', PollSchema);
module.exports= Polls;