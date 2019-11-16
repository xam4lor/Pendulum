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
        let puls = Math.sqrt(this.c.g / this.l);
        let lambda = (6*PI*this.c.nu[this.c.nu.current]*this.c.R) / 2 * this.m;
        let phi0 = Math.atan(-this.omega0/(this.theta0 * puls));
        let A = this.theta0 / Math.cos(phi0);

        return A * Math.exp(-lambda*t) * Math.cos(puls * t + phi0);
    }

    getOmegaEulerExpl(dt, theta, omega) {
        let r = 0;
        r -= (this.c.g / this.l) * Math.sin(theta);  // w0
        r -= ((6*PI*this.c.nu[this.c.nu.current]*this.c.R) / this.m) * omega; // frottements
        r *= dt;
        return r;
    }

    getOandTRK(dt, theta, omega, order) {
        let puls = Math.pow(Math.sqrt(this.c.g / this.l), 2);

        let k1 = omega*dt;
        let j1 = -puls*Math.sin(theta)*dt;
        let k2 = (omega+j1/2)*dt;
        let j2 = -puls*Math.sin(theta+k1/2)*dt;
        let k3 = (omega+j2/2)*dt;
        let j3 = -puls*Math.sin(theta+k2/2)*dt;
        let k4 = (omega+j3)*dt;
        let j4 = -puls*Math.sin(theta+k3)*dt;

        let newTheta = 1/6*(k1 + 2*k2 + 2*k3 + k4);
        let newOmega = 1/6*(j1 + 2*j2 + 2*j3 + j4);

        return { newOmega, newTheta };
    }



    update(dt, speedMul) {
        if(this.simuMethod == 'real') {
            let t = (Date.now() - beginDate) / 1000;
            this.theta = this.getThetaReal(t * speedMul);
        }
        else if(this.simuMethod == 'eulerExplicite') {
            dt *= speedMul;
            this.theta += this.omega * dt;
            this.omega += this.getOmegaEulerExpl(dt, this.theta, this.omega);
        }
        else if(this.simuMethod == 'rungeKutta4') {
            dt *= speedMul;
            let ans = this.getOandTRK(dt, this.theta, this.omega, 4);
            this.theta += ans.newTheta;
            this.omega += ans.newOmega;
        }

        this.pos.x =  this.l * Math.sin(this.theta);
        this.pos.y = -this.l * Math.cos(this.theta);
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
