function ind_task1(){
    var n = +prompt("n: ");
    var m = +prompt("m: ");
    const fact = memofactorial();
    while (m > 0){
        var x = +prompt("x:");
        alert(`S(X): ${S(x, n)}\nY(X): ${Y(x)}`)
        --m;
    }
    
    function S(x, n){
        var result = 0;
        for (i = 0; i < n; i++){
            result += C(x, i);
        }

        return result;
    }

    function C(x, n){
        return Math.pow(-1, n) * (2 * n * n + 1) * Math.pow(x, 2*n) / fact(2 * n)
    }

    function Y(x) {
        return (1 - x*x/2)*Math.cos(x) - x/2*Math.sin(x);
    }

    function memofactorial(){
        let factDict = {0:1}
        function factorial(x){
            if (x in factDict){
                return factDict[x];
            }

            var number = x * factorial(x-1);
            factDict[x] = number;
            return number;
        }

        return factorial
    }
}