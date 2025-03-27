const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const winningLineSvg = document.getElementById('winning-line');

let currentPlayer = 'red';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let canReset = false;

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

const redCircleSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="white" stroke="red" stroke-width="10"/>
    </svg>
`;

const blueCrossSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <line x1="20" y1="20" x2="80" y2="80" stroke="blue" stroke-width="10"/>
        <line x1="80" y1="20" x2="20" y2="80" stroke="blue" stroke-width="10"/>
    </svg>
`;

function updateCellCursors() {
    cells.forEach(cell => {
        const index = parseInt(cell.getAttribute('data-index'));
        if (!gameActive || gameState[index] !== '') {
            cell.classList.remove('red-cursor', 'blue-cursor');
            cell.style.cursor = 'default';
        } else {
            cell.classList.remove('red-cursor', 'blue-cursor');
            cell.classList.add(currentPlayer === 'red' ? 'red-cursor' : 'blue-cursor');
        }
    });
}

function handleCellClick(event) {
    if (!gameActive) return;

    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '') {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer === 'red' ? redCircleSVG : blueCrossSVG;

    checkForWinner();
    updateCellCursors();
}

function checkForWinner() {
    let roundWon = false;
    let winningCombo = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            winningCombo = winningConditions[i];
            break;
        }
    }

    if (roundWon) {
        drawWinningLine(winningCombo);
        endGame();
        return;
    }

    if (!gameState.includes('')) {
        endGame();
        return;
    }

    currentPlayer = currentPlayer === 'red' ? 'blue' : 'red';
    updateBoardGlow();
    updateCellCursors();
}

function drawWinningLine(winningCombo) {
    const [a, b, c] = winningCombo;
    const cell1 = cells[a].getBoundingClientRect();
    const cell3 = cells[c].getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    const x1 = cell1.left + cell1.width / 2 - boardRect.left;
    const y1 = cell1.top + cell1.height / 2 - boardRect.top + 80;
    const x2 = cell3.left + cell3.width / 2 - boardRect.left;
    const y2 = cell3.top + cell3.height / 2 - boardRect.top + 80;

    const offset = 50;
    let adjustedX1 = x1;
    let adjustedY1 = y1;
    let adjustedX2 = x2;
    let adjustedY2 = y2;

    if (y1 === y2) {
        adjustedX1 = x1 - offset;
        adjustedX2 = x2 + offset;
    }
    else if (x1 === x2) {
        adjustedY1 = y1 - offset;
        adjustedY2 = y2 + offset;
    }
    else {
        if (x1 < x2 && y1 < y2) {
            adjustedX1 = x1 - offset;
            adjustedY1 = y1 - offset;
            adjustedX2 = x2 + offset;
            adjustedY2 = y2 + offset;
        }
        else if (x1 > x2 && y1 < y2) {
            adjustedX1 = x1 + offset;
            adjustedY1 = y1 - offset;
            adjustedX2 = x2 - offset;
            adjustedY2 = y2 + offset;
        }
    }

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', adjustedX1);
    line.setAttribute('y1', adjustedY1);
    line.setAttribute('x2', adjustedX2);
    line.setAttribute('y2', adjustedY2);
    line.setAttribute('stroke', currentPlayer === 'red' ? 'red' : 'blue');
    winningLineSvg.appendChild(line);
}

function endGame() {
    gameActive = false;
    board.classList.remove('red-turn', 'blue-turn');
    updateCellCursors();

    setTimeout(() => {
        canReset = true;
        document.body.style.cursor = 'pointer';
    }, 1000);
}

function resetGame() {
    if (!canReset) return;

    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    canReset = false;
    currentPlayer = currentPlayer === 'red' ? 'blue' : 'red';
    cells.forEach(cell => cell.innerHTML = '');
    winningLineSvg.innerHTML = '';
    updateBoardGlow();
    updateCellCursors();
    document.body.style.cursor = 'default';
}

function updateBoardGlow() {
    if (currentPlayer === 'red') {
        board.classList.add('red-turn');
        board.classList.remove('blue-turn');
    } else {
        board.classList.add('blue-turn');
        board.classList.remove('red-turn');
    }
}

document.body.addEventListener('click', () => {
    resetGame();
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
updateBoardGlow();
updateCellCursors();
