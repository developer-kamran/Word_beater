window.addEventListener('load', init);

//dom element
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

//available level
const level = {
  easy: 5,
  medium: 3,
  hard: 2,
};
//to change level
let currentLevel = level.easy;

const btns = document.querySelectorAll('.gb');

btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    let id = btn.dataset.id;
    currentLevel = level[id];
    console.log(currentLevel);
  });
});

let score = 0;
let isPlaying;
let time = currentLevel;

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'compensate',
  'master',
  'space',
  'definition',
];
//globals function

//initialize game

function init() {
  //show number of second
  seconds.innerHTML = currentLevel;
  //load word from array
  showWord(words);
  //Start matching on word input
  wordInput.addEventListener('input', startMatch);

  //call countdown every second
  setInterval(countdown, 1000);
  //chech game status
  setInterval(checkStatus, 50);
}

//start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }

  //if score is -1 display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}
//match current word to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

//pick and show random word

function showWord(words) {
  //generate random array index
  const randomIndex = Math.floor(Math.random() * words.length);

  //output random word
  currentWord.innerHTML = words[randomIndex];
}

//countdown
function countdown() {
  //make sure time is not run out
  if (time > 0) {
    //decrement
    time--;
  } else if (time === 0) {
    //game is over
    isPlaying = false;
  }
  //show time
  timeDisplay.innerHTML = time;
}
//Check game Status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over !!!';
    score = -1;
  }
}
