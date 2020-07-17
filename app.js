/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// initialize variables
var scores, roundScore, activePlayer, gamePlaying;

// call init function
init();

// selects the btn-roll class
// listens for the 'click' event for ('.btn-roll') class
// use an anonymous function to execute that bit of code when click event is exacuted
document.querySelector('.btn-roll').addEventListener('click', function(){

    // do if statement to check if the game is active; if not switch to next player
    if(gamePlaying){

        // sets the dice variable equal to the math function
        // floor converts numbers from floats to intergers (whole numbers)
        // random creats a random number
        // dice is equal to an integer that is between 1 - 6, including 1
        var dice = Math.floor(Math.random() * 6) + 1;

        // display result by creating the diceDOM variable
        // change the style to display: block;
        // update the img src with the dice number indicated above.
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        // update the round score IF the rolled number was NOT a 1
        // do if statement to show if the current user is to continue, or switch to next player (equal to 1 or 0).
        if(dice !== 1){

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
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){
        // ADD current score to the gloabal score
        scores[activePlayer] += roundScore;

        // Update the user interface (UI)
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if user has won the game
        if(scores[activePlayer] >= 100){

            // select the id from name (#name-'activePlayer variable') and add the text winner
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'

            // select the dice class (.dice) and change the style (.style) to display (.display) none
            document.querySelector('.dice').style.display = 'none';

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

    // selects the dice class (.dice) and changes the display (.display) for the dice class with .style and changes the value of display to none
    document.querySelector('.dice').style.display = 'none';
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

    // selects the dice class (.dice) and changes the display (.display) for the dice class with .style and changes the value of display to none
    document.querySelector('.dice').style.display = 'none';

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