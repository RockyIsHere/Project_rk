'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const closeLow = secretNumber - 1;
const closeHigh = secretNumber + 1;
// document.querySelector('.number').textContent = secretNumber;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //NO NUMBER
  if (!guess || guess > 20 || guess <= 0) {
    displayMessage('no number');
    //CORRECT NUMBER
  } else if (guess === secretNumber) {
    displayMessage('Correct number');
    document.querySelector('body').style.backgroundColor = '#60b347';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    //BIGER NUMBER
  } else if (guess >= closeLow && guess <= closeHigh) {
    displayMessage('Too close 😊');
    document.querySelector('body').style.backgroundColor = '#e6c43c';
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      // guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      document.querySelector('body').style.backgroundColor = '#222';
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent = '💥 You lost the game!';
      displayMessage('You lost the game!');
      document.querySelector('.score').textContent = 0;
      document.querySelector('body').style.backgroundColor = '#f20f0f';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);

  //   document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.highscore').textContent = 0;
  document.querySelector('body').style.backgroundColor = '#191a26';
  document.querySelector('.number').style.width = '15rem';
});
