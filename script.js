// Add image , and add to each domCell rowIndex
cells = document.getElementsByTagName('td');

for (let i = 0; i < cells.length; i++) {
    cells[i].rowIndex = Math.trunc(i / 10);
    let elem = document.createElement("img");
    elem.setAttribute("src", "question.png");
    elem.setAttribute("height", "50");
    elem.setAttribute("width", "50");
    elem.setAttribute("class", "question");
    cells[i].appendChild(elem);
}
// Create matrix

let matrix = [];
for (let i = 0; i < 10; i++) {
    matrix[i] = [];
    for (let j = 0; j < 10; j++) {
        matrix[i][j] = {'isMined': false, 'isOpen': false, 'domLink': cells[(i * 10) + j]};
    }
}

// Func needed for mine
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

// Mine matrix
function mine() {
    while (matrixElementsSum(matrix) < 5) {
        let randomNumberRow = Math.floor(Math.random() * 10);
        let randomNumberCol = Math.floor(Math.random() * 10);
        if (matrix[randomNumberRow][randomNumberCol].isOpen == false)
            matrix[randomNumberRow][randomNumberCol].isMined = true;
    }
}


// Handler first click
window.isFirstClick = true;

for (let i = 0; i < cells.length; i++) {
    cells[i].onclick = function () {
        if (window.isFirstClick) {
            window.isFirstClick = false;
            matrix[this.rowIndex][this.cellIndex].isOpen = true;
            mine();
            fillCells();
            cells[i].innerHTML = matrix[cells[i].rowIndex][cells[i].cellIndex].numbersBombs;
            if (matrix[this.rowIndex][this.cellIndex].numbersBombs == 0) {
                checkNearly(this);
            }
            refreshLeftOpened()


        } else {
            matrix[this.rowIndex][this.cellIndex].isOpen = true;

            if (matrix[cells[i].rowIndex][cells[i].cellIndex].isMined) {
                alert('You lose');
            } else {
                this.innerHTML = matrix[cells[i].rowIndex][cells[i].cellIndex].numbersBombs;
            }
            if (matrix[this.rowIndex][this.cellIndex].numbersBombs == 0) {
                checkNearly(this);
            }
            refreshLeftOpened()
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

function getNeighborhood(cell) {
    let neighborhood = [];
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
    let sum = 0;
    for (let i = 0; i < neighborhood.length; i++) {
        if (neighborhood[i].isMined) {
            ++sum;
        }
    }
    return sum;
}


function fillCells() {
    for (let i = 0; i < cells.length; i++) {
        if (!matrix[cells[i].rowIndex][cells[i].cellIndex].isMined) {
            matrix[cells[i].rowIndex][cells[i].cellIndex].numbersBombs = getNumbersByNeighborhood(getNeighborhood(cells[i]));
        }
    }
}

function checkNearly(cell) {
    cell.innerHTML = ' ';
    let neighborhood = getNeighborhood(cell);
    neighborhood.filter(function (value) {
        if (!value.isOpen) {
            return true;
        }
    }).forEach(function (value) {
        value.domLink.onclick();
    });
}

function checkNotOpened() {
    let countNotOpened = 0;
    for (let j = 0; j < matrix.length; j++) {
        for (let n = 0; n < matrix.length; n++) {
            if (!matrix[j][n].isMined && !matrix[j][n].isOpen ) {
                countNotOpened++;
            }
        }
    }
 return countNotOpened;
}

function refreshLeftOpened() {
    let countNotOpened = 0;
    for (let j = 0; j < matrix.length; j++) {
        for (let n = 0; n < matrix.length; n++) {
            if (!matrix[j][n].isMined && !matrix[j][n].isOpen ) {
                countNotOpened++;
            }
        }
    }
    if(!countNotOpened){
        alert('YOU WIN');
    }
    count.innerHTML = countNotOpened;
}
//  let openedCell = matrix.map(function (value) {
//        return (value.filter(function (cell) {
//            if(!cell.isMined){
//                return true
//            }
//        }))