document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("text-input").
    addEventListener('keydown', onKeyDown);
  document.querySelector('#open-modal-button').
    addEventListener('click', () => {
      document.querySelector('.overlay').style.display = 'flex'
    });
  document.querySelector('#close-modal-button').
    addEventListener('click', () => {
      document.querySelector('.overlay').style.display = 'none'
    });
  document.getElementById("change-light-button").
    addEventListener('click', ClickLight)
})

function onKeyDown(e) {
  console.log(e);
  if (!((e.keyCode >= 65 && e.keyCode <= 90) ||
    (e.keyCode >= 97 && e.keyCode <= 122) ||
    e.keyCode == 8 ||
    e.keyCode == 32 ||
    e.keyCode == 37 ||
    e.keyCode == 39 ||
    e.keyCode == 46)) {
    e.preventDefault();
  }
}

function ClickLight() {
  var green = document.getElementById('light-green');
  var yellow = document.getElementById('light-yellow');
  var red = document.getElementById('light-red');
  if (green.classList.contains('light-green')) {
    green.classList.remove('light-green');
    green.classList.add('light-preview');
    yellow.classList.add('light-yellow');
  }
  else if (green.classList.contains('light-preview')) {
    green.classList.remove('light-preview');
    yellow.classList.remove('light-yellow');
    red.classList.add('light-red');
  }
  else if (red.classList.contains('light-red')) {
    red.classList.remove('light-red');
    red.classList.add('light-preview');
    yellow.classList.add('light-yellow');
  }
  else if (red.classList.contains('light-preview')) {
    red.classList.remove('light-preview');
    yellow.classList.remove('light-yellow');
    green.classList.add('light-green');
  }
  else {
    green.classList.add('light-green');
  }
}