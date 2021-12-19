let gameBoard = Array(9).fill(null);
let currentPlayerSymbol = "X";

let $columnList = document.querySelectorAll(".js-column");
let $currentTurn = document.querySelector(".js-turn");
let $gameEnd = document.querySelector(".js-winner");

function clickHandler(event) {
  //gets current index from the event
  const boardIndex = event.target.dataset.index;
  if (gameBoard[boardIndex] === null) {
    gameBoard[boardIndex] = currentPlayerSymbol;
    event.target.innerText = currentPlayerSymbol;
    if (hasLastMoverWon()) {
      $gameEnd.innerText = `${currentPlayerSymbol} has won the game!`;
    } else if (gameBoard.every((element) => element !== null)) {
      $gameEnd.innerText = "Draw!";
    } else {
      currentPlayerSymbol = currentPlayerSymbol === "X" ? "O" : "X";
      $currentTurn.innerText = `Current Player's turn: ${currentPlayerSymbol}`;
    }
  }
}

for (let $cell of $columnList) {
  $cell.addEventListener("click", clickHandler);
}

function hasLastMoverWon() {
  let winnerCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let [i1, i2, i3] of winnerCombos) {
    if (
      gameBoard[i1] === currentPlayerSymbol &&
      gameBoard[i1] === gameBoard[i2] &&
      gameBoard[i1] === gameBoard[i3]
    ) {
      return true;
    }
  }
  return false;
}
