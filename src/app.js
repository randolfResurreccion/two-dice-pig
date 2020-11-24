import { query, btn, dice } from './dom';
import dice1Img from './img/dice-1.png';
import dice2Img from './img/dice-2.png';
import dice3Img from './img/dice-3.png';
import dice4Img from './img/dice-4.png';
import dice5Img from './img/dice-5.png';
import dice6Img from './img/dice-6.png';


// show dice for styling
const initApp = () => {
    // Show Dice
    dice.both.forEach(div => div.style.display = 'block');

    // Append dice image
    dice.one.src = dice1Img;
    dice.two.src = dice2Img;
}

initApp();