function ind_task1(){
    var integral = {
        a: 1.2,
        b: 2.8,
        f: (x) => Math.sqrt(1.2*x + 0.7)/(1.4*x+Math.sqrt(1.3*x*x + 0.5)),
        toString: () => `(a:${integral.a} b:${integral.b})` + integral.f + 'dx'    
    }

    var info = {
        n: 100
    }

    calcDifferentMethods(integral,info);

    var integral2 = {
        a: 2,
        b: 3.5,
        f: (x) => 1/(Math.sqrt(x*x - 1)),
        toString: () => `(a:${integral2.a} b:${integral2.b})` + integral2.f + 'dx'    
    }

    calcDifferentMethods(integral2,info);
}

function calcDifferentMethods(integral, info){
    alert(integral);
    alert(`Left rect method: ${integrate(integral, leftRectMethod, info)}`);
    alert(`Right rect method: ${integrate(integral, rightRectMethod, info)}`);
    alert(`Central rect method: ${integrate(integral, centralRectMethod, info)}`);
    alert(`Trap method: ${integrate(integral, trapMethod, info)}`);
}

function integrate(integral, method, info){
    return method(integral, info);
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