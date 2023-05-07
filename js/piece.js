class Piece {

    constructor(piece, color) {
        this.piece = piece;
        this.color = color;

        this.pieceN = 0;
        this.activePiece = this.piece[this.pieceN];

        this.x = 3;
        this.y = -2;
    }

    fill(color) {
        for (let currentRow = 0; currentRow < this.activePiece.length; currentRow++) {
            for (let currentCol = 0; currentCol < this.activePiece.length; currentCol++) {
                if (this.activePiece[currentRow][currentCol]) {
                    drawSquare(this.x + currentRow, this.y + currentCol, color)
                }
            }
        }
    }

    draw() {
        this.fill(this.color)
    }

    undraw() {
        this.fill(defaultColor)
    }

    moveLeft() {
        if (!this.collision(-1, 0, this.activePiece)) {
            this.undraw()
            this.x--
            this.draw()
        }
    }

    moveRight() {
        if (!this.collision(1, 0, this.activePiece)) {
            this.undraw()
            this.x++
            this.draw()
        }
    }

    rotate() {
        let nextPattern = this.piece[(this.pieceN + 1) % this.piece.length]
        let kick = 0

        if (this.collision(0, 0, nextPattern)) {
            kick = 1

            if (this.x > COL % 2) {
                kick = -1
            }
        }

        if (!this.collision(kick, 0, nextPattern)) {
            this.undraw()
            this.x += kick
            this.pieceN = (this.pieceN + 1) % this.piece.length
            this.activePiece = this.piece[this.pieceN]
            this.draw()
        }
    }

    moveDown() {
        if (!this.collision(0, 1, this.activePiece)) {
            this.undraw()
            this.y += 1;
            this.draw()
            return;
        }
        this.lock()

        if (pieces.length > 0) {
            piece = nextPiece
            nextPiece = pieces.pop()
            showNextPiece(nextPiece.color)
        }
    }

    collision(x, y, futurePiece) {
        for (let currentRow = 0; currentRow < futurePiece.length; currentRow++) {
            for (let currentCol = 0; currentCol < futurePiece.length; currentCol++) {
                if (!futurePiece[currentRow][currentCol]) {
                    continue
                }

                let newX = this.x + currentRow + x
                let newY = this.y + currentCol + y

                if (newX < 0 || newX >= COL || newY >= ROW) {
                    return true
                }

                if (newY < 0) {
                    continue
                }

                if (board[newY][newX] != defaultColor) {
                    return true
                }
            }
        }

        return false
    }

    lock() {
        let tetris = []

        for (let currentRow = 0; currentRow < this.activePiece.length; currentRow++) {
            for (let currentCol = 0; currentCol < this.activePiece.length; currentCol++) {
                if (!this.activePiece[currentRow][currentCol]) {
                    continue
                }

                if (this.y + currentCol < 0) {
                    canMove = false
                    alert("perdeu")
                    throw new Error("Perdeu")
                }

                board[this.y + currentCol][this.x + currentRow] = this.color
            }
        }

        for (let currentRow = 0; currentRow < ROW; currentRow++) {

            let isRollFull = true

            for (let currentCol = 0; currentCol < COL; currentCol++) {
                const currentSquareColor = board[currentRow][currentCol]
                isRollFull = isRollFull && (currentSquareColor != defaultColor)
            }

            if (isRollFull) {
                if (tetris.indexOf(currentRow) == -1) {
                    tetris.push(currentRow)
                }

                if (tetris.length >= 4) {
                    score += 20
                }

                updateRollAndScore(currentRow)
            }
        }

        drawBoard()
    }
}