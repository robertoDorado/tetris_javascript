function drawBoard() {
    for(let currentRow = 0; currentRow < ROW; currentRow++) {
        for(let currentCol = 0; currentCol < COL; currentCol++) {
            const currentSquareColor = board[currentRow][currentCol]
            drawSquare(currentCol, currentRow, currentSquareColor)
        }
    }

    scoreElement.innerHTML = score
    speedElement.innerHTML = speed
}

function showNextPiece(color) {
    switch(color) {
        case "blue":
            nextPieceElement.src = nextPiecePath[0]
            break
        case "cyan":
            nextPieceElement.src = nextPiecePath[1]
            break
        case "green":
            nextPieceElement.src = nextPiecePath[2]
            break
        case "orange":
            nextPieceElement.src = nextPiecePath[3]
            break
        case "purple":
            nextPieceElement.src = nextPiecePath[4]
            break
        case "red":
            nextPieceElement.src = nextPiecePath[5]
            break
        case "yellow":
            nextPieceElement.src = nextPiecePath[6]
            break
    }
}

function drawSquare(y, x, color) {
    ctx.fillStyle = color
    ctx.fillRect(y * SQ, x * SQ, SQ, SQ)

    if (color == defaultColor) {
        ctx.strokeStyle = defaultBorder
    }

    ctx.strokeRect(y * SQ, x * SQ, SQ, SQ)
}

function randomPieces() {
    let arrayPieces = []

    for (let i = 0; i < 10000; i++) {
        const randomNumberPiece1 = Math.floor(Math.random() * PIECES.length)
        const randomNumberPiece2 = Math.floor(Math.random() * PIECES.length)
    
        const piece1 = new Piece(PIECES[randomNumberPiece1][0], 
            PIECES[randomNumberPiece1][1])
    
        const piece2 = new Piece(PIECES[randomNumberPiece2][0], 
            PIECES[randomNumberPiece2][1])
    
        arrayPieces.push(piece1)
        arrayPieces.push(piece2)
    }

    return arrayPieces
}

function drop() {
    const now = Date.now()
    const delta = now - dropStart
    
    if (delta > speed) {
        piece.moveDown()
        dropStart = Date.now()
    }

    requestAnimationFrame(drop)
}

function CONTROL(event) {

    let allowedMoves = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]

    if (canMove) {
        if (allowedMoves.indexOf(event.code) >= 0) {
            const moveFunctions = {
                ArrowLeft() {
                    piece.moveLeft()
                    dropStart = Date.now()
                },
                
                ArrowRight() {
                    piece.moveRight()
                    dropStart = Date.now()
                },
                
                ArrowUp() {
                    piece.rotate()
                    dropStart = Date.now()
                },
        
                ArrowDown() {
                    piece.moveDown()
                }
            }
            moveFunctions[event.code]()
        }
    }
}

function updateRollAndScore(row) {
    for (let x = row; x > 1; x--) {
        removeRow(x)
    }

    for (let currentCol = 0; currentCol < COL; currentCol++) {
        board[0][currentCol] = defaultColor
    }

    score += 10
    dificultGame(score)
}

const dificultGame = (score) => {
    switch(score) {
        case 100:
            speed -= 100
            break
        case 200:
            speed -= 100
            break
        case 300:
            speed -= 100
            break
        case 400:
            speed -= 100
            break
        case 500:
            speed -= 100
            break
    }
}

const removeRow = (rowIndex) => {
    board[rowIndex] = board[rowIndex].map((_, index) => board[rowIndex - 1][index]);
}