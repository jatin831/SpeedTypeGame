// adding Dom elements
const inputBox = document.getElementById('formInput');
const timeLeft = document.getElementById('timeLeft');
const scoreSpace = document.getElementById('score');
const currentWord = document.getElementById('currentWord');
let score = 0;
const gameTime = 5;
var words = [];
let position = 0;
let isCurrentGame = 0;
let classAdded = 0;

// adding event listeners
inputBox.addEventListener('focus', startGame);
inputBox.addEventListener('keyup', validate);
document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    scoreSpace.innerText = score;
    timeLeft.innerText = gameTime;
    document.getElementById('totalTime').innerText = gameTime;
    fetch('https://random-word-api.herokuapp.com/word?number=100')
    .then( res => res.json())
    .then( data => words = data);
    
}



function startGame() {
    if(!classAdded) {
        currentWord.classList.add('display-1');
        classAdded = 1;
    }
    const temp = document.getElementById('currentState');
    currentWord.innerText = words[position];
    if(temp !== null) temp.remove();
    inputBox.removeEventListener('focus', startGame);
    timeLeft.innerText = gameTime;
    scoreSpace.innerHTML = score;
    setTimeout(() => isCurrentGame = 1, 900);
    setTimeout(() => timeLeft.innerText = gameTime - 1, 1000);
    setTimeout(() => displayTime(gameTime - 2), 1000);
    
}


function displayTime(time) {
    if(!isCurrentGame) {
        startGame();
        return;
    }
    if(time < 0) {
         displayError();
    } else {
        setTimeout(() => {
            timeLeft.innerText = time;
            displayTime(time - 1); 
        }, 1000);
    }
    
}

function displayError() {
    const h3 = document.createElement('h3');
    h3.classList.add("text-white");
    h3.classList.add("text-center");
    h3.setAttribute('id', "currentState");
    h3.appendChild(document.createTextNode("You Lost"));
    const div = document.querySelector('.container');
    const divRow = document.querySelector('.row');
    div.insertBefore(h3, divRow);
    inputBox.value = "";
    inputBox.addEventListener('focus', startGame);
    score = 0;
    position++;
    inputBox.blur();
    currentWord.classList.remove('display-1');
    classAdded = 0;
    currentWord.innerText = "tap on the input box to play again";
}



function validate() {
    const text = inputBox.value;
    if(text == words[position]) {
        position++;
        score += 10;
        inputBox.value = "";
        inputBox.addEventListener('focus', startGame);
        isCurrentGame = 0;
        
    }
}





