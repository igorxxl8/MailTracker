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
        var students = [];
        var filtered = [];
        var corpses = [];
        var studentsTable = document.getElementById("students");
        var audiencesTable = document.getElementById("audiences");
        var corpsesSelector = document.getElementById("building");

        api.getDictionary().then(onDictionaryGet);
        api.getCorpses().then(onCorpsesGet);
        init();
        
        function onCorpsesGet(corpsesData){
            corpses = corpsesData;
            fillSelector(corpsesSelector, corpses, "name", "");
            
        }
        
        function onDictionaryGet(dict){
            Mapper.dictionary = dict;
        }
        
        function onStudentsGet(studentsData){
            students = studentsData;
            filtered = students;
            fillStudentsTable(studentsTable, students);
        }

        function init(){
            var placeSelector = document.getElementById("profile");
            var audienceSelector = document.getElementById("audience");
            var serchTextField = document.getElementById("search");
            var tHeader = document.getElementById("tHeader");
            var saveButton = document.getElementById("save");
            var currentDroppable;
            var selectedCorps;
            var shouldSwitch;
            var dragRow;
            var audBody;
            var attrs;
            var asc;

            saveButton.onclick = () => {
                alert("save");
            }

            corpsesSelector.onchange = event =>
            {
                if (corpsesSelector.options[0].text == ""){
                    corpsesSelector.options[0] = null;
                }
                selectedCorps = corpses[event.target.value];
                fillSelector(placeSelector, selectedCorps.places, "code", "Все")
                placeSelector.dispatchEvent(new Event('change'));
                serchTextField.value = '';
            }

            placeSelector.onchange = event => 
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
                fillSelector(audienceSelector, audiences, "name", "Все");
                audBody = fillAudiencesTable(audiencesTable, audiences);
            }

            audienceSelector.onchange = () => 
            {
                filtered = students;
                var index = event.target.selectedIndex;
                if (index != 0){
                    var audience = audienceSelector[index].text;
                    filtered = students.filter(s => Mapper.audience(s.audience) === audience)
                }
                fillStudentsTable(studentsTable, filtered);
            }  

            serchTextField.oninput = () => 
            {
                    var text = (event.target.value).replace(/ /g, '').toLowerCase();
                    var temp = filtered.filter(s => (s.firstName + s.lastName + s.parentName).toLowerCase().includes(text));
                    fillStudentsTable(studentsTable, temp);
            }
            
            tHeader.onclick = () =>
            {
                    var dataset = event.target.dataset;
                    shouldSwitch = attrs != dataset.attrs;
                    if (shouldSwitch){
                        asc = 1;
                    }

                    attrs = dataset.attrs;
                    
                    if (!shouldSwitch){
                        asc *= -1;
                    }
                    sortData(students, asc, attrs, dataset.type);
                    fillStudentsTable(studentsTable, students);
                    appendArrow(asc);
            }

            document.onmousedown = (e) => {
                var drag = e.target.closest('.drag');
                if (!drag) return;
                dragRow = createTempRow(drag, e);
                studentsTable.tBodies[0].appendChild(dragRow);
            }

            document.onmouseup = () => {
                if (!dragRow) return;
                studentsTable.tBodies[0].removeChild(dragRow);
                audBody.className = '';
                dragRow = null;

                if (currentDroppable != null){
                    var newAudience = currentDroppable.children[0].children[0].innerHTML;
                    var newQuantity = +currentDroppable.children[1].innerHTML + 1;
                    console.log('Новая аудитория: ' + newAudience + ', новое количество: ' + newQuantity);
                }
            }

            document.onmousemove = (e) => {
                if (!dragRow) return;
                if (!audBody.className){
                    audBody.className = 'drop';
                }
                
                dragRow.style.left = e.pageX - dragRow.offsetX + 'px';
                dragRow.style.top =  e.pageY - dragRow.offsetY + 'px';

                dragRow.hidden = true;
                var elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                dragRow.hidden = false;
                if (!elemBelow) return;

                var droppableBelow = elemBelow.closest('.drop-el');
                if (currentDroppable == droppableBelow) return;
                
                if (currentDroppable) {
                    currentDroppable.classList.remove('drop-el-in');
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) {
                    currentDroppable.classList.add('drop-el-in');
                }
            }
        }
    }

    function getComputedSize(elem){
        var styles = document.defaultView.getComputedStyle(elem);
        return {
            height: styles.getPropertyValue('height'),
            width: styles.getPropertyValue('width'),
        }
    }

    function createTempRow(drag, e){
        var coords = drag.getBoundingClientRect();
        var temp = drag.cloneNode(true);
        temp.className = 'av-drag';
        temp.offsetX = e.pageX - coords.left - window.scrollX;
        temp.offsetY = e.pageY - coords.top - window.scrollY;
        var size =  getComputedSize(drag);
        var dragRowStyle = temp.style;
        dragRowStyle.height = size.height;
        dragRowStyle.width = size.width;
        return temp;
    }
    
    function sortData(data, asc, attrs, type) {
        data.sort(predicate);
        
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

    function deleteArrow(){
        var arrowUp = document.getElementsByClassName('arrow-up')[0];
        var arrowDown= document.getElementsByClassName('arrow-down')[0];
        if (arrowUp != null){
            arrowUp.className = "";
        }
        if (arrowDown != null){
            arrowDown.className = "";
        }
    }

    function appendArrow(asc){
        deleteArrow();
        
        var arrowStyle = 'arrow-down';
        if (asc == 1){
            arrowStyle = 'arrow-up';
        }
        event.target.className = arrowStyle;
    }

    function fillSelector(selector, data, attr,  current = null){
        for (index in selector.options){
            selector.options[index] = null;
        }

        if (current != null) {
            var option = new Option();
            option.text = current;
            option.value = Number.MAX_SAFE_INTEGER;
            selector.add(option);
        }

        for (index in data){
            var option = new Option();
            option.text = data[index][attr];
            option.value = index;
            selector.add(option);
        }
    }

    function fillStudentsTable(table, students){
        var body = document.createElement('tbody');
        for (index in students){
            var student = students[index];
            var row = document.createElement('tr');
            row.className = 'drag'
            row.innerHTML = `<td>${++index}</td>
                            <td>${student.firstName + ' ' + student.lastName + ' ' + student.parentName }</td>
                            <td>${Mapper.audience(student.audience)}</td>
                            <td>${Mapper.profile(student.profile)}</td>
                            <td>${student.needBel}</td>`
            body.appendChild(row);
        }
        table.replaceChild(body, table.tBodies[0]);
        return body;
    }

    function fillAudiencesTable(table, audiences, audBody){
        var body = document.createElement('tbody');
        body.id = 'bodyAudiences';
        for (index in audiences){
            var audience = audiences[index];
            var row = document.createElement('tr');
            row.innerHTML = `<td><b>${audience.name}</b></td>
                            <td>${audience.count}</td>
                            <td>${audience.max}</td>
                            <td>${audience.bel}</td>`
            row.className = 'drop-el';
            body.appendChild(row);
        }
        table.replaceChild(body, table.tBodies[0])
        return body;
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
    static default  = val  => val;
    static audience = val  => this.dictionary.audiences[val];
    static profile  = val  => this.dictionary.profiles[val];
    static map      = prop => this.hasOwnProperty(prop) ? this[prop] : this.default;
}