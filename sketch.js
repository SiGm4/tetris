var cols = 10;
var rows = 20;
var w = 30;
var nextW = 100;
var nextH = 100;
//var frames = 5;
var score = 0;
var grid = new Array(rows);

var generator;
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
	return a;
}

function setup() {
	var cnv = createCanvas(cols * w + 1 + nextW * 2, rows * w + 1);
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
	generator = arrayShuffle([new I(0, 3), new J(0, 3), new L(0, 3), new O(0, 4), new S(0, 3), new T(0, 3), new Z(0, 3)]);
	console.log(generator);
	active = generator.shift();

	myInterval = setInterval(gameLoop, 500);
}

function draw() {
	background(21);

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

	//create next box
	noFill();
	rect(cols * w + 1 + nextW / 2, 3 * w, nextW, nextH);
	next = generator[0];
	for (var i = 0; i < next.shape.length; i++) {
		for (var j = 0; j < next.shape[i].length; j++) {
			if (next.shape[i][j] != 0) {
				fill(color(next.color));
				smallW = nextW * 0.9 / next.shape.length;
				smallH = nextH * 0.9 / next.shape[i].length;
				rect(cols * w + 1 + nextW / 2 + nextW * 0.05 + j * smallW, 3 * w + nextH * 0.05 + i * smallH, smallW, smallH);
			}
		}
	}


	active.show();

}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		active.moveX(-1);
	} else if (keyCode === RIGHT_ARROW) {
		active.moveX(1);
	} else if (keyCode === UP_ARROW) {
		active.rotate();
	} else if (keyCode === DOWN_ARROW) {
		active.moveY();
	} else if (keyCode === 32) {
		active.autoDrop();
	}
}

function gameLoop() {
	active.moveY();
}