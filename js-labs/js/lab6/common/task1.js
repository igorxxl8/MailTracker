function task1() {
    while (true) {
        var first = +prompt("First number: ")
        var second = +prompt("Second number: ")

        var error = false;
        if (!first){
            alert("Первый ввод - не число");
            error = true;
        }

        if (!second){
            alert("Второй ввод - не число");
            error = true;
        }

        if (error){
            return;
        }

        alert(compare(first, second));
    }

    function compare(first, second) {
        if (first > second) {
            return "Второе число меньше";
        }

        if (first < second) {
            return "Первое число меньше";
        }

        return "Числа равны";
    }
}
