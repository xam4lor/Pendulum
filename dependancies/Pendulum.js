class Pendulum {
    constructor(mass, pendulumLength, theta0, x0, y0, vx0, vy0) {
        this.m = mass;
        this.l = pendulumLength;
        this.theta = theta0;

        this.pos   = new Vector(x0, y0);
        this.speed = new Vector(vx0, vy0);
        this.acc   = new Vector(0, 0);
    }


    update(dt) {
        // COMPUTE THETA
        // this.theta = ;
        this.theta = 1.2 * Math.cos(-9.81 / this.l * Date.now() / 1000);

        // this.acc
        //     .reset()
        //     .add(0, -this.c.g)
        //     .div(this.m);
        //
        // this.speed.add(this.acc);
        // this.pos.add(this.speed);

        this.pos.x =   this.l * Math.cos(this.theta + PI / 2);
        this.pos.y = - this.l * Math.sin(this.theta + PI / 2);
    }

    draw(drawer) {
        let centerPos = drawer.computeForXY(0, 0);
        let drawPos   = drawer.computeForXY(this.pos.x, this.pos.y);

        stroke(255);
        line(centerPos.x, centerPos.y, drawPos.x, drawPos.y);

        stroke(255);
        ellipse(centerPos.x, centerPos.y, 10, 10);

        noStroke();
        fill(255);
        ellipse(drawPos.x, drawPos.y, this.m * config.massDrawSize, this.m * config.massDrawSize);
    }
}
