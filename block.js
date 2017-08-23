class Block {
    constructor(i, j) {
        this.row = i;
        this.col = j;
        this.w = 40;
    }

    show() {
        fill(color(this.color));
        for (var i = 0; i < this.shape.length; i++) {
            for (var j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] != 0) {
                    rect(j * this.w + this.col * this.w, i * this.w + this.row * this.w, this.w, this.w);
                }
            }
        }
    }

    rotate() {
        var savedRotation = this.rotation;
        var savedShape = this.shape;

        this.rotation = this.rotation == this.rotations.length - 1 ? 0 : this.rotation + 1;
        this.shape = this.rotations[this.rotation];

        var checkResult = this.checkRotate();
        while (typeof checkResult === "number") {
            this.col += checkResult;
            checkResult = this.checkRotate();
        }
        if (!checkResult) {
            this.shape = savedShape;
            this.rotation = savedRotation;
        }
    }

    moveX(offsetx) {
        var allowedMove = this.checkSides(offsetx);
        if (allowedMove) {
            this.col += offsetx;
        }
    }

    moveY(offsety = 1) {
        var allowedMove = this.checkBelow();
        if (allowedMove) {
            this.row += offsety;
        } else {
            this.finalize();
        }
    }

    checkRotate() {
        var allowedMove = true;
        var sideCorrection = false;
        for (var i = 0; i < this.shape.length; i++) {
            for (var j = 0; j < this.shape[i].length; j++) {
                if (!sideCorrection && allowedMove && this.shape[i][j] != 0) {
                    var actuali = this.row + i;
                    var actualj = this.col + j;
                    // checking for bottom
                    if (actuali >= rows) {
                        allowedMove = false;
                    }
                    // checking for other block
                    else if (actualj >= cols) {
                        sideCorrection = -1;
                    }
                    else if (actualj < 0) {
                        sideCorrection = 1;
                    }
                    else if (grid[actuali][actualj].full) {
                        allowedMove = false;
                    }
                }
            }
        }
        return sideCorrection ? sideCorrection : allowedMove;
    }

    checkBelow() {
        var allowedMove = true;
        for (var i = 0; i < this.shape.length; i++) {
            for (var j = 0; j < this.shape[i].length; j++) {
                if (allowedMove && this.shape[i][j] != 0) {
                    var actuali = this.row + i + 1;
                    var actualj = this.col + j;
                    // checking for bottom
                    if (actuali >= rows) {
                        allowedMove = false;
                    }
                    // checking for other block
                    else if (grid[actuali][actualj].full) {
                        allowedMove = false;
                    }
                }
            }
        }
        return allowedMove;
    }

    checkSides(offsetx) {
        var allowedMove = true;
        for (var i = 0; i < this.shape.length; i++) {
            for (var j = 0; j < this.shape[i].length; j++) {
                if (allowedMove && this.shape[i][j] != 0) {
                    var actuali = this.row + i;
                    var actualj = this.col + j + offsetx;
                    // checking for sides
                    if (actualj >= cols) {
                        allowedMove = false;
                    }
                    else if (actualj < 0) {
                        allowedMove = false;
                    }
                    // checking for other block
                    else if (grid[actuali][actualj].full) {
                        allowedMove = false;
                    }
                }
            }
        }
        return allowedMove;
    }

    commitToGrid() {
        for (var i = 0; i < this.shape.length; i++) {
            for (var j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] != 0) {
                    grid[this.row + i][this.col + j].full = true;
                    grid[this.row + i][this.col + j].color = this.color;
                }
            }
        }
    }

    finalize() {
        this.commitToGrid();
        Tile.checkLines();
        $("#score-text").html(score)
        active = generator.shift();
        if (generator.length == 0){
            generator = arrayShuffle([new I(0,3), new J(0,3), new L(0,3), new O(0,4), new S(0,3), new T(0,3), new Z(0,3)]);
        }
    }
}