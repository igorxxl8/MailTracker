function task1() {
    var a = new Vector(1, 1, 1);
    alert(a)
    alert(+a)

    var b = new Vector(2, 2, 2);
    alert(b)
    alert(+b)

    var c = Vector.prototype.plus(a, b);
    alert(c)
    alert(+c)

    var d = Vector.prototype.scalar(a, b);
    alert(d)
    alert(c.length);
    c.length = 5;
    alert(c.length);

    var test = new Vector(1, 1, 1)
    alert(test)
    alert(test.length);
    test.length = 5;
    alert(test.length);
}

class Vector {
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toString(){
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

    valueOf(){
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }
}

Vector.prototype.plus = (a, b) => {
    return new Vector(a.x + b.x, a.y + b.y, a.z + b.z)
}

Vector.prototype.scalar = (a, b) => {
    return a.x * b.x + a.y * b.y + a.z * b.z
}

Object.defineProperty(Vector.prototype, "length", {
    get: function(){
        return +this;
    }
})