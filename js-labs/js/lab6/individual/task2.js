function ind_task2(){
    var text = prompt("Text: ");
    var k = +prompt("k: ")
    alert(`${text}\n${findWordOnWithKLetter(text, k-1)}`);

    function findWordOnWithKLetter(text, k){
        var current = 1;
        for (var letter in text){
            if (letter == k){
                return current;
            }
    
            if (text[letter] == ' '){
                current++;
            }
        }
    }
}