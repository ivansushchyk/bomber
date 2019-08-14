
// Create matrix

let matrix = [];
for (let i = 0; i < 10; i++) {
    matrix[i] = [];
    for (let j = 0; j < 10; j++) {
        matrix[i][j] = 0;
    }
}

// This function is needed for fill bombs
function matrixElementsSum(matrix) {
    let sum = 0;
    for (let j = 0; j < matrix.length; j++) {
        for (let n = 0; n < matrix.length; n++) {
            sum += matrix[j][n];
        }
    }
    return sum;
}


// Fill matrix with bomb
while (matrixElementsSum(matrix) < 20) {
    let randomNumberRow = Math.floor(Math.random() * 10);
    let randomNumberCol = Math.floor(Math.random() * 10);
    matrix[randomNumberRow][randomNumberCol] = 1;
}

function getNeighborhoodNumbersBombs(cell) {
    let sum = 0;
    if (matrix[cell.rowIndex - 1] && matrix[cell.rowIndex - 1][cell.cellIndex - 1]) {
        sum +=matrix[cell.rowIndex - 1][cell.cellIndex - 1]
    }
    if (matrix[cell.rowIndex - 1] && matrix[cell.rowIndex - 1][cell.cellIndex]) {
        sum +=(matrix[cell.rowIndex - 1][cell.cellIndex])
    }
    if (matrix[cell.rowIndex - 1] && matrix[cell.rowIndex - 1][cell.cellIndex + 1]) {
        sum +=(matrix[cell.rowIndex - 1][cell.cellIndex + 1])
    }
    if (matrix[cell.rowIndex][cell.cellIndex - 1]) {
        sum +=(matrix[cell.rowIndex][cell.cellIndex - 1])
    }
    if (matrix[cell.rowIndex][cell.cellIndex + 1]) {
        sum +=(matrix[cell.rowIndex][cell.cellIndex + 1])
    }
    if (matrix[cell.rowIndex + 1] && matrix[cell.rowIndex + 1][cell.cellIndex - 1]) {
        sum +=(matrix[cell.rowIndex + 1][cell.cellIndex - 1])
    }
    if (matrix[cell.rowIndex + 1] && matrix[cell.rowIndex + 1][cell.cellIndex]) {
        sum +=(matrix[cell.rowIndex + 1][cell.cellIndex])
    }
    if (matrix[cell.rowIndex + 1] && matrix[cell.rowIndex + 1][cell.cellIndex + 1]) {
        sum +=(matrix[cell.rowIndex + 1][cell.cellIndex + 1])
    }
    return sum;
}

cells = document.getElementsByTagName('td');

for (let i = 0; i < cells.length; i++) {
    cells[i].rowIndex = Math.trunc(i / 10);
}

for (let i = 0; i < cells.length; i++) {
    if (matrix[cells[i].rowIndex][cells[i].cellIndex] == 1) {
        cells[i].style.backgroundColor = 'red';
    } else {
        cells[i].innerHTML = getNeighborhoodNumbersBombs(cells[i]);
    }
}








