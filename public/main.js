const crossClass = "cross";
const circleClass = "circle";

let isCircleStep = true;

let board = [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.']
];

for (row = 1; row <= 3; row++){
    const currentRow = document.querySelector(`.row:nth-of-type(${row})`);
    const currentRowNumber = row - 1;

    for (col = 1; col <= 3; col++){
        const currentCell = currentRow.querySelector(`.cell:nth-of-type(${col})`);
        const currentCellNumber = col - 1;
        
        currentCell.addEventListener('click', function() {
            const isValid = checkValidPosition(currentRowNumber, currentCellNumber);

            if (!isValid) {
                alert("Invalid move");
                return;
            }

            board[currentRowNumber][currentCellNumber] = isCircleStep ? 'O' : 'X'

            const cellImage = currentCell.querySelector(`.${isCircleStep ? circleClass : crossClass}`);

            cellImage.style.display = 'block'
            switchStep();

            const winner = checkWinner();
            
            if (winner) {
                alert(`${winner == 'O' ? 'Нолики' : 'Крестики'} выиграли`);
                window.location.reload();
            }

            console.log(`Был совершен клик в столбике ${currentRowNumber} в клетке ${currentCellNumber}`)
        })
    }
}

function switchStep() {
    isCircleStep = !isCircleStep;
    updateCurrentStepText();
}

function updateCurrentStepText() {
    const innerHTML = "Текущий ход: " + 
    (
        isCircleStep ? 
        '<span style="color: blue;">Круг</span>'
        : 
        '<span style="color: red;">Крестик</span>'
    );

    document.querySelector('.currentStep').innerHTML = innerHTML;
}

function checkValidPosition(row, cell) {
    return board[row][cell] === '.';
}

function checkWinner() {
    const size = board.length;
    
    // Проверка строк
    for (let i = 0; i < size; i++) {
        if (board[i][0] !== '.' && new Set(board[i]).size === 1) {
            return board[i][0];
        }
    }

    // Проверка столбцов
    for (let i = 0; i < size; i++) {
        let column = [];
        for (let j = 0; j < size; j++) {
            column.push(board[j][i]);
        }
        if (column[0] !== '.' && new Set(column).size === 1) {
            return column[0];
        }
    }

    // Проверка диагонали (слева направо)
    let diagonal1 = [];
    for (let i = 0; i < size; i++) {
        diagonal1.push(board[i][i]);
    }
    if (diagonal1[0] !== '.' && new Set(diagonal1).size === 1) {
        return diagonal1[0];
    }

    // Проверка диагонали (справа налево)
    let diagonal2 = [];
    for (let i = 0; i < size; i++) {
        diagonal2.push(board[i][size - 1 - i]);
    }
    if (diagonal2[0] !== '.' && new Set(diagonal2).size === 1) {
        return diagonal2[0];
    }

    // Если никто не выиграл
    return null;
}

updateCurrentStepText();

