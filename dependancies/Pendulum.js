class Pendulum {
    constructor(mass, pendulumLength, theta0, simuMethod, color, x0, y0, vx0, vy0) {
        this.m = mass;
        this.l = pendulumLength;

        this.color = color;
        this.simuMethod = simuMethod;

        this.theta0 = theta0;
        this.omega0 = 0;
        this.theta = this.theta0;
        this.omega = this.omega0;

        this.pos   = new Vector(x0, y0);
        this.speed = new Vector(vx0, vy0);
        this.acc   = new Vector(0, 0);

        this.c = {
            g: 9.81,
            nu: { // viscosité dynamique
                current: 'air',
                eau: Math.pow(10, -3),
                air: 1.5 * Math.pow(10, -5),
                huile: 0.1
            },
            R: this.m * config.massDrawSize // surface
        }
    }



    getThetaReal(t) {
        let omegaLitt0 = Math.sqrt(this.c.g / this.l);
        let lambda = (6*PI*this.c.nu[this.c.nu.current]*this.c.R) / 2 * this.m;
        let phi0 = Math.atan(-this.omega0/(this.theta0 * omegaLitt0));
        let A = this.theta0 / Math.cos(phi0);

        return A * Math.exp(-lambda*t) * Math.cos(omegaLitt0 * t + phi0);
    }

    getOmegaEulerExpl(dt, theta, omega) {
        let r = 0;
        r -= (this.c.g / this.l) * Math.sin(theta);  // w0
        r -= ((6*PI*this.c.nu[this.c.nu.current]*this.c.R) / this.m) * omega; // frottements
        r *= dt;
        return r;
    }



    update(dt, speedMul) {
        if(this.simuMethod == 'real') {
            let t = (Date.now() - beginDate) / 1000;
            this.theta = this.getThetaReal(t * speedMul);

            this.pos.x =  this.l * Math.sin(this.theta);
            this.pos.y = -this.l * Math.cos(this.theta);
        }
        else if(this.simuMethod == 'eulerExplicite') {
            dt *= speedMul;
            this.theta += this.omega * dt;
            this.omega += this.getOmegaEulerExpl(dt, this.theta, this.omega);

            this.pos.x =  this.l * Math.sin(this.theta);
            this.pos.y = -this.l * Math.cos(this.theta);
        }
    }

    draw(drawer) {
        let centerPos = drawer.computeForXY(0, 0);
        let drawPos   = drawer.computeForXY(this.pos.x, this.pos.y);

        noFill();
        stroke(this.color);
        line(centerPos.x, centerPos.y, drawPos.x, drawPos.y);

        noStroke();
        fill(this.color);
        ellipse(drawPos.x, drawPos.y, this.m * config.massDrawSize, this.m * config.massDrawSize);
    }
}
