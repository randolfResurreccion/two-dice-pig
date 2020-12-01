import { isInteger } from 'lodash';
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

// State Variable
let gamePlaying = true;

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
    console.log('init app')

    gamePlaying = true;

    // Set target score input readonly ro false
    query.targetScore.readOnly = false;


    // Hide Dice
    dice.both.forEach(div => div.style.display = 'none');

    // Clear Target Score input value
    query.targetScore.value = '';


}

// Roll Dice
const rollDice = () => {
    // check the state of the game
    if (gamePlaying) {

        // Set the target score input to readonly once the dice is rolled
        query.targetScore.readOnly = true;

    
        // Generate Random Number
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        console.log('dice1: ', dice1);
        console.log('dice2: ', dice2);

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
            console.log('round score: ', roundScore);
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        }
    }

}

// Hold Dice
const holdDice = () => {
    console.log('hold dice');

    // Set the target score input to readonly once the dice is rolled
    query.targetScore.readOnly = true;

    // Target Score or Default Value
    let targetScore = parseInt(query.targetScore.value || 100);

    // validate if user input a number if not use default target of 100
    if (!isInteger(targetScore)) query.targetScore.value = 100; 
    console.log(targetScore);
    console.log(typeof targetScore);

    // go to next player
    setTimeout(nextPlayer, 500);
}

// Next Player
const nextPlayer = () => {
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    roundScore = 0;

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