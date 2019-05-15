(() => {
    function setUp() {
        $(document).ready( () => {
            $('#dismiss, .overlay').on('click', function () {
                $('#sidebar').removeClass('active');
                $('.overlay').removeClass('active');
            });
      
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').addClass('active');
                $('.overlay').addClass('active');
                $('.collapse.in').toggleClass('in');
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });
            $('#upBut').click(() => {
                $('html, body').animate({
                    scrollTop: 0
                  }, 1000);
            });

            window.onscroll = ()=> {
                if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                    $('#upBDiv').removeClass('d-none');
                } else {
                    $('#upBDiv').addClass('d-none');
                }
            };

            $('#nav-search').click(()=> {
                $('#nav-back').attr('hidden', false);
                $('#searchArea').attr('hidden', false);
                $('#nav-title').attr('hidden', true);
                $('#nav-search').attr('hidden', true);
                $('#corpSel').attr('hidden', true);
                $('#audSel').attr('hidden', true);
                fillStudentsTable( document.getElementById("students"), [])
                $('#search').val('');
            });

            $('#nav-back').click(() => {
                $('#nav-back').attr('hidden', true);
                $('#nav-title').attr('hidden', false);
                $('#nav-search').attr('hidden', false);
                $('#corpSel').attr('hidden', false);
                $('#audSel').attr('hidden', false);
                $('#searchArea').attr('hidden', true);
                $('#profile').trigger('change');
            });
        });
    }
    setUp();

    controller(getApi())
    function getApi(){
        const fetchGet = async(url) => await(await fetch(url)).json();
        return {
            getCorpses:    () => fetchGet('https://lyceumexams.herokuapp.com/api/corpses/saved'),
            getDictionary: () => fetchGet('https://lyceumexams.herokuapp.com/api/dictionary'),
            getStudents:   (corps = "", place = "") => fetchGet(`https://lyceumexams.herokuapp.com/api/pupils/saved?corps=${corps}&place=${place}`)
        }
    }
    
    function controller(api) {
        var students = [];
        var allStudents = [];
        var filtered = [];
        var corpses = [];
        var studentsTable = document.getElementById("students");
        var studentsDiv = document.getElementById('studentsDiv')
        var corpsbar = document.getElementById("corps");
        var navTitle = document.getElementById('nav-title');
        var dummyContent = document.getElementById('dummyContent');
        var selectors = document.getElementById('selectors');
        var placeSelector = document.getElementById("profile");
        var audienceSelector = document.getElementById("audience");
        var tHeader = document.getElementById("tHeader");
        var serchTextField = document.getElementById('search')
        var selectedCorps;
        var shouldSwitch;
        var attrs;
        var asc;
        
        api.getDictionary().then(onDictionaryGet);
        api.getCorpses().then(onCorpsesGet);
        api.getStudents().then(onAllStudentsGet);
        init();
        
        function onCorpsesGet(corpsesData){
            corpses = corpsesData;
            fillCorpsBar(corpsbar, corpses);
        }
        
        function onDictionaryGet(dict){
            Mapper.dictionary = dict;
        }
        
        function onAllStudentsGet(studentsData){
            allStudents = studentsData;
        }

        function onStudentsGet(studentsData){
            students = studentsData;
            filtered = students;
            fillStudentsTable(studentsTable, students);
        }

        
        function init(){
            corpsbar.onclick = async event => {
                var id = showProgressBar();
                await load(event);
                hideProgressBar(id);
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
                fillSelector(audienceSelector, audiences, "name", "All");
            }
    
            audienceSelector.onchange = () => {
                filtered = students;
                var index = event.target.selectedIndex;
                if (index != 0){
                    var audience = audienceSelector[index].text.split(' ')[0];
                    filtered = students.filter(s => Mapper.audience(s.audience) === audience)
                }
                fillStudentsTable(studentsTable, filtered);
            }  

            var target;
            studentsTable.onclick = () => {
                var row = event.target.closest('.collapser');
                if (row == null) return;

                if (target == `#${row.getAttribute('data-target')}` && $(target).hasClass('show')){
                    $(target).removeClass('show');
                    return;
                }
                $('tr').removeClass('show');
                target = `#${row.getAttribute('data-target')}`;
                $(target).addClass('show');
            }


            serchTextField.addEventListener(
                'input',
                () => {
                    var text = (event.target.value).replace(/ /g, '').toLowerCase();
                    var temp;
                    if (text == "") temp = [];
                    else temp = allStudents.filter(s => (s.firstName + s.lastName + s.parentName).toLowerCase().includes(text));
                    fillStudentsTable(studentsTable, temp);
                }
            )
            
            tHeader.addEventListener(
                'click',
                () => {
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
            );
        

        function load(event) {
            return new Promise(resolve => {
                var row = event.target.closest('.corp-pat');
                if (selectedCorps == row) return;
                if (selectedCorps === undefined) dummyContent.remove();
                selectors.classList.add('d-flex');
                studentsDiv.classList.add('d-flex');
                var alias = row.dataset.alias;
                selectedCorps = corpses.find(c => c.alias == alias);
                fillSelector(placeSelector, selectedCorps.places, "code", 'All')
                placeSelector.dispatchEvent(new Event('change'));
                navTitle.innerHTML = Mapper.corpse(alias);

                $('#nav-title').attr('hidden', false);
                $('#sidebar').removeClass('active');
                $('.overlay').removeClass('active');
                $('#nav-search').attr('hidden', false);
                $('#nav-back').attr('hidden', true);
                $('#corpSel').attr('hidden', false);
                $('#audSel').attr('hidden', false);
                $('#searchArea').attr('hidden', true);
                return setTimeout(resolve, 700);
            })
        }

        function showProgressBar() {
            $('#trProg').show();
            var progress = 0;
            var id = setInterval(function() {
                if (progress > 140) progress = -40;
                $('#progressbar').css('width', progress + '%');
                progress+=10;
            }, 100);
            return id;
        }

        function hideProgressBar(id) {
            $('#progressbar').css('width', 0 + '%');
            $('#trProg').hide();
            clearInterval(id);
        }
    }
}

    String.prototype.trunc = 
    function(n){
        return this.substr(0,n-1)+(this.length>n?'&hellip;':'');
    };

    function fillCorpsBar(corpsbar, corpses){
        var row = document.getElementsByClassName('corp-pat')[0];
        for (item of corpses){
            var elem = row.cloneNode(true);
            elem.hidden = false;
            elem.dataset.alias = item.alias;

            var cells = elem.cells;
            var corpName = cells[0];

            var profiles = "";
            for (profile of item.places){
                profiles += `<div>${profile.code} (${profile.count})</div>`
            }
            corpName.innerHTML = `<div class="font-weight-bold py-1" style="white-space: nowrap;">${item.name.trunc(21)}</div>${profiles}`;
            corpsbar.appendChild(elem);
        }
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
            arrowUp.classList.remove('arrow-up');
        }
        if (arrowDown != null){
            arrowDown.classList.remove('arrow-down');
        }
    }

    function appendArrow(asc){
        deleteArrow();
        
        var arrowStyle = 'arrow-down';
        if (asc == 1){
            arrowStyle = 'arrow-up';
        }
        event.target.classList.add(arrowStyle);
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
            option.text = `${data[index][attr]} - ${data[index]["count"]}ч.`;
            option.value = index;
            selector.add(option);
        }
    }

    function fillStudentsTable(table, students){
        var pattern = document.createElement('tr');
        var body = document.createElement('tbody');
        body.setAttribute('id', 'studBody');
        if (students.length == 0){
            var row = pattern.cloneNode();
            row.innerHTML = '<td class="w-50 text-center h-25" colspan="3">Ничего не найдено</td>'
            body.appendChild(row);
        }
        for (index in students){
            var student = students[index];
            var row = pattern.cloneNode();
            var id = student._id;
            row.classList.add('collapser');
            row.setAttribute('data-target', `${id}`);
            var place = "";
            if (student.place){
                place = Mapper.place(student.place).code;
            }
            row.innerHTML = `<td>${student.firstName + ' ' + student.lastName + ' ' + student.parentName }</td>
                             <td>
                             <span>${Mapper.audience(student.audience)}</span>
                             <br>
                             <span>${place}</span>
                             </td>
                             <td></td>`
            body.appendChild(row);
            var row = document.createElement('tr');
            row.setAttribute('id', `${id}`);
            row.classList.add('collapse');
            row.classList.add('nohover');
            row.setAttribute('data-parent', "#studBody");
            row.innerHTML = `<td colspan='3'>
                            <div class="d-flex"> 
                            <div>
                                <div>
                                Профиль: ${Mapper.profile(student.profile)}
                                </div>
                                <div>
                                Телефон: <a href='tel://${student.phone}'>${student.phone}</a>
                                </div>
                                <div>
                                email: ${student.email}
                                </div>
                                <div>
                                <button class="btn btn-info my-2">
                                <i class="fa fa-id-card" aria-hidden="true"></i>
                                Справка
                                </button>
                                </div>
                            </div>
                            <div class="position-relative ml-auto">
                                <button class="btn btn-danger rounded-circle align-self-right" style="width:50px; height:50px;"><a><i class="fa fa-pencil" aria-hidden="true"></i></a></button>
                            </div>
                            </div>
                            </td>`
            body.appendChild(row);
        }
        table.replaceChild(body, table.tBodies[0]);
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
    static default(val){ return val };
    static audience(val){ return Mapper.dictionary.audiences[val]};
    static profile(val){ return this.dictionary.profiles[val]};
    static corpse(val){ return this.dictionary.corpses[val]};
    static place(val){  return this.dictionary.places[val]};
    static map(prop){ return this.hasOwnProperty(prop) ? this[prop] : this.default};
}