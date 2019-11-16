class Plotter {
    constructor(config) {
        this.config   = config;

        let mass = random(1, 4);
        let filLongueur = 5;
        let theta0 = 0.2;

        this.pendulum = [
            new Pendulum(mass, filLongueur, theta0, 'real' ,          'rgba(0,0,255,   0.5)', 0, 0, 0, 0),
            new Pendulum(mass, filLongueur, theta0, 'eulerExplicite', 'rgba(0,255,0,   0.5)', 0, 0, 0, 0),
            new Pendulum(mass, filLongueur, theta0, 'rungeKutta4',    'rgba(255,0,0,   0.5)', 0, 0, 0, 0),
            new Pendulum(mass, filLongueur, theta0, 'verlet',         'rgba(255,255,0, 0.5)', 0, 0, 0, 0)
        ];
    }


    update(dt) {
        for (let i = 0; i < this.pendulum.length; i++) {
            this.pendulum[i].update(dt * config.simuSpeed);
        }
    }

    draw() {
        // DRAW ALL PENDULUMS
        for (let i = 0; i < this.pendulum.length; i++) {
            this.pendulum[i].draw(this);
        }

        // DRAW CENTER POINT
        let centerPos = this.computeForXY(0, 0);
        noStroke();
        fill('rgb(180,180,180)');
        ellipse(centerPos.x, centerPos.y, 10, 10);

        fill('rgb(230,230,230)');
        textSize(17);
        text(`Speed = x${config.simuSpeed}`, width - 100, 55-30);
        text(`Frottements off`, width - 125, 80-30);
        text('  Simulation exacte', 17, 55-30);
        text('  Méthode d\'Euler explicite', 17, 80-30);
        text('  Méthode de Runge-Kutta 4', 17, 105-30);
        text('  Méthode de Verlet', 17, 130-30);

        fill('rgba(0,0,255,   0.5)');text('O', 3, 56-30);
        fill('rgba(0,255,0,   0.5)');text('O', 3, 81-30);
        fill('rgba(255,0,0,   0.5)');text('O', 3, 106-30);
        fill('rgba(255,255,0, 0.5)');text('O', 3, 130-30);

        // CENTER GRID
        if(this.config.displayGrid) {
            let center    = this.computeForXY(0, 0);
            let allPos    = this.computeForXY(
                this.config.scale.x + this.config.offset.x,
                this.config.scale.y - this.config.offset.y
            );

            stroke(255);
            noFill();
            line(center.x - 0.5 * allPos.x, center.y                 , center.x + 0.5 * allPos.x, center.y                 );
            line(center.x                 , center.y - 0.5 * allPos.y, center.x                 , center.y + 0.5 * allPos.y);
        }
    }


    computeForXY(xD, yD) {
        let x = ((xD + this.config.offset.x) / this.config.scale.x + 1) * width  / 2;
        let y;

        if(!this.config.scale.squareByX)
            y = ((-yD + this.config.offset.y) / this.config.scale.y + 1) * height / 2;
        else
            y = ((-yD + this.config.offset.y) / this.config.scale.x) * width / 2 + height / 2;

        return {x, y};
    }
}
