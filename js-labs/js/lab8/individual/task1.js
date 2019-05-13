function ind_task1(){
    n = 5;
    var matrix = new Matrix(n, n);
    matrix.setElements();
    alert(matrix);

    var elements = [
        [ 1,  2, 3,  4,  5],
        [-2, -5, 3,  4,  5],
        [-2, -3, 0,  3, -2],
        [ 1,  2, 3,  4,  5],
        [-2, -1, 3, -4,  4]
    ]

    var testMatrix = new Matrix(n, n);
    testMatrix.setElements(elements);
    alert(testMatrix);
    task(testMatrix.elements);

    var testArray = [1, 2, 3, 10, 4, 5, 6, 7, 8, 9, 10];
    const comparator = (a, b) => {
        return a - b;
    }
    alert(testArray);
    var arr = sort(testArray, comparator);
    alert(arr);

    function task(matrix){
        var sumUnderDiag = 0;
        var sumOnDiag = 0;
        var sumAboveDiag = 0;
        for (index in matrix){
            var row = matrix[index];
            if (row[0] >= 0) continue;
            sumUnderDiag += sumInRowAllowCond(row, i => i < index);
            sumOnDiag    += sumInRowAllowCond(row, i => i == index);
            sumAboveDiag += sumInRowAllowCond(row, i => i > index);
        }
        alert(sumUnderDiag);
        alert(sumOnDiag);
        alert(sumAboveDiag);
    }

    function sumInRowAllowCond(row, cond){
        var sum = 0;
        console.log(row);
        for (ind in row){
            if (!cond(ind)) continue;
            console.log(row[ind])
            sum += row[ind];
        }
        return sum;
    }

    function sort(arr, comparator){
        for (let i = 0, endI = arr.length - 1; i < endI; i++) {
            let wasSwap = false;
            for (let j = 0, endJ = endI - i; j < endJ; j++) {
                if (comparator(arr[j], arr[j+1]) > 0) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    wasSwap = true;
                }
            }
            if (!wasSwap) break;
        }
        return arr;
    }
}

class Matrix {
    constructor(n, m){
        this.n = n;
        this.m = m;
    }
    
    setElements(elements=null){
        if (elements){
            this.elements = elements;
            return
        }
        
        this.elements = this.createMatrix()
    }

    getRandomNumber(min=-100, max=100){
        return Math.random()*(max-min) + min;
    }

    createMatrix() {
        var array = []
        for(var i=0; i < this.n; ++i){
            var row = []
            for(var j=0; j < this.m; ++j){
                row.push(this.getRandomNumber());
            }
            array.push(row);
        }
        return array;
    }

    toString() {
        var s = [];
        for(var elem of this.elements){
            var row = '[' + elem.join('\t') + ']'
            s.push(row);
        }
        return s.join('\n');
    }
}
