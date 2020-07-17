/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

* Your 3 Coding challanges
 * Change the game to follow the rules:
 * 
 * 1. A player looses his/her entire score when he/she rolls two 6's in a row. After that, it's the next player's turn. (HINT: Always save the previous dice roll in a seperate variable)
 * 2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (HINT: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out.)
 * 3. Add another dice to the game, so that there are two dices now. The player looses his/her current score when one of them is a 1. (HINT: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

// initialize variables
var scores, roundScore, activePlayer, gamePlaying;

// call init function
init();

var lastDice;

// selects the btn-roll class
// listens for the 'click' event for ('.btn-roll') class
// use an anonymous function to execute that bit of code when click event is exacuted
document.querySelector('.btn-roll').addEventListener('click', function(){

    // do if statement to check if the game is active; if not switch to next player
    if(gamePlaying){

        // sets the dice1 and dice2 variables equal to the math function
        // floor converts numbers from floats to intergers (whole numbers)
        // random creats a random number
        // dice1 and dice2 variables are equal to an integer that is between 1 - 6, including 1
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // select the dice-1, dice-2 id's and set display to block in css
        // update the img src with the dice number indicated above.
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-1').src = 'dice-' + dice2 + '.png';

        // check if both dice variables (dice1, dice2) are not equal to 1
        if(dice1 !== 1 && dice2 !== 1){

            // Add to score variable; increment the roundScore variable by the number held in the variable dice1 and dice2
            roundScore += dice1 + dice2;

            // querySelector selects the id (must include '#') from the 'id' element, from html document
            // textContext changes the text
            // selects the id '#current-(appends to active player variable)' and changes the text from the textContent and assigns to the variable dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else{

            // switch to next player
            nextPlayer();

        }

        /* if(dice === 6 && lastDice === 6){

            // player loses score
            scores[activePlayer] = 0;

            // Update the user interface (UI)
            document.querySelector('#score-' + activePlayer).textContent = '0';

            // call nextPlayer function
            nextPlayer();

        } else if(dice !== 1){ // update the round score IF the rolled number was NOT a 1
            // do if statement to show if the current user is to continue, or switch to next player (equal to 1 or 0).

            // Add to score variable; increment the roundScore variable by the number held in the variable dice
            roundScore += dice;

            // querySelector selects the id (must include '#') from the 'id' element, from html document
            // textContext changes the text
            // selects the id '#current-(appends to active player variable)' and changes the text from the textContent and assigns to the variable dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else{

            // switch to next player
            nextPlayer();
        }

        // create and set lastDice variable to hold the value for the variable dice
        lastDice = dice; */
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){
        // ADD current score to the gloabal score
        scores[activePlayer] += roundScore;

        // Update the user interface (UI)
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // set the input variable to equal the final-score class's value
        var input = document.querySelector('.final-score').value;

        // initialize winningScore
        var winningScore;
        
        //check if input is not empty
        if(input){

            // set new variable winningScore to the input value
            winningScore = input;

        } else{

            // set winning variable to default value of 100
            winningScore = 100;
        }

        //Check if user has won the game
        if(scores[activePlayer] >= winningScore){

            // select the id from name (#name-'activePlayer variable') and add the text winner
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'

            // select the dice-1 class (.dice-1) and change the style (.style) to display (.display) none
            document.getElementById('dice-1').style.display = 'none';

            // select the dice-2 class (.dice-2) and change the style (.style) to display (.display) none
            document.getElementById('dice-2').style.display = 'none';

            // select the player-(activePlayer variable)-panel class and add the winner class (.winner to the end of the html)
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            // select the player-(activePlayer variable)-panel class and remove the winner class (.winner from the end of the html)
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            // set gamePlaying variable to false
            gamePlaying = false;

        } else{
            // call nextPlayer function defined below
            nextPlayer();
        }
    }

});

// define nextPlayer function
function nextPlayer(){

    // switch to next player
    // shorthand if/else statement
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // set roundScore variable back to zero if next player is initiated
    roundScore = 0;

    // select the id ('current-0') and set it to 0
    document.getElementById('current-0').textContent = '0';

    // select the id ('current-1') and set it to 0
    document.getElementById('current-1').textContent = '0';

    // selects the class ('.player-0-panel') and toggles or switches between adding and removing the (.active) class
    document.querySelector('.player-0-panel').classList.toggle('active');


    // selects the class ('.player-1-panel') and toggles or switches between adding and removing the (.active) class
    document.querySelector('.player-1-panel').classList.toggle('active');

    // selects the dice id (#dice-1) and changes the display (.display) for the dice id with .style and changes the value of display to none
    document.getElementById('dice-1').style.display = 'none';

    // selects the dice id (#dice-2) and changes the display (.display) for the dice id with .style and changes the value of display to none
    document.getElementById('dice-2').style.display = 'none';
}

// select the class '.btn-new and listen for the click event
document.querySelector('.btn-new').addEventListener('click', init);

// define init (initialize) function
function init(){

    // reset variables
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true; // set gamePlaying as true to show that the game is still in play while the game is in play. Set to false when the game is over.

    // selects the dice id (#dice-1) and changes the display (.display) for the dice id with .style and changes the value of display to none
    document.getElementById('dice-1').style.display = 'none';

    // selects the dice id (#dice-2) and changes the display (.display) for the dice id with .style and changes the value of display to none
    document.getElementById('dice-2').style.display = 'none';

    // select the id (score-0) with getElementById to '0'
    document.getElementById('score-0').textContent = '0';

    // select the id (score-1) with getElementById to '0'
    document.getElementById('score-1').textContent = '0';

    // select the id (current-0) with getElementById to '0'
    document.getElementById('current-0').textContent = '0';

    // select the id (current-1) with getElementById to '0'
    document.getElementById('current-1').textContent = '0';

    // select the id from the id name-0 (#name-0) and replace the 'Winner' text to 'Player 1', if exists
    document.getElementById('name-0').textContent = 'Player 1';

    // select the id from the id name-1 (#name-1) and replace the 'Winner' text to 'Player 2', if exists
    document.getElementById('name-1').textContent = 'Player 2';

    // select the (.player-0-panel) class and remove the winner class (.winner) to the end of the html
    document.querySelector('.player-0-panel').classList.remove('winner');

    // select the .(player-1-panel) class and remove the winner class (.winner) to the end of the html
    document.querySelector('.player-1-panel').classList.remove('winner');

    // select the (.player-0-panel) class and remove the winner class (.active) to the end of the html
    document.querySelector('.player-0-panel').classList.remove('active');

    // select the .(player-1-panel) class and remove the winner class (.active) to the end of the html
    document.querySelector('.player-1-panel').classList.remove('active');

    // select the .(player-0-panel) class and add the winner class (.active) to the end of the html
    document.querySelector('.player-0-panel').classList.add('active');

}


