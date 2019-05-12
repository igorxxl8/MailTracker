function task3(){
    var i = prompt("i: ");
    testIntNumber(i, "i must be a integer!")
    
    const fibonaccy = memofibonaccy();
    alert(`${i} fibonaccy number: ${fibonaccy(i)}`);

    function memofibonaccy(){
        fibdict = {}
        
        function fibonaccy(i){
            if (i in fibdict){
                return fibdict[i];
            }
            
            var number;
            if (i === 0 || i === 1){
                number = i;
            }
            else {
                number = fibonaccy(i-1) + fibonaccy(i-2);
            }

            fibdict[i] = number;
            return number;
        }

        return fibonaccy;
    }

    function testIntNumber(test, errorMessage){
        if (test.replace (/\d/g, '').length){
            alert(errorMessage);
            throw Error(errorMessage);
        }
    }
}