function ind_task2(){
    var text = prompt("Text: ");
    var res = findWordsStartEndWithVoewl(text);
    alert(res);
    

    function findWordsStartEndWithVoewl(text){
        var letters = ['e','y','u','i','a','o']
        var words = text.split(' ');
        var result = []
        words.forEach(word => {
            if (letters.includes(word[0]) && letters.includes(word.slice(-1))){
                result.push(word);
            }
        });

        return result;
    }
}