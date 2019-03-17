//  javaScript for Get Fruity! the word guess game
"use strict"

// define and initialize variables
//
var wrongLetters = [];  //  empty set that will hold incorrect letter guesses
var winsCounter = 0;    //  counter for how many times the player has won
var remChances = 10;    //  counter for remaining chances (how many more times the player can guess before they lose)
var currentWord = "";   //  initializing the chosen word (to be guessed) as an empty string
var wordBeingGuessed = "";  // initializing the in-progress word (will be shown as a underscores "_") as an empty string
//
// the set of words used in Get Fruity's puzzles, one will be picked at random at the beginning of each game
var wordSet = ["pear", "apple", "persimmon", "canteloupe", "pineapple", "durian", "avocado", "cranberry", "pomegranate"];
//
// end of variables

// defining functions
//
// replaceAt function: (found at https://gist.github.com/efenacigiray/9367920)
// used for
// 1. creating our initial string of underscores, and
// 2. for updating the wordBeingGuesses to reveal correctly guessed letters.
//
function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}
//
// newPuzzle function:
// used for 
// 1. initializing the game, and
// 2. resetting the game (called after you've won or lost).
// note: upon win or loss, the wins count & win/loss message displays are handled separately
//
function newPuzzle() {
    // select a new puzzle from wordSet (currentWord)
    // -- preferably one that hasn't been chosen yet! -- but this isn't a priority
    var random = Math.floor(Math.random() * (wordSet.length));
    //console.log(random);
    currentWord = wordSet[random];
    //console.log(`currentWord: ${currentWord}`);

    // reset wordBeingGuessed to "" to avoid word-length overwrite problems
    wordBeingGuessed = "";
    
    // set wordBeingGuessed to the currentWord, which will get overwritten in the
    // following for loop
    wordBeingGuessed = currentWord;
    
    // generate a new string of underscores to go along with the newly
    // selected puzzle
    for (let j = 0; j < currentWord.length; j++) {
        wordBeingGuessed = replaceAt(wordBeingGuessed, j, "_");
        //console.log(wordBeingGuessed);
    }

    // clear out the "you've guessed" text area
    letterGuessed.textContent = (`You've guessed: `);

    // empty / reset the wrongLetters array
    wrongLetters = [];

    // reset the instruction text to "press any key..."
    instructionText.textContent = (`Press any key to begin`);

    // reset the remaining chances
    remChances = 10;
    // display the reset chances
    remaining.textContent = (`Chances: ${remChances}`);

    // update the gameplay area to show the new string of underscores
    gameArea.textContent = wordBeingGuessed;
}
//
// end of function descriptions

// creating divs for game text content -- all of which updates as gameplay progresses
//
// win/loss message area -- updates when the player wins or loses
var winLossMessage = document.createElement("div");
winLossMessage.textContent = (``);
document.getElementById("gamestatus").appendChild(winLossMessage);
//
// initial instruction text area -- updates once user starts playing
var instructionText = document.createElement("div");
instructionText.textContent = (`Press any key to begin`);
document.getElementById("instructions").appendChild(instructionText);
//
// wins count area -- how many times the player has won -- updates after player wins
var displayWins = document.createElement("div");
displayWins.textContent = (`Wins: ${winsCounter}`);
document.getElementById("winsCount").appendChild(displayWins);
//
// current word area & inserting the string of underscores (wordBeingGuessed) -- reveals letters with correct guesses
var gameArea = document.createElement("div");
gameArea.textContent = wordBeingGuessed;
document.getElementById("currentWord").appendChild(gameArea);
//
// remaining chances (countdown) area -- updates as player guesses incorrectly
var remaining = document.createElement("div");
remaining.textContent = (`Chances: ${remChances}`);
document.getElementById("remainingGuesses").appendChild(remaining);
//
// displaying incorrect letter guesses -- updates as player guesses incorrectly
var letterGuessed = document.createElement("div");
letterGuessed.textContent = (`You've guessed: `);
document.getElementById("wrongLetters").appendChild(letterGuessed);
//
// end of creating divs for game text content

// initializing the game
newPuzzle();
//

// gameplay!
//
// the whole game is driven by the user pressing keys and they key value being captured upon release (key up)
document.onkeyup = (event) => {
    // initial change of text once user starts playing the game
    instructionText.textContent = ('Press letter keys to solve the fruity word puzzle before you run out of chances');
    winLossMessage.textContent = (``);

    // change the key press value to lowercase
    var userPlay = event.key.toLowerCase();

    // check that the userPlay is a letter, not some other key (e.g. a number, symbol, F5)
    if ("abcdefghijklmnopqrstuvwxyz".includes(userPlay)) {
        // console.log(userPlay); // can remove at end

        // does the userPlay match a character in the current word?
        // if yes (winning moves & consequences)
        if (currentWord.includes(userPlay)) {
            // walk through the wordSet (current word) letter by letter
            for (var i = 0; i < currentWord.length; i++) {
                // if the userPlay is the same as the character at that index in the current word
                if (userPlay === currentWord[i]) {
                    // take the in-progress word, go to the indexed character, and
                    // replace it with the userPlay
                    wordBeingGuessed = replaceAt(wordBeingGuessed, i, userPlay);
                    // update the text content with the letter that the user guessed correctly
                    gameArea.textContent = wordBeingGuessed;
                    //console.log(wordBeingGuessed);  
                }
                
            }
            
            // if there are no more letters remaining to be guessed (the current word has no more blanks)
            if (wordBeingGuessed.includes("_") == false) {
                // display a winning message
                winLossMessage.textContent = (`You've won! Good job guessing ${currentWord}!`);
                // increment the wins counter by +1 
                winsCounter += 1;
                // update the displayed text of winsCounter: 
                displayWins.textContent = (`Wins: ${winsCounter}`);
                // reset the game to a new puzzle (see function actions in earlier code)
                newPuzzle();

            }

        }
        // if the userPlay does not match a character in the current word...
        else {
            // exclude letters already guessed from getting duplicated to wrongLetters/"You've guessed" list
            if (wrongLetters.includes(userPlay) == false) {
                // (if the player has guessed a new wrong letter...)
                // add the wrong guess to the wrongLetters array
                wrongLetters.push(`${userPlay}`);
                // the letterGuessed text area gets updated with the new wrong guess (itself plus the new guess)
                letterGuessed.textContent += `${userPlay}, `;
                // the chances remaining decrease by one
                remChances -= 1;
                // the chances remaining updates on the screen
                remaining.textContent = (`Chances: ${remChances}`);

                // if the player gets down to 1 chance, add a "last chance!" reminder
                if (remChances === 1) {
                    remaining.textContent = (`Chances: ${remChances} -- this is your last chance!`);
                }

                // if the player runs out of chances...
                if (remChances === 0) {
                    // display a "game over" message
                    winLossMessage.textContent = ("Game over. Better luck on the next fruit.");
                    // reset with a new (or at least randomly selected) word
                    newPuzzle();
                }
            }
            //console.log(remChances);
            //console.log(`wrong letters: ${wrongLetters}`);
        }
    }
    
}
//
// end of gameplay
// 
// end of game code