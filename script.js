const homePage = document.getElementById('homePage');
const modePage = document.getElementById('modePage');
const gamePage = document.getElementById('gamePage');

const playButton = document.getElementById('playButton');
const backButton = document.getElementById('backButton');
const modePvPButton = document.getElementById('modePVP');
const modePvAIButton = document.getElementById('modePVAI');

const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer;
let board;
let isGameActive;
let isAI;
let selectedMode = 'pvp';
let startingPlayer = 'X';

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

if (playButton && homePage && modePage && backButton) {
    playButton.addEventListener('click', () => {
        homePage.style.display = 'none';
        modePage.style.display = 'block';
        backButton.style.display = 'block';
    });
}

// Start directly when choosing a mode

if (resetButton) {
    resetButton.addEventListener('click', startGame);
}

if (backButton && homePage && modePage && gamePage) {
    backButton.addEventListener('click', () => {
        homePage.style.display = 'block';
        modePage.style.display = 'none';
        gamePage.style.display = 'none';
        backButton.style.display = 'none';
    });
}

if (modePvPButton && modePage && gamePage) {
    modePvPButton.addEventListener('click', () => {
        selectedMode = 'pvp';
        isAI = false;
        startingPlayer = 'X';
        modePage.style.display = 'none';
        gamePage.style.display = 'block';
        startGame();
    });
}

if (modePvAIButton && modePage && gamePage) {
    modePvAIButton.addEventListener('click', () => {
        selectedMode = 'pvai';
        isAI = true;
        startingPlayer = 'X';
        modePage.style.display = 'none';
        gamePage.style.display = 'block';
        startGame();
    });
}

function startGame() {
    board = Array(9).fill(null);
    isGameActive = true;
    currentPlayer = startingPlayer;
    if (isAI) {
        startingPlayer = startingPlayer === 'X' ? 'O' : 'X';
    }
    status.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', handleClick, { once: true });
    });
    if (isAI && currentPlayer === 'O') {
        aiMove();
    }
}

function handleClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    if (board[index] !== null || !isGameActive) return;

    makeMove(index, currentPlayer);

    if (checkWinner(board, currentPlayer)) {
        endGame(false);
        return;
    }

    if (isTie(board)) {
        endGame(true);
        return;
    }

    switchPlayer();

    if (isAI && currentPlayer === 'O') {
        isGameActive = false; // Disable player input during AI turn
        setTimeout(() => {
            aiMove();
            isGameActive = true; // Re-enable player input
        }, 500); // Add a small delay for better UX
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add(player.toLowerCase());
    cells[index].removeEventListener('click', handleClick);
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(board, player) {
    return winningCombinations.some(combination => combination.every(index => board[index] === player));
}

function isTie(board) {
    return board.every(cell => cell !== null);
}

function endGame(isDraw) {
    isGameActive = false;
    if (isDraw) {
        status.textContent = 'It\'s a tie!';
    } else {
        status.textContent = `${currentPlayer} wins!`;
    }
}

function aiMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    makeMove(move, 'O');

    if (checkWinner(board, 'O')) {
        endGame(false);
        return;
    }

    if (isTie(board)) {
        endGame(true);
        return;
    }

    switchPlayer();
}

function minimax(board, depth, isMaximizing) {
    if (checkWinner(board, 'O')) return 10 - depth;
    if (checkWinner(board, 'X')) return depth - 10;
    if (isTie(board)) return 0;

    let bestScore = isMaximizing ? -Infinity : Infinity;
    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = isMaximizing ? 'O' : 'X';
            let score = minimax(board, depth + 1, !isMaximizing);
            board[i] = null;
            bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
        }
    }
    return bestScore;
}