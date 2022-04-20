'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let activePlayer = -1; // stores which player's turn it is - 0 for player 1 and 1 for player 2.
let currentDiceNum = -1;
let currentScore = -1;
const scores = [-1, -1];

let playing = true;

const getRandomInt = function (max) {
  return Math.trunc(Math.random() * max);
};

const resetGame = function () {
  if (!playing) {
    player0El.classList.remove('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    playing = true;
    player0El.classList.add('player--active');
  }
  for (let i = 0; i < 2; i++) {
    activePlayer = i;
    updateCurrentScore(0);
    updateScore(0);
  }
  diceEl.classList.add('hidden');
  currentScore = 0;
  currentDiceNum = -1;
  activePlayer = 0;
};

const updateCurrentScore = function (newCurrentScore) {
  currentScore = newCurrentScore;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

const updateScore = function (newScore) {
  scores[`${activePlayer}`] = currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = currentScore;
};

const incrementScore = function (incrementAmount) {
  scores[activePlayer] += incrementAmount;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
};

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player--1').classList.toggle('player--active');
  document.querySelector('.player--0').classList.toggle('player--active');
};

resetGame();

btnRoll.addEventListener('click', function () {
  if (playing) {
    currentDiceNum = getRandomInt(6) + 1;
    diceEl.textContent = currentDiceNum;
    diceEl.src = `dice-${currentDiceNum}.png`;
    diceEl.classList.remove('hidden');

    if (currentDiceNum != 1) {
      //Update current score of player
      updateCurrentScore(currentScore + currentDiceNum);
    } else {
      // reset current score of player
      updateCurrentScore(0);
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to player score
    incrementScore(currentScore);
    updateCurrentScore(0);

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', resetGame);
