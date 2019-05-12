function task2() {
    const func = isNumberDecorator(square);
    alert(func('5.5t'));

    const f1 = checkArgsDecorator(square, 'number');
    alert(f1('5.5t'));

    const f2 = checkArgsDecorator(threeParamsSum, 'number');
    alert(f2(1, 2, '3t'));

    function square(a) {
        return a * a;
    }

    function threeParamsSum(a, b, c){
        return a + b + c;
    }

    function isNumberDecorator(func) {
        function newFunc(arg) {
            if (!+arg) {
                alert('Function argument is not a number!');
            }
            return func(arg);
        }

        return newFunc;
    }

    function checkArgsDecorator(func, type){
        function newFunc(...arg) {
            for (item in arg){
                if (typeof(arg[item]) == type) continue;
                alert(`${+item+1} argument in function is not of type ${type}: ${arg[item]}`);
            }
            return func(...arg);
        }

        return newFunc;
    }
}