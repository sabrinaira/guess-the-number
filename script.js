/**
 * & QCC SWE Spring 2025 - Project 3 by Linda Green & Sabrina Ira
 * ^ I added this event listener function to wait for the DOM to be fully loaded,
 * ^ before running any scripts.
 * ^ This will ensure that all elements are accessible.
 * Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
 */
addEventListener('DOMContentLoaded', () => {
  /**
   * * We declare variables to store document methods,
   * * so that it is easier to type and refer to these variables.
   * ^ This is where we let JavaScript connect the element from the HTML body
   * */
  const currentScore = document.querySelector('.currentScore');
  const highScoreHistory = document.querySelector('.highScore');
  const history = document.getElementById('history');
  const input = document.querySelector('input');
  const btn = document.getElementById('check');
  const msg = document.querySelector('.response');
  const resetBtn = document.getElementById('reset');
  const innerBox = document.querySelector('.inner-box');
  const copyRight = document.createElement('p');
  const body = document.querySelector('body');
  /**
   * * We declare variables here using 'let' keyword to store the random number after every reset
   * * Since Math.random() alone returns floating integers,
   * * you'll want to use Math.floor() to round it up to the nearest whole number.
   */
  let randomNum = Math.floor(Math.random() * 100) + 1;
  /**
   * & Math.random() gives a decimal between 0 (inclusive) and 1 (exclusive)
   * & Multiplying by 100 gives a range from 0 to just under 100.
   * & Math.floor() then brings it down to a whole number — so 0 to 99.
   * & Adding 1 shifts the whole range to 1 to 100.
   */
  // Project 3 by Linda Green & Sabrina Ira
  // ^ Feel free to comment/uncomment this to test!
  console.log(randomNum);

  let score = 10; // the default score should be set to 10

  /**
   * * if there's already high score achieved previously, update high score variable to latest value
   * * Number(localStorage.getItem('highScore')) --> this will safely convert the previously stored High Score into a number
   * * otherwise, high score starts at 0
   * * || --> this is called the OR operator
   * */
  let highScore = Number(localStorage.getItem('highScore')) || 0;

  // & this will store the guessed values that player attempted
  let guessHistory = []; // initialize an empty array to store the wrong guesses

  /**
   * * This is to set the default values on the html page,
   * * for Current Score and High Score
   * */
  currentScore.textContent = `Current Score: ${score}`;
  highScoreHistory.textContent = `High Score: ${highScore}`;
  copyRight.innerHTML =
    '&copy; Guess the Number - Game Project by Linda Green & Sabrina Ira';

  /**
   * ^ This is the function for the Guess History feature.
   * ^ After each wrong guess, the value will be recorded,
   * ^ to avoid any repeated values during the game.
   */
  function updateHistory() {
    history.innerHTML = '';
    // ? I used a for loop to help append each incorrect guess to display on the page
    for (let i = 0; i < guessHistory.length; i++) {
      let li = document.createElement('li');
      li.innerText = guessHistory[i];
      history.appendChild(li);
    }
  }

  // ^ This is the event listener function for the button when the user "clicks" on it.
  btn.addEventListener('click', () => {
    // console.log(input.value); // this is just for testing purposes on the browser console

    const guess = Number(input.value); // Stored in 'guess' variable for easier reference

    // & This is to check if the value is empty, or if it's truly not a number
    if (input.value === '' || isNaN(guess)) {
      return (msg.textContent = 'Please type your guess in the text box.');
    }

    // & This is to check if inputted value is 0 or not a Number
    if (!guess || guess > 100) {
      return (msg.textContent =
        'Invalid type of input. Needs to be a number between 1 and 100.');
    }

    /**
     * & If the inputted value is incorrect
     * ^ I refactored to make sure JS will check the score AFTER it's being reduced for every wrong guess
     */
    if (guess !== randomNum) {
      if (guessHistory.includes(guess)) {
        return (msg.textContent =
          "You've guessed this number already! Try a different number.");
      }
      guessHistory.push(guess);
      // Project 3 by Linda Green & Sabrina Ira
      score--; // decrement the score first
      currentScore.textContent = `Current Score: ${score}`;

      // ! If the score reaches 0, it will be game over for the player.
      if (score === 0) {
        // ^ Inserting an element tag to wrap the secret number
        let printScore = document.createElement('span');
        printScore.innerText = `${randomNum}`;
        printScore.style.fontWeight = 'bold';

        // ^ Inserting additional elements within the container
        let tryAgain = document.createElement('p');
        tryAgain.textContent =
          "Don't give up. Just try again. Maybe you'll win next time!";
        let revealSecret = document.createElement('p');
        revealSecret.textContent = 'My number was: ';
        revealSecret.appendChild(printScore);

        let tryAgainBtn = document.createElement('button');
        tryAgainBtn.innerHTML = 'Try Again';
        tryAgainBtn.addEventListener('click', resetGame);

        input.disabled = true; // Disables the input field
        btn.disabled = true; // Disables the check button from being clicked
        msg.textContent = 'Unfortunately, you lost the game.';
        innerBox.appendChild(tryAgain);
        innerBox.appendChild(revealSecret);
        innerBox.appendChild(tryAgainBtn);

        return; // exit the function early without returning anything
      }

      // ^ Check if the guess is higher than secret number
      if (guess > randomNum) {
        msg.textContent = 'Your guess is too high! Try again.';
      } else {
        // ^ if the guess is lower than secret number
        msg.textContent = 'Your guess is too low. Try again!';
      }

      updateHistory();
    }

    /**
     * & If the inputted value is actually the right number!
     */
    if (typeof guess === 'number') {
      // * if the value guesses the given number correctly
      if (guess === randomNum) {
        // ^ Inserting an element tag to wrap the secret number
        let printScore = document.createElement('span');
        printScore.innerText = `${randomNum}`;
        printScore.style.fontWeight = 'bold';
        msg.textContent = `Hooray! You guessed the number correctly! `;
        msg.appendChild(printScore);
        msg.append(' is my secret number.');

        // ^ Inserting additional elements within the container
        let scoreWin = document.createElement('h2');
        let bestScore = document.createElement('h3');
        scoreWin.textContent = `Your Score: ${score}`;
        bestScore.textContent = `Best: ${highScore}`;

        let playAgainBtn = document.createElement('button');
        playAgainBtn.innerHTML = 'Play Again';
        playAgainBtn.addEventListener('click', resetGame);

        // ? if the new winning score is higher than the previous high score
        if (score > highScore) {
          highScore = score;
          localStorage.setItem('highScore', String(score)); // the values passed in must be in a string
        }
        innerBox.appendChild(scoreWin);
        innerBox.appendChild(bestScore);
        innerBox.appendChild(playAgainBtn);
        return (highScoreHistory.textContent = `High Score: ${highScore}`);
      }
    }
  });

  // & Creating a reusable reset game function for multiple buttons
  const resetGame = () => {
    input.disabled = false;
    btn.disabled = false;
    location.reload(); // This method helps reload the page without having the player refresh the page on their own.
  };

  // * This event listener will reset the game.
  body.appendChild(copyRight);
  resetBtn.addEventListener('click', resetGame);

  // & QCC SWE Spring 2025 - Project 3 by Linda Green & Sabrina Ira
});
