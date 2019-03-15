//  very simple arrays of one letter and one underscore to represent the puzzle environment

var blankSet = ["_"];
var wordSet = ["a"];
var wrongLetters = [];

// targeting the location for displaying the current word
var targetDiv = document.getElementById("currentWord");
// creating a div element in the current word area
var gameArea = document.createElement("div");
// inserting text content, in this simplified case, one underscore
gameArea.textContent = blankSet;
targetDiv.appendChild(gameArea);

// targeting the location for displaying guessed letters that aren't in the current word
var wrongDiv = document.getElementById("wrongLetters");
// creating a div element in the area for letters guessed
var letterGuessed = document.createElement("div");
letterGuessed.textContent = ["wrong guesses appear here"];
wrongDiv.appendChild(letterGuessed);

// when the user presses a key, if that key is the letter "a", then reveal the "a"
// otherwise leave the blank / underscore and console log "there is no [key pressed] in the word"
//gameArea.textContent = wordSet;

document.onkeyup = (event) => {
    // consider making an if statement about if the key pressed is a letter key
    // look up javascript keycodes & ask about it
    
    var userPlay = event.key;
    //alert(`You played: ${userPlay}`);
    console.log(userPlay);

    if (userPlay === "a") {
        gameArea.textContent = wordSet;
    }
    else {
        // look up the .push() 
        wrongLetters.push(` ${userPlay}`);
        letterGuessed.textContent = `You've guessed: ${wrongLetters}`;
        console.log(`wrong letters: ${wrongLetters}`);
    
    }
    
}


//targetDiv.appendChild(gameArea);

console.log(gameArea.textContent);
console.log(wordSet[0]);



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

// <!-- Wins (counter ) -->

// <!-- Current word -->
// <!-- simplified test case: a single letter that is hidden until typed -->


// <!-- You have # guesses remaining -->

// <!-- Letters guessed -->