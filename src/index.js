import { first } from 'lodash';
import './style.css';

const newDiv = (id, className, tag, parent) => {
    const div = document.createElement('div');
    div.id = id;
    div.classList.add(className);
    div.innerHTML = tag;
    parent.appendChild(div);
}


const component = () => {
    // main wrapper div
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper', 'clearfix');

    // === Player 1 Panel ===
    const player_0_panel = document.createElement('div');
    player_0_panel.classList.add('player-0-panel', 'active');
    wrapper.appendChild(player_0_panel );

    // player name
    const player_0_name = newDiv('name-0', 'player-name', 'Player 1', player_0_panel);

    // player score
    const player_0_score = newDiv('score0', 'player-score', '0', player_0_panel);

    // player current box
    const currentBox_0 = document.createElement('div');
    currentBox_0.classList.add('player-current-box');
    player_0_panel.appendChild(currentBox_0);

    // player current label
    const currentLabel_0 = document.createElement('div');
    currentLabel_0.classList.add('player-current-label');
    currentLabel_0.innerHTML = 'Current';
    currentBox_0.appendChild(currentLabel_0);

    // current score
    const currentScore_0 = newDiv('current-0', 'player-current-score','0', currentBox_0);

    // =====================================================

    // === Player 2 Panel ===
    const player_1_panel = document.createElement('div');
    player_1_panel.classList.add('player-1-panel');
    wrapper.appendChild(player_1_panel);

    // player name
    const player_1_name = newDiv('name-1', 'player-name', 'Player 2', player_1_panel);

     // player score
     const player_1_score = newDiv('score1', 'player-score', '0', player_1_panel);

     // player current box
    const currentBox_1 = document.createElement('div');
    currentBox_1.classList.add('player-current-box');
    player_1_panel.appendChild(currentBox_1);
    
     // player current label
     const currentLabel_1 = document.createElement('div');
     currentLabel_1.classList.add('player-current-label');
     currentLabel_1.innerHTML = 'Current';
     currentBox_1.appendChild(currentLabel_1);

     // current score
    const currentScore_1 = newDiv('current-1', 'player-current-score','0', currentBox_1);

    // =============================================

    // Buttons
    const newGame = document.createElement('button');
    newGame.classList.add('btn-new');
    newGame.innerHTML = 'New Game';
    wrapper.appendChild(newGame);

    const rollDice = document.createElement('button');
    rollDice.classList.add('btn-roll');
    rollDice.innerHTML = 'Roll Dice';
    wrapper.appendChild(rollDice);

    const holdDice = document.createElement('button');
    holdDice.classList.add('btn-hold');
    holdDice.innerHTML = 'Hold Dice';
    wrapper.appendChild(holdDice);

    // Input 
    const inputScore = document.createElement('input');
    inputScore.placeholder = 'Default = 100';
    inputScore.classList.add('final-score');
    wrapper.appendChild(inputScore);

    // Dice Image
    const firstDice = new Image();
    firstDice.id = 'dice-1';
    firstDice.classList.add('dice');
    wrapper.appendChild(firstDice);

    const secondDice = new Image();
    secondDice.id = 'dice-2';
    secondDice.classList.add('dice');
    wrapper.appendChild(secondDice);

    return wrapper;
}

document.body.appendChild(component());