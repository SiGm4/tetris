var cols = 10;
var rows = 20;
var w = 40;
//var frames = 5;
var score = 0;
var grid = new Array(rows);
//var generator = 

var active;
var myInterval;

function arrayShuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function setup() {
	var cnv = createCanvas(cols * w + 1, rows * w + 1);
	cnv.parent('canvas-holder');
	//frameRate(frames);
	//setup grid
	for (var i = 0; i < rows; i++) {
		grid[i] = new Array(cols);
	}
	//fill grid
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			grid[i][j] = new Tile();
		}
	}
	active = new J(2, 1);

	grid[19][1].full = true;
	grid[19][2].full = true;
	grid[19][0].full = true;
	grid[19][5].full = true;

	myInterval = setInterval(gameLoop, 500);
}

function draw() {
	background(51);

	//draw grid
	stroke(100);
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			if (grid[i][j].full) {
				fill(color(grid[i][j].color));
			} else {
				noFill();
			}
			rect(j * w, i * w, w, w);
		}
	}

	active.show();

}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		active.moveX(-1);
	} else if (keyCode === RIGHT_ARROW) {
		active.moveX(1);
	} else if(keyCode === UP_ARROW){
		active.rotate();
	} else if(keyCode === DOWN_ARROW){
		active.moveY();
	}
}

function gameLoop() {
	active.moveY();
}