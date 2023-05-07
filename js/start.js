const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");
const speedElement = document.getElementById("speed");
const nextPieceElement = document.getElementById("nextPiece")

const ROW = 17;
const COL = 10;
const SQ = 30;
const defaultColor = "#111111";
const defaultBorder = "rgba(255, 255, 255, 0.1)";

let canMove = true
let speed = 500;
let dropStart = Date.now();
let score = 0;

let board = [];
for (let currentRow = 0; currentRow < ROW; currentRow++) {
    board[currentRow] = [];
    for (let currentCol = 0; currentCol < COL; currentCol++) {
        board[currentRow][currentCol] = defaultColor;
    }
}

const nextPiecePath = [
    "./img/blue.png",
    "./img/cyan.png",
    "./img/green.png",
    "./img/orange.png",
    "./img/purple.png",
    "./img/red.png",
    "./img/yellow.png",
]

const PIECES = [
    [Z, 'red'],
    [S, 'green'],
    [T, 'yellow'],
    [O, 'blue'],
    [L, 'purple'],
    [I, 'cyan'],
    [J, 'orange']
]

let pieces = randomPieces()
let piece = pieces.pop()
let nextPiece = pieces.pop()

showNextPiece(nextPiece.color)
drawBoard()
drop()

document.addEventListener("keydown", CONTROL)