'use strict';

var countsofar = 2,
    getId = function getId(el) {
  return document.getElementById(el);
},
    create = function create(el) {
  return document.createElement(el);
},
    $firstopt = getId('opt-1'),
    $polloptions = getId('polloptions'),
    $delete = getId('deleteanother'),
    $add = getId('addanother');

$delete.style.visibility = "hidden", $delete.style.opacity = 0;

$delete.addEventListener('click', function (e) {
  e.preventDefault();
  if (getId('opt-' + countsofar).checked == true) {
    $firstopt.checked = true;
  }

  $polloptions.removeChild($polloptions.lastChild);
  countsofar -= 1;
  if (countsofar == 2) {
    $delete.style.visibility = "hidden", $delete.style.opacity = 0;
  }
});

$add.addEventListener('click', function (e) {
  e.preventDefault();
  countsofar += 1;
  if (countsofar > 2) {
    $delete.style.visibility = "visible";
    $delete.style.opacity = 1;
  }

  var li = create('li'),
      label = create('label'),
      div = create('div'),
      input = create('input'),
      radio = create('input'),
      check = create('div');

  check.id = "optcheck-" + countsofar, check.classList.add('check'), check.classList.add('optioncheck');

  radio.id = "opt-" + countsofar, radio.type = "radio", radio.name = "voteName", radio.value = countsofar, radio.classList.add('vote'), radio.classList.add('optionvote');

  input.name = "addoption", input.id = "addoption-" + countsofar, input.type = "text", input.placeholder = "Add an option", input.classList.add("addoption"), input.classList.add("text"), input.setAttribute("autocomplete", "off");

  div.className = "addwrapper";

  label.classList.add("addlabel"), label.for = "addoption-" + countsofar, label.id = "contain-" + countsofar;

  li.classList.add("addoptioncontain"), li.innerHTML = "Option " + countsofar;

  li.appendChild(label), li.appendChild(div), li.appendChild(input), li.appendChild(radio), li.appendChild(check), getId("polloptions").appendChild(li);
});

document.addEventListener("keydown", function (e) {
  console.log(e.target.id);
  if (e.keyCode == 13 && e.target.id !== "submitall") {
    e.preventDefault();
  }
});