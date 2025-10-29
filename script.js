const boxes = document.querySelectorAll('.box');
const reset = document.getElementById("reset");
const display = document.querySelector(".display");
let board = ['', '', '', '', '', '', '', '', ''];
let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let hasWin = false;
let isX = true;

boxes.forEach((box, index)=>{
    box.addEventListener("click", ()=>{
            let turn = (isX) ? 'X' : 'O';
            if(hasWin || box.textContent !== '') return;
            board[index] = turn
            box.style.cursor = 'not-allowed';
            isX = !isX;
            updateDisplay();
            display.textContent = `${isX ? 'X' : 'O'}'s turn`;
            updateWin(checkWin());
            setColor();
        })
})

reset.addEventListener("click", ()=>{
    board = board.map(() =>{
        return '';
    })

    isX = true;
    hasWin = false;
    display.textContent = "X's turn";
    setColor();
    updateDisplay();
})

function setColor(){
    if(hasWin) return;
    document.documentElement.style.setProperty("--border-color", isX ? "red" : "blue");
}

function updateDisplay(){
    boxes.forEach((box, index) =>{
        box.textContent = board[index];
        box.style.cursor = board[index] ? 'not-allowed' : 'pointer';
    })
}

function checkWin(){
    let allX = board.map((element, index) => element === 'X' ? index : -1).filter(i => i !== -1);
    let allY = board.map((element, index) => element === 'O' ? index : -1).filter(i => i !== -1);

    if(winningCombos.some(row => row.every(val => allX.includes(val)))){
        return 'X';
    }
    else if(winningCombos.some(row => row.every(val => allY.includes(val)))){
        return 'O';
    }
    else{
        return null;
    }
}

function updateWin(status){
    if(status === 'X'){
        hasWin = true;
        display.textContent = 'X has won';
    }
    else if(status === 'O'){
        hasWin = true;
        display.textContent = 'O has won';
    }
    else{
        hasWin = false;
    }
}