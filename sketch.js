// CUSTOM CONFIG
const config = {
	massDrawSize  : 15,			// drawing radius of a particle
	simuSpeed: 1,
	plotter: {
		scale : { // graph from x units on each side
			x : 10,
			y : 10,
			squareByX : true
		},
		offset : {
			x:  0,
			y: -3
		},
		displayGrid: false
	}
}






let beginDate = Date.now();
let currentDate = beginDate;
let plotter;

function setup() {
	createCanvas(windowWidth * 0.99, windowHeight * 0.99);

	plotter = new Plotter(config.plotter);
}

function draw() {
	let cr = Date.now();
	let ellapsedT = cr - currentDate;
	currentDate = cr;

	background(0);
	fill(255);

	plotter.update(ellapsedT / 1000);
	plotter.draw();
}
