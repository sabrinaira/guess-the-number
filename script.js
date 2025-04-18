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
  const footer = document.querySelector('footer');
  const copyRight = document.createElement('p');
  copyRight.classList.add('copyright');

  /**
   * * We declare variables here using 'let' keyword to store the random number after every reset
   * * Since Math.random() alone returns floating integers,
   * * you'll want to use Math.floor() to round it up to the nearest whole number.
   */

  let randomNum = Math.floor(Math.random() * 100) + 1;
  const generateRandomNum = () => {
    // arrow function
    return Math.floor(Math.random() * 100) + 1;
  };

  /**
   * & Math.random() gives a decimal between 0 (inclusive) and (exclusive)
   * & Multiplying by 100 gives a range from 0 to just under 100.
   * & Math.floor() then brings it down to a whole number — so 0 to 99.
   * & Adding 1 shifts the whole range to 1 to 100.
   */
  // Project 3 by Linda Green & Sabrina Ira
  // ^ Feel free to comment/uncomment this to test!
  console.log(randomNum);

  let score = 10; // the default score should be set to 10

  /**
   * ! localStorage feature not necessary for this project at this time.
   * If there's already high score achieved previously, update high score variable to latest value
   * Number(localStorage.getItem('highScore')) --> this will safely convert the previously stored High Score into a number
   * Otherwise, high score starts at 0
   * "||" --> this is called the OR operator
   * */
  // let highScore = Number(localStorage.getItem('highScore')) || 0;

  /**
   * & Since we want the user to reset the high score by refreshing the page from their browser, we do not need localStorage at this time.
   */

  let highScore = 0;

  // & this will store the guessed values that player attempted
  let guessHistory = []; // initialize an empty array to store the wrong guesses

  /**
   * * This is to set the default values on the html page,
   * * for Current Score and High Score
   * */
  currentScore.textContent = `Current Score: ${score}`;
  highScoreHistory.textContent = `High Score: ${highScore}`;
  copyRight.innerHTML =
    '&copy; 2025 Guess the Number <br> Game Project by Linda Green & Sabrina Ira';

  /**
   * ^ This is the function for the Guess History feature.
   * ^ After each wrong guess, the value will be recorded,
   * ^ to avoid any repeated values during the game.
   * Project 3 by Linda Green & Sabrina Ira
   */

  function updateHistory() {
    history.innerHTML = '';
    // ? I used a for loop to help append each incorrect guess to display on the page
    for (let i = 0; i < guessHistory.length; i++) {
      let li = document.createElement('li');
      // adding a class name to <li> element to be able to call it for styling
      li.classList.add('guessedNum');
      li.innerText = guessHistory[i];
      history.appendChild(li);
    }
  }

  /**
   * ^ Inserting an element tag to wrap the secret number
   * This needs to be stored in the global context so that the conditional statements can reference this variable
   */
  let secretNum = document.createElement('span');
  secretNum.classList.add('secretNum');
  secretNum.innerText = `${randomNum}`;
  secretNum.style.fontWeight = 'bold';

  // * Winning Game Function
  function handleWin() {
    innerBox.classList.add('winner');
    // Ex. 'Hooray! You guessed the number correctly! 100 is my secret number.'
    msg.textContent = `Hooray! You guessed the number correctly! `;
    msg.appendChild(secretNum);
    msg.append(' is my secret number. 😄');

    // ^ Creating new image tag
    let image = document.createElement('img');
    image.src = './assets/icons8-win-100.png';

    // ^ Creating additional text within the container
    let scoreWin = document.createElement('h2');
    let bestScore = document.createElement('h3');
    scoreWin.textContent = `Your Score: ${score}`;
    bestScore.textContent = `Best: ${highScore}`;
    // Project 3 by Linda Green & Sabrina Ira
    let playAgainBtn = document.createElement('button');
    playAgainBtn.classList.add('resetBtn');
    playAgainBtn.textContent = 'Play Again';
    playAgainBtn.addEventListener('click', resetGame);

    // ? if the new winning score is higher than the previous high score
    if (score > highScore) {
      highScore = score;
      // the values passed in must be in a string
      // localStorage.setItem('highScore', String(score));
      highScoreHistory.textContent = `High Score: ${highScore}`;
    }

    // Finally adding the new elements to the innerBox div
    innerBox.appendChild(image);
    innerBox.appendChild(scoreWin);
    innerBox.appendChild(bestScore);
    innerBox.appendChild(playAgainBtn);

    input.disabled = true; // Disables the input field
    btn.disabled = true; // Disables the check button from being clicked
  }

  // * Losing Game Function
  function handleLoss() {
    innerBox.classList.add('game-over'); // class="game-over"
    msg.textContent = 'Unfortunately, you lost the game.';

    // ^ Creating new image tag
    let image = document.createElement('img');
    image.src = './assets/icons8-game-over-100.png';

    // ^ Inserting additional text within the container
    let tryAgain = document.createElement('p');
    tryAgain.textContent =
      "Don't give up. Just try again. Maybe you'll win next time!";

    let revealSecret = document.createElement('p');
    revealSecret.textContent = 'My number was: ';
    revealSecret.appendChild(secretNum); // <p>My number was: [secretNum]</p>
    // Project 3 by Linda Green & Sabrina Ira
    let tryAgainBtn = document.createElement('button');
    tryAgainBtn.classList.add('resetBtn');
    tryAgainBtn.textContent = 'Try Again';
    tryAgainBtn.addEventListener('click', resetGame);

    // Finally adding the new elements to the innerBox div
    innerBox.appendChild(image);
    innerBox.appendChild(tryAgain);
    innerBox.appendChild(revealSecret);
    innerBox.appendChild(tryAgainBtn);

    input.disabled = true; // Disables the input field
    btn.disabled = true; // Disables the check button from being clicked
  }

  function clearDynamicElements() {
    const dynamicElements = innerBox.querySelectorAll(
      'h2, h3, button.resetBtn, p:not(#result), .secretNum, img'
    );
    dynamicElements.forEach((el) => el.remove());
  }

  /**
   * * DEBUGGING STATION
   * ? I created a test and debugging development,
   * ? so that the dynamic elements are more accessible to test
   */
  // const winBtn = document.getElementById('winTrigger');
  // const loseBtn = document.getElementById('loseTrigger');
  // winBtn.addEventListener('click', handleWin);
  // loseBtn.addEventListener('click', handleLoss);

  // const toggleDebugBtn = document.getElementById('toggleDebug');
  // const debugSection = document.querySelector('.debug');

  // toggleDebugBtn.addEventListener('click', () => {
  //   debugSection.style.display =
  //     debugSection.style.display === 'none' ? 'flex' : 'none';
  // });

  // ^ This is the event listener function for the button when the user "clicks" on it.
  btn.addEventListener('click', () => {
    /**
     * ! REVEAL SECRET NUMBER IN BROWSER CONSOLE
     * ^ this is just for testing purposes on the browser console
     */
    // console.log(input.value);

    // Store the input value in 'guess' variable for easier reference
    const guess = Number(input.value);

    /**
     * & This is to check if the value is empty,
     * & if it's truly not a number,
     * & or if it's less than 1 or greater than 100
     */
    if (input.value === '' || isNaN(guess) || guess < 1 || guess > 100) {
      msg.textContent = 'Please enter a number between 1 and 100.';
      return;
    }

    /**
     * & If the inputted value is incorrect
     * ^ This will make sure JavaScript will check the score AFTER it's being reduced for every wrong guess.
     */
    if (guess !== randomNum) {
      if (guessHistory.includes(guess)) {
        return (msg.textContent =
          "You've guessed this number already! Try a different number.");
      } else {
        guessHistory.push(guess);
        updateHistory();
      }
      // Project 3 by Linda Green & Sabrina Ira
      score--; // decrement the score first (score = score - 1)
      currentScore.textContent = `Current Score: ${score}`;

      // Check if the guess is higher than secret number
      if (guess > randomNum) {
        msg.textContent = '❌ Your guess is too high! Try again.';
      } else {
        // if the guess is lower than secret number
        msg.textContent = '❌ Your guess is too low. Try again!';
      }

      // ! If the score reaches 0, it will be game over for the player.
      if (score === 0) {
        handleLoss();
        return;
      } // * LOSING THE GAME

      // Clear input after each guess
      input.value = '';
    } else if (guess === randomNum) handleWin(); // * WINNING THE GAME
  });

  // & Creating a reusable reset game function for multiple buttons
  const resetGame = () => {
    score = 10;
    randomNum = generateRandomNum();
    console.log(randomNum);
    guessHistory = [];

    currentScore.textContent = `Current Score: ${score}`;
    history.innerHTML = '';
    input.value = '';
    input.disabled = false; // make input accessible again for user to type
    btn.disabled = false;

    // update the displayed secret number text
    secretNum.innerText = `${randomNum}`;

    // Remove dynamic elements
    clearDynamicElements();

    msg.textContent = 'Guess a number between 1 and 100!';
    // clean up the styles for win and game-over of InnerBox div
    innerBox.classList.remove('winner', 'game-over');
    // Project 3 by Linda Green & Sabrina Ira

    /**
     * ! location.reload() is not necessary for now
     * This method helps reset the game without having the player click on the refresh button from their web browser.
     */
    // location.reload();
  };

  footer.appendChild(copyRight);
  // * This event listener will reset the game.
  resetBtn.addEventListener('click', resetGame);

  // & QCC SWE Spring 2025 - Project 3 by Linda Green & Sabrina Ira
});
