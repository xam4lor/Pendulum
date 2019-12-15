function runSimulator(simulator) {
	let mass        = random(1, 4);
	let filLongueur = 5;
	let theta0      = 0.2;

	simulator
		.setEngineConfig((engineConf) => {
			engineConf.runner.UPDATE_FPS   = 600;
			engineConf.plotter.offset.y    = -3;
			engineConf.plotter.displayGrid = false;
			engineConf.window.proportions.height = 0.5;
		})
		.setCustomConfig((customConf) => {
			customConf.massDrawSize = 15;
		})
		.addObjects(Pendulum, 1, mass, filLongueur, theta0, 'real'          , 'rgba(0,0,255,0.5)'  , 0, 0, 0, 0)
		.addObjects(Pendulum, 1, mass, filLongueur, theta0, 'eulerExplicite', 'rgba(0,255,0,0.5)'  , 0, 0, 0, 0)
		.addObjects(Pendulum, 1, mass, filLongueur, theta0, 'rungeKutta4'   , 'rgba(255,0,0,0.5)'  , 0, 0, 0, 0)
		.addObjects(Pendulum, 1, mass, filLongueur, theta0, 'verlet'        , 'rgba(255,255,0,0.5)', 0, 0, 0, 0)
	;
}
