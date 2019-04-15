(() => {
    var data = [
        {
            "name": "Главный корпус БГУ",
            "places": [
                {
                    "name": "МАТ",
                    "audience": [
                        {
                            "name": "517" 
                        },
                        {
                            "name": "517" 
                        },
                        {
                            "name": "513" 
                        },
                        {
                            "name": "606" 
                        },
                        {
                            "name": "609" 
                        },
                        {
                            "name": "433" 
                        },
                        {
                            "name": "521" 
                        }
                    ]
                }
            ], 
        },
        {
            "name": "Физический факультет БГУ",
            "places": [
                {
                    "name": "ФИЗ",
                    "audience": [
                        {
                            "name": "319" 
                        },
                        {
                            "name": "319" 
                        },
                        {
                            "name": "213" 
                        },
                        {
                            "name": "211" 
                        },
                        {
                            "name": "321" 
                        },
                        {
                            "name": "418" 
                        },
                        {
                            "name": "220" 
                        }
                    ]
                }
            ]
        }, 
        {
            "name": "Географический факультет БГУ",
            "places": [
                {
                    "name": "Фил (РУС)",
                    "audience": [
                        {
                            "name": "115" 
                        },
                        {
                            "name": "312" 
                        }
                    ]
                },
                {
                    "name": "Фил (АНГ)",
                    "audience": [
                        {
                            "name": "116" 
                        },
                        {
                            "name": "212" 
                        },
                        {
                            "name": "311" 
                        }
                    ]
                }
            ]
        }, 
        {
            "name": "Химический факультет БГУ",
            "places": [
                {
                    "name": "ХИМ",
                    "audience": [
                        {
                            "name": "713" 
                        },
                        {
                            "name": "713" 
                        },
                        {
                            "name": "201" 
                        },
                        {
                            "name": "301" 
                        },
                        {
                            "name": "601" 
                        }
                    ]
                }, 
                {
                    "name": "ИМ",
                    "audience": [
                        {
                            "name": "705" 
                        },
                        {
                            "name": "705" 
                        },
                        {
                            "name": "706" 
                        },
                        {
                            "name": "707a" 
                        },
                        {
                            "name": "708" 
                        },
                        {
                            "name": "709" 
                        },
                        {
                            "name": "501" 
                        },
                        {
                            "name": "507" 
                        },
                        {
                            "name": "701" 
                        }
                    ]
                }
            ]
        }, 
        {
            "name": "Юридический факультет БГУ",
            "places": [
                {
                    "name": "БИО",
                    "audience": [
                        {
                            "name": "308" 
                        },
                        {
                            "name": "308" 
                        },
                        {
                            "name": "511" 
                        },
                        {
                            "name": "214" 
                        },
                        {
                            "name": "418" 
                        },
                        {
                            "name": "309" 
                        },
                        {
                            "name": "513" 
                        },
                        {
                            "name": "610" 
                        },
                        {
                            "name": "609" 
                        }
                    ]
                }
            ]
        }, 
        {
            "name": "Факультет международных отношений БГУ",
            "places": [
                {
                    "name": "ИСТ",
                    "audience": [
                        {
                            "name": "1202" 
                        },
                        {
                            "name": "1202" 
                        },
                        {
                            "name": "1201" 
                        },
                        {
                            "name": "1301" 
                        },
                        {
                            "name": "1302" 
                        }
                    ]
                }
            ]
        }
    ];
    var corpusSelector = document.getElementById("building");
    var placeselector = document.getElementById("profile");
    var audienceSelector = document.getElementById("audience");
    var selectedCorps;
    fillSelector(corpusSelector, data, "");
    corpusSelector.addEventListener(
        'change',
        event => 
        {
            if (corpusSelector.options[0].text == ""){
                corpusSelector.options[0] = null;
            }
            selectedCorps = data[event.target.value];
            fillSelector(placeselector, selectedCorps.places, "Все")
            placeselector.dispatchEvent(new Event('change'))
        }
    );
    placeselector.addEventListener(
        'change',
        event => 
        {
            var index = event.target.value;
            var audiences = [];
            if (index == Number.MAX_SAFE_INTEGER){
                for (item of selectedCorps.places){
                    audiences = audiences.concat(item.audience);
                }
            } else{
                audiences = selectedCorps.places[index].audience;
            }
            fillSelector(audienceSelector, audiences, "Все")
        }
    );
    
    var students = [
        {
            "firstName": "Василий",
            "lastName": "Васильев",
            "parentName": "Васильевич",
            "place": "116",
            "profile": "филологический",
            "needBel": false
        },
        {
            "firstName": "Иван",
            "lastName": "Иванов",
            "parentName": "Иванович",
            "place": "433",
            "profile": "математический",
            "needBel": true
        },
        {
            "firstName": "Иван",
            "lastName": "Иванов",
            "parentName": "Петрович",
            "place": "43",
            "profile": "математический",
            "needBel": true
        },
        {
            "firstName": "Александр",
            "lastName": "Александров",
            "parentName": "Александрович",
            "place": "517",
            "profile": "математический",
            "needBel": false
        }
    ]
    var studentsTable = document.getElementById("students");
    var tHeader = document.getElementById("tHeader");
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
    
    function sortData(data, attrs, type) {
        if (!shouldSwitch){
            asc *= -1;
        }
        data.sort(predicate);

        function converter(current, next){
            var attrsArr = attrs.split('|');
            if (type == "Number"){
                var a = 0;
                var b = 0;
            }

            for (attr of attrsArr){
                var c = current[attr].toString();
                var d = next[attr].toString();
                if (type == "Number"){
                    c = Number(c);
                    d = Number(d);
                }

                a += c;
                b += d;
            }
            
            return [a, b];
        }

        function predicate(current, next){
            var values = converter(current, next);
            var returnValue = -1;
            if (values[0] > values[1]){
                returnValue = 1;
            }
            if (values[0] == values[1]){
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
                            <td>${student.lastName + ' ' + student.firstName + ' ' + student.parentName }</td>
                            <td>${student.place}</td>
                            <td>${student.profile}</td>
                            <td>${student.needBel}</td>`
            body.appendChild(row);
        }
        studentsTable.replaceChild(body, studentsTable.tBodies[0])
    }

    function fillSelector(selector, data, current = null){
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
            option.text = data[index].name;
            option.value = index;
            selector.add(option);
        }
    }
})();


