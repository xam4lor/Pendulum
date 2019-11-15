class Plotter {
    constructor(pendulum, config) {
        this.config   = config;
        this.pendulum = pendulum;
    }


    update(ellapsedT) {
        this.pendulum.update();
    }

    draw() {
        this.pendulum.draw(this);

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
