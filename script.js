// Create matrix
cells = document.getElementsByTagName('td');

for (let i = 0; i < cells.length; i++) {
    cells[i].rowIndex = Math.trunc(i / 10);
}
let matrix = [];
for (let i = 0; i < 10; i++) {
    matrix[i] = [];
    for (let j = 0; j < 10; j++) {
        matrix[i][j] = {'isMined': false, 'isOpen': false, 'domLink': cells[(i * 10) + j]};
    }
}

// This function is needed for fill bombs
function matrixElementsSum(matrix) {
    let sum = 0;
    for (let j = 0; j < matrix.length; j++) {
        for (let n = 0; n < matrix.length; n++) {
            if (matrix[j][n].isMined) {
                sum = sum + 1;
            }
        }
    }
    return sum;
}


// Fill matrix with bomb
while (matrixElementsSum(matrix) < 10) {
    let randomNumberRow = Math.floor(Math.random() * 10);
    let randomNumberCol = Math.floor(Math.random() * 10);
    matrix[randomNumberRow][randomNumberCol].isMined = true;
}

function getNeighborhood(cell) {
    neighborhood = [];
    if (matrix[cell.rowIndex - 1] && matrix[cell.rowIndex - 1][cell.cellIndex - 1]) {
        neighborhood.push(matrix[cell.rowIndex - 1][cell.cellIndex - 1])
    }
    if (matrix[cell.rowIndex - 1] && matrix[cell.rowIndex - 1][cell.cellIndex]) {
        neighborhood.push(matrix[cell.rowIndex - 1][cell.cellIndex])
    }
    if (matrix[cell.rowIndex - 1] && matrix[cell.rowIndex - 1][cell.cellIndex + 1]) {
        neighborhood.push(matrix[cell.rowIndex - 1][cell.cellIndex + 1])
    }
    if (matrix[cell.rowIndex][cell.cellIndex - 1]) {
        neighborhood.push(matrix[cell.rowIndex][cell.cellIndex - 1])
    }
    if (matrix[cell.rowIndex][cell.cellIndex + 1]) {
        neighborhood.push(matrix[cell.rowIndex][cell.cellIndex + 1])
    }
    if (matrix[cell.rowIndex + 1] && matrix[cell.rowIndex + 1][cell.cellIndex - 1]) {
        neighborhood.push(matrix[cell.rowIndex + 1][cell.cellIndex - 1])
    }
    if (matrix[cell.rowIndex + 1] && matrix[cell.rowIndex + 1][cell.cellIndex]) {
        neighborhood.push(matrix[cell.rowIndex + 1][cell.cellIndex])
    }
    if (matrix[cell.rowIndex + 1] && matrix[cell.rowIndex + 1][cell.cellIndex + 1]) {
        neighborhood.push(matrix[cell.rowIndex + 1][cell.cellIndex + 1])
    }
    return neighborhood;
}

function getNumbersByNeighborhood(neighborhood) {
    sum = 0;
    for (let i = 0; i < neighborhood.length; i++) {
        if (neighborhood[i].isMined) {
            ++sum;
        }
    }
    return sum;
}


for (let i = 0; i < cells.length; i++) {

    if (!matrix[cells[i].rowIndex][cells[i].cellIndex].isMined) {
        matrix[cells[i].rowIndex][cells[i].cellIndex].numbersBombs = getNumbersByNeighborhood(getNeighborhood(cells[i]));
    }
    // Add ?? image

    var elem = document.createElement("img");
    elem.setAttribute("src", "question.png");
    elem.setAttribute("height", "50");
    elem.setAttribute("width", "50");
    elem.setAttribute("class", "question");
    cells[i].appendChild(elem);

    cells[i].onclick = function () {
        matrix[this.rowIndex][this.cellIndex].isOpen = true;
        if (matrix[cells[i].rowIndex][cells[i].cellIndex].isMined) {
            alert('You lose');
        } else {
            cells[i].innerHTML = matrix[cells[i].rowIndex][cells[i].cellIndex].numbersBombs;
        }
        if (matrix[this.rowIndex][this.cellIndex].numbersBombs == 0) {
            checkNearly(this);
        }

    };

    cells[i].oncontextmenu = function () {

        if (this.getElementsByClassName('danger')[0] && !matrix[this.rowIndex][this.cellIndex].isOpen) {
            let image = this.getElementsByTagName('img')[0];
            image.src = 'question.png';
            image.className = 'question';

        } else if (!matrix[this.rowIndex][this.cellIndex].isOpen) {
            let image = this.getElementsByTagName('img')[0];
            image.src = 'danger.png';
            image.className = 'danger';
        }


        return false;
    }
}

function checkNearly(cell) {
    let neighborhood = getNeighborhood(cell);
    neighborhood.filter(function (value) {
        if (!value.isOpen) {
            return true;
        }
    }).forEach(function (value) {
        value.domLink.onclick();
    });
}

