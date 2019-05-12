function task1(){
    var x1 = +prompt('x1: ');
    var y1 = +prompt('y1: ');
    var x2 = +prompt('x2: ');
    var y2 = +prompt('y2: ');
    var x3 = +prompt('x3: ');
    var y3 = +prompt('y3: ');
    var x4 = +prompt('x4: ');
    var y4 = +prompt('y4: ');

    var rect = {
        A:{ x:x1, y:y1},
        B:{ x:x2, y:y2},
        C:{ x:x3, y:y3},
        D:{ x:x4, y:y4}
    }

    var M = {x:40, y: 20}

    alert(`ABCD rectangle? - ${isRectangle(rect.A, rect.B, rect.C, rect.D)}`);
    alert(`E belongs ABCD? - ${isInRect(M, rect)}`);

    function isOrthogonal(a, b, c){
        return (b.x - a.x) * (b.x - c.x) + (b.y - a.y) * (b.y - c.y) == 0;
    }

    function isRectangle(a, b, c, d){
        return isOrthogonal(a, b, c) && isOrthogonal(b, c, d) && isOrthogonal(c, d, a);
    }

    function isInRect(m, r) {
        var AB = vector(r.A, r.B);
        var AM = vector(r.A, m);
        var BC = vector(r.B, r.C);
        var BM = vector(r.B, m);
        var dotABAM = dot(AB, AM);
        var dotABAB = dot(AB, AB);
        var dotBCBM = dot(BC, BM);
        var dotBCBC = dot(BC, BC);
        return 0 <= dotABAM && dotABAM <= dotABAB && 0 <= dotBCBM && dotBCBM <= dotBCBC;
    }
    
    function vector(p1, p2) {
        return {
                x: (p2.x - p1.x),
                y: (p2.y - p1.y)
        };
    }
    
    function dot(u, v) {
        return u.x * v.x + u.y * v.y; 
    }
}