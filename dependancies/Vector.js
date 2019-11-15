class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {

    }

    add(x, y) {
        if(x instanceof Vector) {
            this.x += x.x;
            this.y += x.y;
            return this;
        }

        this.x += x;
        this.y += y;
        return this;
    }

    div(c) {
        return this.mult(1 / c);
    }

    mult(c) {
        this.x *= c;
        this.y *= c;
        return this;
    }

    reset() {
        this.x = 0;
        this.y = 0;
        return this;
    }
}
