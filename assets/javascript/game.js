//  javaScript for Get Fruity! the word guess game
'use strict'

// define and initialize variables
//
var wrongLetters = [] //  empty set that will hold incorrect letter guesses
var winsCounter = 0 //  counter for how many times the player has won
var remChances = 10 //  counter for remaining chances (how many more times the player can guess before they lose)
var currentWord = '' //  initializing the chosen word (to be guessed) as an empty string
var wordBeingGuessed = '' // initializing the in-progress word (will be shown as a underscores "_") as an empty string
var userPlay = null
var lastPlay = null
var lastPuzzle = ''
var newGameDelay = null

//
// the set of words used in Get Fruity's puzzles, one will be picked at random at the beginning of each game
var wordSet = ['pear', 'apple', 'persimmon', 'canteloupe', 'pineapple', 'durian', 'avocado',
  'cranberry', 'pomegranate', 'jackfruit', 'cherry', 'papaya', 'mango', 'honeydew', 'apricot',
  'lychee', 'pomelo', 'kiwi']
//
// end of variables

// defining functions
//
// replaceAt function: (found at https://gist.github.com/efenacigiray/9367920)
// used for
// 1. creating our initial string of underscores, and
// 2. for updating the wordBeingGuesses to reveal correctly guessed letters.
//
function replaceAt (string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1)
}
//
// newPuzzle function:
// used for
// 1. initializing the game, and
// 2. resetting the game (called after you've won or lost).
// note: upon win or loss, the wins count & win/loss message displays are handled separately
//
function newPuzzle () {
  // select a new puzzle from wordSet (currentWord)
  // reset
  clearTimeout(newGameDelay)
  console.log(newGameDelay)
  userPlay = null
  mobileKeys = []
  var random = Math.floor(Math.random() * (wordSet.length))
  currentWord = wordSet[random]

  // to avoid serving up the same puzzle twice in a row
  // if the current word is the same as we served last time, run newPuzzle til it's different
  if (currentWord === lastPuzzle) {
    newPuzzle()
  }

  // assign the current word to the lastPuzzle variable which will check for repeats next game
  lastPuzzle = currentWord

  // reset wordBeingGuessed to "" to avoid word-length overwrite problems
  wordBeingGuessed = ''

  // set wordBeingGuessed to the currentWord, which will get overwritten in the
  // following for loop
  wordBeingGuessed = currentWord

  // generate a new string of underscores to go along with the newly
  // selected puzzle
  for (let j = 0; j < currentWord.length; j++) {
    wordBeingGuessed = replaceAt(wordBeingGuessed, j, '_')
  }

  // clear out the "you've guessed" text area
  letterGuessed.textContent = (`You've guessed: `)

  // empty / reset the wrongLetters array
  wrongLetters = []

  // reset the instruction text to "press any key..."
  instructionText.textContent = (`Press any letter key to make your first guess`)

  // reset the remaining chances
  remChances = 10
  // display the reset chances
  remaining.textContent = (`Chances: ${remChances}`)

  // update the gameplay area to show the new string of underscores
  gameArea.textContent = wordBeingGuessed
}
//
// check that the userPlay is a letter, not some other key (e.g. a number, symbol, F5)
function gameplay () {
  if ('abcdefghijklmnopqrstuvwxyz'.includes(userPlay)) {
    // try using setTimeout on the newPuzzle function when it's called at the end of the game?
    // update instruction and winLoss texts once the player has started the next game.
    // the text will update when the player has made any plays in the game
    if (wrongLetters.length === 1 || wordBeingGuessed.match(/_/g) !== wordBeingGuessed.length) {
      instructionText.textContent = ('Press letter keys to solve the fruity word puzzle before you run out of chances')
      winLossMessage.textContent = (``)
    }

    // lastPlay is used to throttle the onkeyup input function so gameplay doesn't run through
    // multiple times from a single letter input
    lastPlay = userPlay

    // does the userPlay match a character in the current word?
    // if yes (winning moves & consequences)
    if (currentWord.includes(userPlay)) {
      // walk through the wordSet (current word) letter by letter
      for (var i = 0; i < currentWord.length; i++) {
        // if the userPlay is the same as the character at that index in the current word
        if (userPlay === currentWord[i]) {
          // take the in-progress word, go to the indexed character, and
          // replace it with the userPlay
          wordBeingGuessed = replaceAt(wordBeingGuessed, i, userPlay)
          // update the text content with the letter that the user guessed correctly
          gameArea.textContent = wordBeingGuessed
        }
      }

      // if there are no more letters remaining to be guessed (the current word has no more blanks)
      if (wordBeingGuessed.includes('_') === false) {
        // clear userPlay
        userPlay = null
        // display a winning message
        winLossMessage.textContent = (`You've won! Good job guessing ${currentWord}!`)
        // increment the wins counter by +1
        winsCounter += 1
        // update the displayed text of winsCounter:
        displayWins.textContent = (`Wins: ${winsCounter}`)
        // reset the game to a new puzzle (see function actions in earlier code)
        // what if we put this into a setTimeout?
        newGameDelay = setTimeout(newPuzzle, 1500)
        console.log(newGameDelay)
      }
      // if the userPlay does not match a character in the current word...
    } else {
      // exclude letters already guessed from getting duplicated to wrongLetters/"You've guessed" list
      if (wrongLetters.includes(userPlay) === false) {
        // (if the player has guessed a new wrong letter...)
        // add the wrong guess to the wrongLetters array
        wrongLetters.push(`${userPlay}`)
        // the letterGuessed text area gets updated with the new wrong guess (itself plus the new guess)
        letterGuessed.textContent += `${userPlay}, `
        // clear userPlay
        userPlay = null
        // the chances remaining decrease by one
        remChances -= 1
        // the chances remaining updates on the screen
        remaining.textContent = (`Chances: ${remChances}`)

        // if the player gets down to 1 chance, add a "last chance!" reminder
        if (remChances === 1) {
          remaining.textContent = (`Chances: ${remChances} -- this is your last chance!`)
        }

        // if the player runs out of chances...
        if (remChances === 0) {
          // display a "game over" message
          winLossMessage.textContent = ('Game over. Better luck on the next fruit.')
          // reset with a new (or at least randomly selected) word
          newPuzzle()
        }
      }
    }
  }
}
//

/* eslint-disable no-unused-vars */
function getFocus () {
  document.getElementById('myTextField').focus()
}
/* eslint-enable no-unused-vars */

// end of function descriptions

// creating divs for game text content -- all of which updates as gameplay progresses
//
// win/loss message area -- updates when the player wins or loses
var winLossMessage = document.createElement('div')
winLossMessage.textContent = (``)
document.getElementById('gamestatus').appendChild(winLossMessage)
//
// initial instruction text area -- updates once user starts playing
var instructionText = document.createElement('div')
instructionText.textContent = (`Press any key to begin`)
document.getElementById('instructions').appendChild(instructionText)
//
// wins count area -- how many times the player has won -- updates after player wins
var displayWins = document.createElement('div')
displayWins.textContent = (`Wins: ${winsCounter}`)
document.getElementById('winsCount').appendChild(displayWins)
//
// current word area & inserting the string of underscores (wordBeingGuessed) -- reveals letters with correct guesses
var gameArea = document.createElement('div')
gameArea.textContent = wordBeingGuessed
document.getElementById('currentWord').appendChild(gameArea)
//
// remaining chances (countdown) area -- updates as player guesses incorrectly
var remaining = document.createElement('div')
remaining.textContent = (`Chances: ${remChances}`)
document.getElementById('remainingGuesses').appendChild(remaining)
//
// displaying incorrect letter guesses -- updates as player guesses incorrectly
var letterGuessed = document.createElement('div')
letterGuessed.textContent = (`You've guessed: `)
document.getElementById('wrongLetters').appendChild(letterGuessed)
//
// end of creating divs for game text content

// attempt to capture mobile keyboard input
// var mobilekey = document.getElementById("myTextField").getAttribute('value');
// var mobiletyping = mobilekey.value;
var mobileKeys = []
var mobileInput = []
mobileInput = document.getElementById('myTextField')
//
// end of mobile keyboard input attempt initial statements

// initializing the game -- calling the newPuzzle() function
newPuzzle()
//

// gameplay!
//
// the whole game is driven by the user pressing keys and they key value being captured upon release (key up)
document.onkeyup = (event) => {
  // change the key press value to lowercase
  userPlay = event.key.toLowerCase()

  // checks to see if this function is just running because the text field receieved input
  // (from the eventlistener below), or if the user has just played the same key again, which
  // shouldn't result in anything new happening
  if (userPlay === lastPlay) {
    userPlay = null
  }
  // starts the gameplay (might pass in a "null" value but that will get filtered in gameplay)
  gameplay()
}
//
//
// mobile gameplay -- Beta!
// testing mobile key capture: if any input happens in the text field that comes into focus after
// clicking the "On mobile?" button...
document.querySelector('input.form-control').addEventListener('input', function (e) {
  // prevent the normal action
  e.preventDefault()
  // select the last character in the text field (they could backspace but it would just run the same
  // letter again which shouldn't change anything in the gameplay)
  // assign the last character to appear in the text field to a variable
  mobileKeys = mobileInput.value.substr(-1)
  // console.log(`mobileKeys: ${mobileKeys}`);

  // set the userPlay equal to mobileKeys in this case, same toLowerCase() treatment as above
  userPlay = mobileKeys.toLowerCase()

  // cleans up the input in case it is visible somehow
  document.getElementById('myTextField').value = ''
  mobileKeys = ''

  // checks to see if this function is just running because the text field receieved input
  // or if the user has just played the same key again, which shouldn't result in anything new happening.
  // I'm not convinced this if statement is necessary, but still testing.
  if (userPlay === lastPlay) {
    userPlay = null
  }
  // starts the gameplay (might pass in a "null" value but that will get filtered in gameplay)
  gameplay()
})
//
// end of gameplay
//
// end of game code
