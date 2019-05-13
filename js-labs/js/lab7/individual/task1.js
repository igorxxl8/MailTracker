function ind_task1(){
    var info = {
        n: 100
    }

    var integral = new Integral(1.2, 2.8, x => Math.sqrt(1.2*x + 0.7)/(1.4*x+Math.sqrt(1.3*x*x + 0.5)));
    calcDifferentMethods(integral,info);

    var integral2 = new Integral(2, 3.5, x => 1/(Math.sqrt(x*x - 1)));
    calcDifferentMethods(integral2,info);
}

function calcDifferentMethods(integral, info){
    alert(integral);
    alert(`Left rect method: ${integral.integrate(leftRectMethod, info)}`);
    alert(`Right rect method: ${integral.integrate(rightRectMethod, info)}`);
    alert(`Central rect method: ${integral.integrate(centralRectMethod, info)}`);
    alert(`Trap method: ${integral.integrate(trapMethod, info)}`);
}


class Integral {
    constructor(a, b, f){
        this.a = a;
        this.b = b;
        this.f = f;
    }

    integrate(method, info){
        return method(this, info);
    }

    toString() {
        return `(a:${this.a} b:${this.b})` + this.f + 'dx';
    }
}

function leftRectMethod(integral, info){
    n = info.n;
    a = integral.a
    h = (integral.b-a) / n;
    var f = integral.f;
    var sum = 0;
    for (i=0; i < n-1; ++i){
        sum += f(a+i*h);
    }
    return h*sum;
}

function rightRectMethod(integral, info){
    n = info.n;
    a = integral.a
    h = (integral.b - a) / n;
    var f = integral.f;
    var sum = 0;
    for (i=1; i < n; ++i){
        sum += f(a+i*h);
    }

    return h*sum;
}

function centralRectMethod(integral, info){
    n = info.n;
    a = integral.a
    h = (integral.b - a) / n;
    var f = integral.f;
    var sum = 0;
    for (i=0; i < n-1; ++i){
        sum += f(a+i*h+h/2);
    }

    return h*sum;
}

function trapMethod(integral, info){
    n = info.n;
    a = integral.a
    b = integral.b
    h = (b - a) / n;
    var f = integral.f;
    var sum = 0;
    for (i=0; i < n-1; ++i){
        sum += f(a+i*h);
    }
    sum += (f(a) + f(b))/2;

    return h*sum;
}