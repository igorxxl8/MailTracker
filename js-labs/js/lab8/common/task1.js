function task1(){
    var a = range(1, 5);
    alert(a)
    var b = range(10, 20, 2);
    alert(b)
    var c = range(5, 2, -1);
    alert(c)
    var d = range(-10, 2, -1);
    alert(d)
    var e = range(200, 20, 1);
    alert(e);
    var h = range(200, 200);
    alert(h);


    function range(start, end, step=1){
        if ((end-start)/step < 0){
            alert(`With step ${step} args start ${start} and end ${end} cannot valid`);
            return;
        }

        var result = [start];
        while (end-start != 0){
            start+=step;
            result.push(start);
        }

        return result;
    }
}