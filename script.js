const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winningCondition = winningConditions[i];
        if (gameState[winningCondition[0]] === gameState[winningCondition[1]] &&
            gameState[winningCondition[1]] === gameState[winningCondition[2]] &&
            gameState[winningCondition[0]] !== "") {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
    } else if (!gameState.includes("")) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = Array.prototype.indexOf.call(document.querySelectorAll('.cell'), clickedCell);
    if (gameActive && clickedCell.innerHTML === "") {
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
        if (gameActive) {
            handlePlayerChange();
        }
    }
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);