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

        this.t0    = 0;
        this.lastT = this.t0;

        this.pos   = new Vector(x0, y0);
        this.speed = new Vector(vx0, vy0);
        this.acc   = new Vector(0, 0);

        this.c = {
            g: 9.81,
            nu: { // viscosité dynamique
                current: 'void',
                void: Number.NEGATIVE_INFINITY,
                eau: Math.pow(10, -3),
                air: 1.5 * Math.pow(10, -5),
                huile: 0.1
            },
            R: this.m * config.massDrawSize, // surface
        };

        this.puls = Math.sqrt(this.c.g / this.l); // pulsation omega0
    }



    getThetaReal(t) {
        let lambda = (6*PI*this.c.nu[this.c.nu.current]*this.c.R) / 2 * this.m;
        let phi0 = Math.atan(-this.omega0/(this.theta0 * this.puls));
        let A = this.theta0 / Math.cos(phi0);

        return A * Math.cos(this.puls * t + phi0); //  * Math.exp(-lambda*t)
    }

    getEulerExpl(dt, theta, omega) {
        let dOmega = -this.puls * this.puls * Math.sin(theta) * dt;
        let dTheta = omega * dt;

        return {theta: theta + dTheta, omega: omega + dOmega};
        // let r = 0;
        // r -= (this.c.g / this.l) * Math.sin(theta);  // w0
        // r -= ((6*PI*this.c.nu[this.c.nu.current]*this.c.R) / this.m) * omega; // frottements
        // r *= dt;
        // return r;
    }

    getRK4(dt, theta, omega) {
        let puls = this.puls * this.puls;
        let k1 = omega*dt;
        let j1 = -puls*Math.sin(theta)*dt;
        let k2 = (omega+j1/2)*dt;
        let j2 = -puls*Math.sin(theta+(k1/2))*dt;
        let k3 = (omega+j2/2)*dt;
        let j3 = -puls*Math.sin(theta+k2/2)*dt;
        let k4 = (omega+j3)*dt;
        let j4 = -puls*Math.sin(theta+k3)*dt;

        let dTheta = (1/6)*(k1 + 2*k2 + 2*k3 + k4);
        let dOmega = (1/6)*(j1 + 2*j2 + 2*j3 + j4);

        return {theta: theta + dTheta, omega: omega + dOmega};
    }

    getVerlet(dt, theta, omega) {
        let dTheta = omega * dt - 1/2 * this.puls * this.puls * Math.sin(theta) * dt * dt;
        let thetaN = theta + dTheta;

        let dOmega = -1/2*(Math.sin(theta) + Math.sin(thetaN)) * this.puls * this.puls *dt;

        return {theta: thetaN, omega: omega + dOmega};
    }



    update(dt) {
        let m;
        if(this.simuMethod == 'real') {
            this.lastT += dt;
            this.theta = this.getThetaReal(this.lastT);
        }
        else if(this.simuMethod == 'eulerExplicite')
            m = this.getEulerExpl(dt, this.theta, this.omega);
        else if(this.simuMethod == 'rungeKutta4')
            m = this.getRK4(dt, this.theta, this.omega);
        else if(this.simuMethod == 'verlet')
            m = this.getVerlet(dt, this.theta, this.omega);

        if(this.simuMethod != "real") {
            this.theta = m.theta;
            this.omega = m.omega;
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
