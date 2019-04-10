

(function(){
    var buildingSelector = document.getElementById("building");
    var profileSelector = document.getElementById("profile");
    var audienceSelector = document.getElementById("audience");
    var buildings = {
        "Главный корпус БГУ": ["МАТ"], 
        "Физический факультет БГУ": ["ФИЗ"], 
        "Географический факультет БГУ": ["Фил (РУС)", "Фил (АНГ)"], 
        "Химический факультет БГУ": ["ХИМ", "ИМ"], 
        "Юридический факультет БГУ": ["БИО"], 
        "Факультет международных отношений БГУ": ["ИСТ"]
    };
    var blank = document.createElement("option");
    blank.text = ""
    buildingSelector.appendChild(blank);

    fillSelector(buildingSelector, Object.keys(buildings), { selector: profileSelector, info: buildings })
})();


function fillSelector(selector, values, related = null){
    values.forEach(item => {
        var option = document.createElement("option");
        option.text = item.toString();
        selector.appendChild(option);
    })
    if (related){
        selector.addEventListener(
            "change", 
            () => {
                
                var opt = selector.options[selector.selectedIndex].value;
                fillSelector(related.selector, related.info[opt])  
            })
    }
}