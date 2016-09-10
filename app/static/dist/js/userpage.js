'use strict';

//====FUNCTION FOR CHECKING USER AGENT=======================
window.mobilecheck = function () {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

//====TO TYPE A BIT LESS================================================
var getId = function getId(el) {
  return document.getElementById(el);
},
    getClass = function getClass(el) {
  return document.getElementsByClassName(el);
},
    create = function create(el) {
  return document.createElement(el);
};

//====SELECTORS AND GLOBAL VARIABLES====================================
var $modalWrap = getId('modalcontain'),
    $modals = getClass('modalwrapper'),
    $shares = getClass('linkwrapper'),
    $userpolls = getId('userpolls'),
    $textarea = getId('modal-link'),
    $cross = getId('modal-cross'),
    countsofar = 0;

//====MAKE A GET REQUEST TO GET ALL THE POLLS========================= 
//====BELONGING TO THE USER===========================================
qwest.get('/polls').then(function (xhr, response) {
  var polls = response.polls;
  for (var i = 0; i < polls.length; i++) {
    createDivs(polls[i]);
  }
}).catch(function (err) {
  window.location('/');
});

//====MODAL CROSS BUTTON===============================================
$cross.addEventListener('click', function (e) {
  $modalWrap.classList.remove('visiblemodal');
});

//====URL CONTAINING TEXT AREA==========================================
$textarea.addEventListener('click', function (e) {
  this.select();
});

//====ADD WHATSAPP SHARE BUTTON IF MOBILE================================
if (!window.mobilecheck) {
  $modals[3].classList.remove('mobilebut');
}

//====CREATING THE POLL INFO==============================================
var createDivs = function createDivs(poll) {
  countsofar += 1;

  var li = create('li'),
      onepoll = create('div'),
      title = create('a'),
      pollbuttons = create('div'),
      deletewrapper = create('a'),
      deletebutton = create('button'),
      linkwrapper = create('a'),
      linkbutton = create('button');

  //===SHARE AND DELETE BUTTONS================================
  linkbutton.id = 'sharebutton-' + countsofar, linkbutton.innerHTML = 'SHARE', deletebutton.id = 'deletebutton-' + countsofar, deletebutton.innerHTML = 'DELETE', linkbutton.classList.add('linkbutton'), linkbutton.classList.add('button'), deletebutton.classList.add('deletebutton'), deletebutton.classList.add('button');

  //====THE ANCHOR TAG WRAPPERS FOR THE ABOVE==================
  linkwrapper.href = "/single?pollid=" + poll._id, deletewrapper.href = "/polls/delete/" + poll._id, linkwrapper.classList.add('linkwrapper'), linkwrapper.classList.add('buttonwrapper'), deletewrapper.classList.add('deletewrapper'), deletewrapper.classList.add('buttonwrapper');

  //====ADDING EVENTLISTENERS TO WRAPPERS=======================
  linkwrapper.addEventListener('click', setShare);
  deletewrapper.addEventListener('click', setDelete);

  linkwrapper.appendChild(linkbutton), deletewrapper.appendChild(deletebutton);

  //====DIV CONTAINING THE TWO BUTTONS ABOVE======================
  pollbuttons.classList.add('pollbuttons');
  pollbuttons.appendChild(deletewrapper), pollbuttons.appendChild(linkwrapper);

  //====TITLE OF POLL==============================================
  title.href = "/single?pollid=" + poll._id, title.innerHTML = poll.name;
  title.classList.add('title');

  //====DIV CONTAINING EVERYTHING===================================
  onepoll.classList.add('onepoll'), onepoll.appendChild(title), onepoll.appendChild(pollbuttons);

  //====WRAPPER FOR THE ABOVE DIV====================================
  li.classList.add('onepollwrap'), li.appendChild(onepoll);

  $userpolls.appendChild(li);
};

//====SHARE BUTTON EVENT LISTENER=====================================
function setShare(e) {
  e.preventDefault();
  $modalWrap.classList.add('visiblemodal');
  $textarea.value = this.href;

  var allUrls = setUrl(this.href);
  for (var j = 0; j < $modals.length; j++) {
    $modals[j].href = allUrls[j];
  }
}

//====DELETE BUTTON EVENT LISTENER===========================================================
function setDelete(e) {
  e.preventDefault();
  qwest.post(this.href).then(function (xhr, res) {
    window.location.reload();
  }).catch(function (err) {
    window.location('/500');
  });
}

//====SET THE URLS OF VARIOUS SHARE BUTTONS==================================================
var setUrl = function setUrl(url) {
  return {
    0: 'http://www.facebook.com/sharer.php?u=' + url,
    1: 'https://plus.google.com/share?url=' + url,
    2: 'https://twitter.com/intent/tweet?text=Check%20out%20my%20poll%20at%20QuickPoll!&url=' + url + '&hashtags=QuickPoll',
    3: 'whatsapp://send?text=See my poll at QuickPoll ' + url
  };
};