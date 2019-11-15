// CUSTOM CONFIG
const config = {
	massDrawSize  : 15,			// drawing radius of a particle
	particleSMult : 0.1,		// multiplier of the particle speed
}






let beginDate = Date.now();
let plotter;

function setup() {
	createCanvas(windowWidth * 0.99, windowHeight * 0.99);

	plotter = new Plotter(
		new Pendulum(random(0.1, 5), 6, PI / 4, 0, 0, 0, 0),
		{
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
	);
}

function draw() {
	let cr = Date.now();
	let ellapsedT = cr - beginDate;
	beginDate = cr;

	background(0);
	fill(255);

	plotter.update(ellapsedT / 1000);
	plotter.draw();
}
