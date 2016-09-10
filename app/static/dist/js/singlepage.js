'use strict';

function createVotes(arr) {
  for (var i = 0; i < arr.length; i++) {
    var id = "vote-" + i,
        _in = document.createElement('input'),
        label = document.createElement('label'),
        div = document.createElement('div'),
        li = document.createElement('li');

    _in.classList.add('vote'), _in.setAttribute('type', 'radio'), _in.setAttribute('name', 'vote'), _in.setAttribute('id', id), _in.setAttribute('value', i);
    if (i === 0) _in.setAttribute('checked', true);

    label.setAttribute('for', id), label.classList.add('votelabel'), label.innerHTML = arr[i].optionName;

    div.classList.add('check');

    li.classList.add('optionlistval'), li.appendChild(_in), li.appendChild(label), li.appendChild(div);

    document.getElementById('optionlist').appendChild(li);
  }
}

var a = document.getElementsByClassName('allcharts')[0],
    i = a.getAttribute('id');
qwest.get('/polls/getone/' + i).then(function (x, r) {
  if (r.error) {
    window.location = '/404';
  }
  createCharts(r.poll, a, true, true);
  createVotes(r.poll[0].options);
}).catch(function (e) {
  console.log(e);
});
console.log(localStorage);