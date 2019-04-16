(() => {
    controller(getApi())
    function getApi(){
        const fetchGet = async(url) => await(await fetch(url)).json();
        return {
            getCorpses:    () => fetchGet('https://lyceumexams.herokuapp.com/api/corpses'),
            getDictionary: () => fetchGet('https://lyceumexams.herokuapp.com/api/dictionary'),
            getStudents:   (corps = "", place = "") => fetchGet(`https://lyceumexams.herokuapp.com/api/pupils?corps=${corps}&place=${place}`)
        }
    }
    

    function controller(api) {
        api.getDictionary().then(onDictionaryGet);

        function onCorpsesGet(corpses){
            var corpsesSelector = document.getElementById("building");
            var placeSelector = document.getElementById("profile");
            var audienceSelector = document.getElementById("audience");
            fillSelector(corpsesSelector, corpses, "name", "");
            var selectedCorps;
            corpsesSelector.addEventListener(
                'change',
                event => 
                {
                    if (corpsesSelector.options[0].text == ""){
                        corpsesSelector.options[0] = null;
                    }
                    selectedCorps = corpses[event.target.value];
                    fillSelector(placeSelector, selectedCorps.places, "code", "Все")
                    placeSelector.dispatchEvent(new Event('change'));
                }
            );
            placeSelector.addEventListener(
                'change',
                event => 
                {
                    var index = event.target.value;
                    var audiences = [];
                    var stud;
                    if (index == Number.MAX_SAFE_INTEGER){
                        for (item of selectedCorps.places){
                            audiences = audiences.concat(item.audience);
                        }
                        stud = api.getStudents(selectedCorps.alias);
                    } else{
                        audiences = selectedCorps.places[index].audience;
                        stud = api.getStudents(selectedCorps.alias, selectedCorps.places[index]._id);
                    }
                    stud.then(onStudentsGet);
                    fillSelector(audienceSelector, audiences, "name", "Все")
                }
            );

            function fillSelector(selector, corpses, attr,  current = null){
                for (index in selector.options){
                    selector.options[index] = null;
                }
        
                if (current != null) {
                    var option = new Option();
                    option.text = current;
                    option.value = Number.MAX_SAFE_INTEGER;
                    selector.add(option);
                }
        
                for (index in corpses){
                    var option = new Option();
                    option.text = corpses[index][attr];
                    option.value = index;
                    selector.add(option);
                }
            }
        }

        function onDictionaryGet(dict){
            Mapper.dictionary = dict;
            api.getCorpses().then(onCorpsesGet);
        }

        var studentsTable = document.getElementById("students");
        var tHeader = document.getElementById("tHeader");
        function onStudentsGet(students){
            fillStudentsTable();
            var attrs;
            var shouldSwitch;
            var asc;
            tHeader.addEventListener(
                'click',
                () => {
                    var dataset = event.target.dataset;
                    shouldSwitch = attrs != dataset.attrs;
                    if (shouldSwitch){
                        asc = 1;
                    }
        
                    attrs = dataset.attrs;
                    sortData(students, attrs, dataset.type);
                    fillStudentsTable();
                    appendArrow();
                }
            );
                
            function appendArrow(){
                var arrowUp = document.getElementsByClassName('arrow-up')[0];
                var arrowDown= document.getElementsByClassName('arrow-down')[0];
                if (arrowUp != null){
                    arrowUp.className = "";
                }
                if (arrowDown != null){
                    arrowDown.className = "";
                }
                
                var arrowStyle = 'arrow-down';
                if (asc == 1){
                    arrowStyle = 'arrow-up';
                }
                event.target.className = arrowStyle;
            }
            
            function sortData(corpses, attrs, type) {
                if (!shouldSwitch){
                    asc *= -1;
                }
                corpses.sort(predicate);
        
                function predicate(current, next){
                    var a = new Convertible(current, attrs)[type];
                    var b = new Convertible(next, attrs)[type];
                    var returnValue = -1;
                    if (a > b){
                        returnValue = 1;
                    }
                    if (a == b){
                        returnValue = 0;
                    }
                    return asc*returnValue;
                }
            }
        
            function fillStudentsTable(){
                var body = document.createElement('tbody');
                for (index in students){
                    var student = students[index];
                    var row = document.createElement('tr');
                    row.draggable = true;
                    row.innerHTML = `<td>${++index}</td>
                                    <td>${student.firstName + ' ' + student.lastName + ' ' + student.parentName }</td>
                                    <td>${Mapper.dictionary.audiences[student.audience]}</td>
                                    <td>${Mapper.dictionary.profiles[student.profile]}</td>
                                    <td>${student.needBel}</td>`
                    body.appendChild(row);
                }
                studentsTable.replaceChild(body, studentsTable.tBodies[0])
            }
        }
    }
})();

class Convertible {
    constructor(value, attrs) {
        var _value = value;
        var _attrs = attrs.split('|');
        var _convert = (init, parseMethod) => {
            var result = init;
            _attrs.forEach(element => {
                result += parseMethod(Mapper.map(element)(_value[element]));
            });
            return result;
        };
        this.String = _convert("", String);
        this.Number = _convert(0, parseInt);
        this.Boolean = _convert(false, Boolean);
    }
}

class Mapper {
    static map      = prop => this.hasOwnProperty(prop) ? this[prop] : this.default;
    static default  = val => val;
    static audience = val => this.dictionary.audiences[val];
    static profile  = val => this.dictionary.profiles[val];
}