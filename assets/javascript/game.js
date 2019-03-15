//  very simple arrays of one letter and one underscore to represent the puzzle environment
"use strict"

// initialize variables

var wordBeingGuessed = "_____";
var wordSet = "apple";
var wrongLetters = [];
var winsCounter = 0;
var remChances = 12;
var initialKeyPress = 0;


// define a replaceAt function

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
  }

// targeting the location for displaying the current word
// var targetDiv = ; could take this out if i can just insert text into the document
// same thing happened below, we were able to remove the wrongDiv variable like we
// removed the targetDiv variable

// winning message
var winMessage = document.createElement("div");
winMessage.textContent = (`You've won!`);

// wins -- how many times the player has won -- inserting text content
var displayWins = document.createElement("div");
displayWins.textContent = (`Wins: ${winsCounter}`);
document.getElementById("winsCount").appendChild(displayWins);

// creating the current word area
var gameArea = document.createElement("div");
// inserting text content, in this simplified case, one underscore
gameArea.textContent = wordBeingGuessed;
document.getElementById("currentWord").appendChild(gameArea);

// display remaining chances (countdown) -- inserting text content
var remaining = document.createElement("div");
remaining.textContent = (`Chances: ${remChances}`);
document.getElementById("remainingGuesses").appendChild(remaining);

// targeting the location for displaying guessed letters that aren't in the current word
//var wrongDiv = ;
// creating a div element in the area for letters guessed
var letterGuessed = document.createElement("div");
letterGuessed.textContent = (`You've guessed: `);
document.getElementById("wrongLetters").appendChild(letterGuessed);


document.onkeyup = (event) => {
    // initial change of text once user starts playing the game

    // change the key press value to lowercase
    var userPlay = event.key.toLowerCase();

    // check that the userPlay is a letter, not some other key (e.g. a number, symbol, F5)
    if ("abcdefghijklmnopqrstuvwxyz".includes(userPlay)) {
        console.log(userPlay); // can remove at end

        // does the userPlay match a character in the current word?
        if (wordSet.includes(userPlay)) {
            // walk through the wordSet (current word) letter by letter
            for (var i = 0; i < wordSet.length; i++) {
                // if the userPlay is the same as the character at that index in the current word
                if (userPlay === wordSet[i]) {
                    // take the in-progress word, go to the indexed character, and
                    // replace it with the userPlay
                    wordBeingGuessed = replaceAt(wordBeingGuessed, i, userPlay);
                    // update the text content with the letter that the user guessed correctly
                    gameArea.textContent = wordBeingGuessed;
                    console.log(wordBeingGuessed);  
                }
                
            }
            
            // if there are no more letters remaining to be guessed (the current word has no more blanks)
            if (wordBeingGuessed.includes("_") == false) {
                // display a winning message
                document.getElementById("gamestatus").appendChild(winMessage);
                // increment the wins counter by +1 
                winsCounter += 1;
                // update the displayed text of winsCounter: 
                displayWins.textContent = (`Wins: ${winsCounter}`);
                // reset the game to a new puzzle, but for now we will reset to the current puzzle
            }


        }
        else {
            // exclude letters already guessed from getting added again
            if (wrongLetters.includes(userPlay) == false) {
                
                // add the wrong guess to the wrongLetters array (now without the extra space!)
                wrongLetters.push(`${userPlay}`);
                // the letterGuessed text area gets updated with the new wrong guess (itself plus the new guess)
                letterGuessed.textContent += `${userPlay}, `;
                remChances -= 1;
                remaining.textContent = (`Chances: ${remChances}`);

            
                // if the player gets down to 1 chance, add a "last chance!" reminder
                if (remChances === 1) {
                    remaining.textContent = (`Chances: ${remChances} -- this is your last chance!`);
                    
                }


                // if the player runs out of chances, what do we do?
                if (remChances === 0) {
                    // the line below doesn't display as Chances: 0 at all  ._.
                    remaining.textContent = (`Chances: ${remChances}`);
                    // tell them that the game is over
                    console.log("game over :(");
                    // reset the chances to 12 so they can play again
                    remChances = 12;
                    // assign a new word to the current word slot (underscores)
                    gameArea.textContent = wordBeingGuessed;
                    // reset the wrong guesses area
                    letterGuessed.textContent = (`You've guessed: `);
                    // clear out the wrongLetters array
                    wrongLetters = [];
                    
                }
            }
            console.log(remChances);
            console.log(`wrong letters: ${wrongLetters}`);
        
        }
    }
    
}


//targetDiv.appendChild(gameArea);

console.log(gameArea.textContent);



// can use to insert "gameArea" content (wordset) before the id that "testLoc" has grabbed
// in this case, before the #gameplay div element
//var testLoc = document.getElementById("gameplay");
//targetDiv.insertBefore(gameArea,testLoc);

// copied as a test from w3schools
// var para = document.createElement("p");
// var node = document.createTextNode("This is again new.");
// para.appendChild(node);

// var element = document.getElementById("container");
// element.appendChild(para);

//

// var targetDiv = document.getElementById("gameplay");
// var wordDiv = document.createElement("div")

// wordDiv.textContent = wordset[0];

// targetDiv.appendChild(wordDiv);

// <!-- Press any key to begin -->
// <!-- maybe it^^ could change to say "Guess the word before you run out of chances" -->