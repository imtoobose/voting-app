'use strict';

var visible = false,
    $overlay = document.getElementById('overlay-nav'),
    $hamburger = document.getElementById('hamburger-menu');
$hamburger.addEventListener('click', function () {
  if (visible) {
    $overlay.classList.remove('visible');
    visible = false;
  } else {
    $overlay.classList.add('visible');
    visible = true;
  }
});