const cells = document.querySelectorAll('.cell');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const closePopup = document.getElementById('close-popup');
const resetButton = document.getElementById('reset');
const turnDisplay = document.getElementById('turn-display');

let currentPlayer = 'x';
let board = Array(9).fill(null);

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

const handleClick = (event) => {
    const cell = event.target;
    const index = cell.dataset.index;

    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer.toUpperCase();

    const winner = checkWinner();
    if (winner) {
        popupText.textContent = `Congratulations! Player ${winner.toUpperCase()} Wins!`;
        popup.classList.remove('hidden');
    } else if (!board.includes(null)) {
        popupText.textContent = 'It\'s a Tie!';
        popup.classList.remove('hidden');
    } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        turnDisplay.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
    }
};

const resetGame = () => {
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
    });
    currentPlayer = 'x';
    turnDisplay.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
    popup.classList.add('hidden');
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
closePopup.addEventListener('click', () => popup.classList.add('hidden'));
