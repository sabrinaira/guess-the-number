/**
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

  /** Feel free to comment/uncomment this to test! */
  // console.log(randomNum);

  let score = 10; // the default score should be set to 10
  let highScore = 0; // this will store the leftover points the player has when game is complete
  let guessHistory = []; // this will store the guessed values that player attempted

  /**
   * * This is to set the default values on the html page,
   * * for Current Score and High Score
   * */
  currentScore.textContent = `Current Score: ${score}`;
  highScoreHistory.textContent = `High Score: ${highScore}`;

  /**
   * ^ This is the function for the Guess History feature.
   * ^ After each wrong guess, the value will be recorded,
   * ^ to avoid any repeated values during the game.
   */
  function updateHistory() {
    history.innerHTML = '';
    for (let i = 0; i < guessHistory.length; i++) {
      let li = document.createElement('li');
      li.innerText = guessHistory[i];
      history.appendChild(li);
    }
  }

  // ^ This is the event listener function for the button when the user "clicks" on it.
  btn.addEventListener('click', () => {
    console.log(input.value);

    const guess = Number(input.value); // Stored in 'guess' variable for easier reference

    // & This is to check if the value is empty, or if it's truly not a number
    if (input.value === '' || isNaN(guess)) {
      return (msg.textContent = 'Please type your guess in the text box.');
    }

    // & This is to check if inputted value is not a Number
    if (!guess) {
      return (msg.textContent = 'Invalid type of input. Needs to be a number.');
    }

    // ! If the score reaches 0, it will be game over for the player.
    if (score === 0) {
      input.disabled = true; // Disables the input field
      btn.disabled = true; // Disables the check button from being clicked
      return (msg.textContent =
        'You lost all of your points! Game over. Click the button above to play again.');
    }

    // & If the inputted value is actually a number!
    if (typeof guess === 'number') {
      // * if the value guesses the given number correctly
      if (guess === randomNum) {
        msg.textContent = 'Hooray! You guessed the number correctly!';
        highScore = score;
        return (highScoreHistory.textContent = `High Score: ${highScore}`);
        // ^ If the inputted value is greater than the given number
      } else if (guess > randomNum) {
        guessHistory.push(guess); // this will store the attempted value in the array
        updateHistory(); // update History by calling the function
        msg.textContent = 'Your guess is too high! Try again.';
        score--; // score will decrement for each wrong guess
        return (currentScore.textContent = `Current Score: ${score}`);
        // ^ If the inputted value is lower than the given number
      } else if (guess < randomNum) {
        guessHistory.push(guess);
        updateHistory();
        msg.textContent = 'Your guess is too low. Try again!';
        score--;
        return (currentScore.textContent = `Current Score: ${score}`);
      }
    }
  });

  // * This event listener will reset the game.
  resetBtn.addEventListener('click', () => {
    input.disabled = false;
    btn.disabled = false;
    location.reload(); // This method helps reload the page without having the player refresh the page on their own.
  });

  // QCC SWE Spring 2025 - Project 3 by Linda Green & Sabrina Ira
});
