// 2D matrix
var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}


function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }

        }
    }
}


function setColor(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
                
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            arr[i][j].style.color = "green";


        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]


let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve')
let min = document.getElementById('min')
let sec = document.getElementById('sec')
let divs = document.getElementById('container').querySelectorAll('div');
let value = 1;
let number = document.getElementById('numbers').querySelectorAll('div');
let selectedcolor = document.getElementById('01');
selectedcolor.style.border = '2px solid black'
let timerr;

console.log(number)

number.forEach(function (i) {
    i.onclick = function () {
        changecolor(i);
        value = Number(i.innerText);
    }
})

divs.forEach(function (div) {
    div.onclick = function () {
        div.innerText = value;
        console.log(div.innerText)
    }
})

let changecolor = function (i) {
    selectedcolor.style.border = 'none';
    i.style.border= '2px solid black';
    selectedcolor = i;
}

function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}


button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
    timerr = setInterval(timer,1000)
}


function timer() {
    if(Number(sec.innerText)<9){
        sec.innerText ="0"+(Number(sec.innerText)+1);
    }
    else{
        sec.innerText =Number(sec.innerText)+1;  
    }
   if(Number(sec.innerText) >=60){
    sec.innerText = 00;
    if(Number(min.innerText)<9){
    min.innerText = "0"+(Number(min.innerText)+1);
   }
   else{
    min.innerText = Number(min.innerText)+1;
   }
}

function isPossible(board, sr, sc, val) {

    // check for not repeating in same row
    for (var row = 0; row < 9; row++) {
        if (board[row][sc] == val) {
            return false;
        }
    }

     // check for not repeating in same column
    for (var col = 0; col < 9; col++) {
        if (board[sr][col] == val) {
            return false;
        }
    }

    // sub-grid
    var r = sr - (sr%3);
    var c = sc - (sc%3);

    for (var cr = r; cr < r + 3; cr++) {
        for (var cc = c; cc < c + 3; cc++) {
            if (board[cr][cc] == val) {
                return false;
            }
        }
    }
    return true;

}


function solveSudokuHelper(board, sr, sc) {  // board, starting row, starting col

    // base case
    if (sr == 9) { // all rows filled
        changeBoard(board);
        return;
    }
    if (sc == 9) {  // last column
        solveSudokuHelper(board, sr + 1, 0) // move to next row
        return;
    }

    //pre-filled cell, skip it
    if (board[sr][sc] != 0) {
        solveSudokuHelper(board, sr, sc + 1);
        return;
    }
    
    //there is 0 in the current location
    for (var i = 1; i <= 9; i++) {
        if (isPossible(board, sr, sc, i)) { // check
            board[sr][sc] = i;
            solveSudokuHelper(board, sr, sc + 1);
        }
        // backtracking
            board[sr][sc] = 0;
        
    }
}

function solveSudoku(board) {
    solveSudokuHelper(board, 0, 0)
}

// solve button
solve.onclick = function () {
    clearInterval(timerr);
    solveSudoku(board)

}

/* Focus Change */
window.onload = function () {
    var preTitle = document.title;
    var postTitle = "Don't give up ! 🥺";
    document.addEventListener("visibilitychange", function () {
      var page_Active = !document.hidden;
  
      if (!page_Active) {
        document.title = postTitle;
      } else {
        document.title = preTitle;
      }
    });
  };

  /*Dark-Mode*/
  function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }

}
