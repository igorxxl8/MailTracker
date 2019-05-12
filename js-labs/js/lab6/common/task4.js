function task4(){
    var dayDict = {
        0: "Monday",
        1: "Tuesday",
        2: "Wednesday",
        3: "Thursday",
        4: "Friday",
        5: "Saturday",
        6: "Sunday"
    }

    var monthDayDict = {
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    }

    // thursday 01.01.2015
    var init = 3;

    var month = +prompt("Month number (1..12):");
    var day = +prompt("Day number (1..31):");
    if (day > monthDayDict[month]){
        alert(`In ${month} month ${monthDayDict[month]} days`)
    }

    var temp = month - 1;
    var diff = day - 1 + init;
    while (temp > 0){
        diff += monthDayDict[temp];
        temp--;
    }
    alert(dayDict[diff % Object.keys(dayDict).length])
}