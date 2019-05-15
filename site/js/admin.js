(() => {
    
    controller(getApi())
    
    function getApi(){
        const ajaxJsonRequest = (url, onSuccess) => $.getJSON(url, onSuccess);
        return {
            getCorpses:    (onSuccess) => ajaxJsonRequest('https://lyceumexams.herokuapp.com/api/corpses', onSuccess),
            getDictionary: (onSuccess) => ajaxJsonRequest('https://lyceumexams.herokuapp.com/api/dictionary', onSuccess),
            getStudents:   (onSuccess, corps = "", place = "") => ajaxJsonRequest(`https://lyceumexams.herokuapp.com/api/pupils?corps=${corps}&place=${place}`, onSuccess)
        }
    }

    
    function controller(api) {
        var students = [];
        var filtered = [];
        var corpses = [];
        var studentsTable = document.getElementById("students");
        var audiencesTable = document.getElementById("audiences");
        var corpsesSelector = document.getElementById("building");
        
        api.getDictionary(onDictionaryGet);
        api.getCorpses(onCorpsesGet);
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
            var currentDroppable;
            var selectedCorps;
            var shouldSwitch;
            var dragRow;
            var audBody;
            var attrs;
            var asc;
            
            

            $("#building").change(event => {
                if (corpsesSelector.options[0].text == ""){
                    corpsesSelector.options[0] = null;
                }
                selectedCorps = corpses[event.target.value];
                fillSelector(placeSelector, selectedCorps.places, "code", "Все")
                placeSelector.dispatchEvent(new Event('change'));
                $("#search").html('');
            })



            $("#profile").change(event => {
                var index = event.target.value;
                var audiences = [];
                if (index == Number.MAX_SAFE_INTEGER){
                    for (item of selectedCorps.places){
                        audiences = audiences.concat(item.audience);
                    }
                    api.getStudents(onStudentsGet, selectedCorps.alias);
                } else{
                    audiences = selectedCorps.places[index].audience;
                    api.getStudents(onStudentsGet, selectedCorps.alias, selectedCorps.places[index]._id);
                }
                fillSelector(audienceSelector, audiences, "name", "Все");
                audBody = fillAudiencesTable(audiencesTable, audiences);
            })

            $('#audience').change ((event) => {
                filtered = students;
                var index = event.target.selectedIndex;
                if (index != 0){
                    var audience = audienceSelector[index].text;
                    filtered = students.filter(s => Mapper.audience(s.audience) === audience)
                }
                fillStudentsTable(studentsTable, filtered);
            });

            $("#search").on('input', () => {
                var text = (event.target.value).replace(/ /g, '').toLowerCase();
                var temp = filtered.filter(s => (s.firstName + s.lastName + s.parentName).toLowerCase().includes(text));
                fillStudentsTable(studentsTable, temp);
            })
            
            $("#tHeader").click (() => {
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
            })

            $(document).mousedown ((e) => {
                var drag = e.target.closest('.drag');
                if (!drag) return;
                dragRow = createTempRow(drag, e);
                studentsTable.tBodies[0].appendChild(dragRow);
            })

            $(document).mouseup (() => {
                if (!dragRow) return;
                studentsTable.tBodies[0].removeChild(dragRow);
                audBody.className = '';
                dragRow = null;

                if (currentDroppable != null){
                    var newAudience = currentDroppable.children[0].children[0].innerHTML;
                    var newQuantity = +currentDroppable.children[1].innerHTML + 1;
                    console.log('Новая аудитория: ' + newAudience + ', новое количество: ' + newQuantity);
                }
            })

            $(document).mousemove ((e) => {
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
            })

            $('#saveReport').click(()=>{
                var date = new Date().toLocaleString('ru-Ru');
                api.getStudents((data)=>{
                    var json = JSON.stringify(data);
                    writeToDisk(json, `${date}.json`, 'text/plain');
                })
                $("#last-save").html(date);
            });

            function writeToDisk(text, name, type) {
                var a = document.getElementById("saveUrl");
                var file = new Blob([text], {type: type});
                a.href = URL.createObjectURL(file);
                a.download = name;
                a.click();
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
        $('tr').toggle('arrow-up');
        $('tr').toggle('arrow-down');
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
        var _convert = (init, method) => {
            var result = init;
            _attrs.forEach(element => {
                result += method(Mapper.map(element)(_value[element]));
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
