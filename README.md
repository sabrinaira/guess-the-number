# [Guess The Number Game](https://sabrinaira.github.io/guess-the-number/)

###### <mark>Click the link above to play the game!</mark>

###### This was a game project we made during the QCC SWE Spring 2025 program. This game is entirely built with JavaScript, HTML and CSS.

Player must guess the number between 1 and 100! <br>

## Instructions:

- To start playing, you must simply try to guess a number between 1 and 100 only.
- Player will start with their health score of 10. For every wrong guess, the health score decreases by 1.
- If the health score reaches 0, it is game over.
- If the player guesses the number correctly, depending how many points left over from their health score, will become their new high score.
- Players can choose to play again to earn a better high score, or just for fun!
- <b> <u>Important</u>: High scores are not saved locally. To reset your high score back to 0, simply refresh the page! </b>

### Additional Features:

---

- When a player wins/loses the game, they have their own unique styled elements.
- Every attempted guess will be recorded visibly to make it easier for players to see which numbers have already been attempted.
- Game will catch edge cases where:
  - Player submits a number less than 1 or greater than 100.
  - Player submits the same number that was already attempted.
  - If the new high score is higher than the previous high score, the high score will be updated.
- A new secret number will be generated every time a player clicks the _Reset_, _Play Again_, and _Try Again_ button.
- Max high score is 10, and is not saved locally. Player can just simply click the refresh button their web browser to reset their high score back to 0.

#### Created by:

[Linda Green](https://github.com/rtpstp748) &
[Sabrina Ira](https://github.com/sabrinaira)
