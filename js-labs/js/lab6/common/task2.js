function task2() {
    var floors = prompt("Floors: ");
    testIntNumber(floors,"Integer is expected in floors");
    
    var entranceNumber = prompt("Integer of entrance: ");
    testIntNumber(entranceNumber,"Integer is expected in entrance number");

    var flatsOnFloor = prompt("Flats on floor: ");
    testIntNumber(flatsOnFloor, "Integer is expected in flats on floor");
    
    var oneEntrance = flootsNumberOnOneEntrance();
    var summary = summary();

    var flatNumber = prompt("Flat number: ");
    testIntNumber(flatNumber, "Integer is expected in number of flat");
    allowCondition(flatNumber, (arg) => arg <= summary, "Flat number cannot be more than flats in house!");

    alert(`Your flat on ${entrance()} entrance!`);

    function flootsNumberOnOneEntrance(){
        return floors * flatsOnFloor;
    }

    function summary() {
        return entranceNumber * oneEntrance;
    }

    function entrance(){
        var result = flatNumber / oneEntrance;
        var rounded = Math.floor(result);
        if (result - rounded){
            rounded += 1;
        }
        return rounded;
    }

    function testIntNumber(test, errorMessage=''){
        allowCondition(test, (arg) => arg.replace (/\d/g, '').length == 0, errorMessage);
    }

    function allowCondition(argument, condition, errorMessage=''){
        if (!condition(argument)){
            if (errorMessage){
                alert(errorMessage);
            }

            throw Error(errorMessage);
        }
    }
}