document.getElementById('submit-button').addEventListener('click', function(e){
  var options = document.getElementsByClassName('options');
  var type = document.getElementById('charttype').value;
  var answers = [];
  for(var i=0; i<options.length; i++){
    if(!options[i].value){
      done=1;
      return false;
    }
    else{
      answers.push(
        {
          optionName: options[i].value,
          votes: 0
        }
      );
    }
  }

  qwest.post('/polls', {
    action: "add",
    name: answers[0].optionName,
    options: answers.slice(1),
    chartType: type
  })
  .then(function(xhr, response){
    window.location = '/';
  })
  .catch(function(err){
    window.location = '/';
  });
})

document.getElementById('delete-button').addEventListener('click', function(){
  if(document.getElementById('deleteval').value){
    qwest.post('/polls', {
      action: "delete",
      pollid: document.getElementById('deleteval').value
    })
    .then(function(xhr, response){
      console.log('done');
      window.location = '/';
    });
  }
});

document.getElementById('vote-button').addEventListener('click', function(){
  console.log('voting');
  if(document.getElementById('voteval').value && document.getElementById('choiceval').value){
    console.log('voted');
    qwest.post('/polls', {
      action: "vote",
      pollid: document.getElementById('voteval').value,
      option: document.getElementById('choiceval').value
    })
    .then(function(xhr, response){
      console.log('done');
      window.location = '/';
    });
  }
});

document.getElementById('addoption-button').addEventListener('click', function(){
  if(document.getElementById('optionval').value && document.getElementById('optionchoice').value){
    qwest.post('/polls', {
      action: "addoption",
      pollid: document.getElementById('optionval').value,
      option: document.getElementById('optionchoice').value
    })
    .then(function(xhr, response){
      console.log(xhr, response);
      console.log('done');
      //window.location = '/';
    });
  }
});