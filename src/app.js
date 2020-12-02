import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';
import { isInteger } from 'lodash';
import { domain } from 'process';
import { query, btn, dice } from './dom';
import dice1Img from './img/dice-1.png';
import dice2Img from './img/dice-2.png';
import dice3Img from './img/dice-3.png';
import dice4Img from './img/dice-4.png';
import dice5Img from './img/dice-5.png';
import dice6Img from './img/dice-6.png';

// Global Variables 
let scores;
let roundScore = 0;
let activePlayer = 0;
// let targetScore = parseInt(query.targetScore.value || 100);
let targetScore;

// State Variable
let gamePlaying;
let holdDiceActive;

// Array of Dice Images
const diceArray = [
    dice1Img,
    dice2Img,
    dice3Img,
    dice4Img,
    dice5Img,
    dice6Img,
]

// init App
const initApp = () => {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    holdDiceActive = false;

    // Set target score input readonly to false
    query.targetScore.readOnly = false;

    // Clear Target Score input value
    query.targetScore.value = '';

    // Hide Dice
    dice.both.forEach(div => div.style.display = 'none');

    // Reset Score
    query.score.forEach(div => div.innerHTML = 0);
    // Reset Current
    query.current.forEach(div => div.innerHTML = 0);

    // Make sure active class is on player 1
    query.player2Panel.classList.remove('active');
    query.player1Panel.classList.add('active');

    // Remove winner class
    query.player1Panel.classList.remove('winner');
    query.player2Panel.classList.remove('winner');

    // Reset player name Tag
    query.playerTag.forEach((div, counter) => {
        counter++
        div.innerHTML = `Player ${counter}`
    });
}

// Roll Dice
const rollDice = () => {
    // check the state of the game
    if (gamePlaying) {
        const regExp = /[a-zA-Z]/g;

        // store input value for our target score
        targetScore = parseInt(query.targetScore.value || 100);

        // validate for number input
        // regExp.test(targetScore) ? targetScore = query.targetScore.value = 100 : console.log('targert score', targetScore);
        if (regExp.test(targetScore)) targetScore = query.targetScore.value = 100;

        // Set the target score input to readonly once the dice is rolled
        query.targetScore.readOnly = true;

        // Generate Random Number
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        // Show Dice
        dice.both.forEach(div => div.style.display = 'block');

        // Append dice image
        dice.one.src = diceArray[dice1 - 1];
        dice.two.src = diceArray[dice2 - 1];

        // Conditional check on both dice
        if (dice1 === 1 && dice2 === 1) {
            scores[activePlayer] = 0;
            document.querySelector(`#score${activePlayer}`).innerHTML = scores[activePlayer];
            setTimeout(nextPlayer, 500);
        } else if (dice1 === 1 || dice2 === 1) {
            setTimeout(nextPlayer, 500);
        } else {
            roundScore += dice1 + dice2;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        }
        // make hold dice button available only after rolling the dice.
        holdDiceActive = true;
    }
}

// Hold Dice
const holdDice = () => {

    if (gamePlaying && holdDiceActive) {
        scores[activePlayer] += roundScore;
        // move current score to main score then clear current score
        document.querySelector(`#score${activePlayer}`).innerHTML = scores[activePlayer];
        document.querySelector(`#current-${activePlayer}`).innerHTML = 0;

        // Check if activePlayer main Score is =<  than the target score
        if (scores[activePlayer] < targetScore) {
            nextPlayer();
        } else {
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`#name-${activePlayer}`).innerHTML = 'Winner!';
            gamePlaying = false;
        }
    }
}

// Next Player
const nextPlayer = () => {
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    roundScore = 0;
    holdDiceActive = false;

    // Hide Dice
    dice.both.forEach(div => div.style.display = 'none');

    //  Reset current score
    query.current.forEach(div => div.innerHTML = 0);

    // Toggle the active class for player
    query.player1Panel.classList.toggle('active');
    query.player2Panel.classList.toggle('active');
}

// Initialize app onload
initApp();

// On Click
btn.new.addEventListener('click', initApp);
btn.roll.addEventListener('click', rollDice);
btn.hold.addEventListener('click', holdDice);