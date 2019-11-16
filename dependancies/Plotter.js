class Plotter {
    constructor(config) {
        let mass = random(1, 4);
        let filLongueur = 6;
        let theta0 = PI / 5;

        this.config   = config;
        this.pendulum = [
            new Pendulum(mass, filLongueur, theta0, 'real' ,          'rgba(0,0,255, 0.5)', 0, 0, 0, 0),
            new Pendulum(mass, filLongueur, theta0, 'eulerExplicite', 'rgba(0,255,0, 0.5)', 0, 0, 0, 0),
            new Pendulum(mass, filLongueur, theta0, 'rungeKutta4',    'rgba(255,0,0, 0.5)', 0, 0, 0, 0)
        ];
    }


    update(dt) {
        for (let i = 0; i < this.pendulum.length; i++) {
            this.pendulum[i].update(dt, this.config.speedMultiplier);
        }
    }

    draw() {
        for (let i = 0; i < this.pendulum.length; i++) {
            this.pendulum[i].draw(this);
        }

        let centerPos = this.computeForXY(0, 0);
        noStroke();
        fill('white')
        ellipse(centerPos.x, centerPos.y, 10, 10);

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
