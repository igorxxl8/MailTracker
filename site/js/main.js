(() => {
    var data = [
        {
            "Name": "Главный корпус БГУ",
            "Profiles": [
                {
                    "Name": "МАТ",
                    "Audiences": [
                        {
                            "Name": "517" 
                        },
                        {
                            "Name": "517" 
                        },
                        {
                            "Name": "513" 
                        },
                        {
                            "Name": "606" 
                        },
                        {
                            "Name": "609" 
                        },
                        {
                            "Name": "433" 
                        },
                        {
                            "Name": "521" 
                        }
                    ]
                }
            ], 
        },
        {
            "Name": "Физический факультет БГУ",
            "Profiles": [
                {
                    "Name": "ФИЗ",
                    "Audiences": [
                        {
                            "Name": "319" 
                        },
                        {
                            "Name": "319" 
                        },
                        {
                            "Name": "213" 
                        },
                        {
                            "Name": "211" 
                        },
                        {
                            "Name": "321" 
                        },
                        {
                            "Name": "418" 
                        },
                        {
                            "Name": "220" 
                        }
                    ]
                }
            ]
        }, 
        {
            "Name": "Географический факультет БГУ",
            "Profiles": [
                {
                    "Name": "Фил (РУС)",
                    "Audiences": [
                        {
                            "Name": "115" 
                        },
                        {
                            "Name": "312" 
                        }
                    ]
                },
                {
                    "Name": "Фил (АНГ)",
                    "Audiences": [
                        {
                            "Name": "116" 
                        },
                        {
                            "Name": "212" 
                        },
                        {
                            "Name": "311" 
                        }
                    ]
                }
            ]
        }, 
        {
            "Name": "Химический факультет БГУ",
            "Profiles": [
                {
                    "Name": "ХИМ",
                    "Audiences": [
                        {
                            "Name": "713" 
                        },
                        {
                            "Name": "713" 
                        },
                        {
                            "Name": "201" 
                        },
                        {
                            "Name": "301" 
                        },
                        {
                            "Name": "601" 
                        }
                    ]
                }, 
                {
                    "Name": "ИМ",
                    "Audiences": [
                        {
                            "Name": "705" 
                        },
                        {
                            "Name": "705" 
                        },
                        {
                            "Name": "706" 
                        },
                        {
                            "Name": "707a" 
                        },
                        {
                            "Name": "708" 
                        },
                        {
                            "Name": "709" 
                        },
                        {
                            "Name": "501" 
                        },
                        {
                            "Name": "507" 
                        },
                        {
                            "Name": "701" 
                        }
                    ]
                }
            ]
        }, 
        {
            "Name": "Юридический факультет БГУ",
            "Profiles": [
                {
                    "Name": "БИО",
                    "Audiences": [
                        {
                            "Name": "308" 
                        },
                        {
                            "Name": "308" 
                        },
                        {
                            "Name": "511" 
                        },
                        {
                            "Name": "214" 
                        },
                        {
                            "Name": "418" 
                        },
                        {
                            "Name": "309" 
                        },
                        {
                            "Name": "513" 
                        },
                        {
                            "Name": "610" 
                        },
                        {
                            "Name": "609" 
                        }
                    ]
                }
            ]
        }, 
        {
            "Name": "Факультет международных отношений БГУ",
            "Profiles": [
                {
                    "Name": "ИСТ",
                    "Audiences": [
                        {
                            "Name": "1202" 
                        },
                        {
                            "Name": "1202" 
                        },
                        {
                            "Name": "1201" 
                        },
                        {
                            "Name": "1301" 
                        },
                        {
                            "Name": "1302" 
                        }
                    ]
                }
            ]
        }
    ];
    var corpusSelector = document.getElementById("building");
    var profileSelector = document.getElementById("profile");
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
            fillSelector(profileSelector, selectedCorps.Profiles, "Все")
            profileSelector.dispatchEvent(new Event('change'))
        }
    );
    profileSelector.addEventListener(
        'change',
        event => 
        {
            var index = event.target.value;
            var audiences = [];
            if (index == Number.MAX_SAFE_INTEGER){
                for (item of selectedCorps.Profiles){
                    audiences = audiences.concat(item.Audiences);
                }
            } else{
                audiences = selectedCorps.Profiles[index].Audiences;
            }
            fillSelector(audienceSelector, audiences, "Все")
        }
    );
    
    var students = [
        {
            "FirstName": "Василий",
            "LastName": "Васильев",
            "MiddleName": "Васильевич",
            "Audience": "116",
            "Profile": "филологический",
            "Bel": false
        },
        {
            "FirstName": "Иван",
            "LastName": "Иванов",
            "MiddleName": "Иванович",
            "Audience": "433",
            "Profile": "математический",
            "Bel": true
        },
        {
            "FirstName": "Иван",
            "LastName": "Иванов",
            "MiddleName": "Петрович",
            "Audience": "43",
            "Profile": "математический",
            "Bel": true
        },
        {
            "FirstName": "Александр",
            "LastName": "Александров",
            "MiddleName": "Александрович",
            "Audience": "517",
            "Profile": "математический",
            "Bel": false
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
            if (attrs != dataset.attrs){
                asc = 1;
                shouldSwitch = true;
            }
            else{
                shouldSwitch = false;
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
                if (values[0] > values[1]){
                    return asc;
                }
                if (values[0] == values[1]){
                    return 0;
                }
                return -asc;
            }
        }

    function fillStudentsTable(){
        var body = document.createElement('tbody');
        for (index in students){
            var student = students[index];
            var row = document.createElement('tr');
            row.draggable = true;
            row.innerHTML = `<td>${++index}</td>
                            <td>${student.LastName + ' ' + student.FirstName + ' ' + student.MiddleName }</td>
                            <td>${student.Audience}</td>
                            <td>${student.Profile}</td>
                            <td>${student.Bel}</td>`
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
            option.text = data[index].Name;
            option.value = index;
            selector.add(option);
        }
    }
})();


