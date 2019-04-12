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
            "FirstName": "Петр",
            "LastName": "Иванов",
            "MiddleName": "Иванович",
            "Audience": "433",
            "Profile": "математический",
            "Bel": true
        },
        {
            "FirstName": "Александров",
            "LastName": "Александр",
            "MiddleName": "Александрович",
            "Audience": "517",
            "Profile": "математический",
            "Bel": false
        }
    ]
    var studentsTable = document.getElementById("students");
    var thName = document.getElementById("thName");
    var thAudience = document.getElementById("thAudience");
    var thProfile = document.getElementById("thProfile");
    var thBel = document.getElementById("thBel");
    fillStudentsTable();
    thName.addEventListener(
        'click',
        ()  => {
            sortTable(studentsTable, 1);
            appendArrow();
        }
    );
    thAudience.addEventListener(
        'click',
        ()  => {
            sortTable(studentsTable, 2);
            appendArrow();
        }
    );
    thProfile.addEventListener(
        'click',
        ()  => {
            sortTable(studentsTable, 3);
            appendArrow();
        }
    );
    thBel.addEventListener(
        'click',
        () => {
            sortTable(studentsTable, 4);
            appendArrow();
        }
    );

    function appendArrow(){
        var arrowUp = document.getElementsByClassName('arrow-up');
        var arrowDown= document.getElementsByClassName('arrow-down');
        for (item of arrowUp){
            item.removeAttribute('class');
        }
        for (item of arrowDown){
            item.removeAttribute('class');
        }

        var arrowStyle; 
        if (asc)
            arrowStyle = 'arrow-up';
        else
            arrowStyle = 'arrow-down';
        event.target.className = arrowStyle;
    }

    function sortTable(table, n) {
        var rows, canContinueSwitch, i, x, y, shouldSwitch, switchCount = 0;
        canContinueSwitch = true;
        asc = true; 
        while (canContinueSwitch) {
          canContinueSwitch = false;
          rows = table.rows;
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (asc) {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (!asc) {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            var rinum = rows[i].getElementsByTagName("TD")[0];
            var riinum = rows[i + 1].getElementsByTagName("TD")[0];
            var temp = rinum.innerHTML;
            rinum.innerHTML = riinum.innerHTML;
            riinum.innerHTML = temp;
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            canContinueSwitch = true;
            switchCount ++; 
          } else {
            if (switchCount == 0 && asc) {
              asc = false;
              canContinueSwitch = true;
            }
          }
        }
      }

    function fillStudentsTable(){
        var body = document.createElement('tbody');
        for (index in students){
            var row = document.createElement('tr');
            row.draggable = true;
            var col1 = document.createElement('td');
            var col2 = document.createElement('td');
            var col3 = document.createElement('td');
            var col4 = document.createElement('td');
            var col5 = document.createElement('td');
            var student = students[index];
            col2.appendChild(document.createTextNode(student.LastName + " " + student.FirstName + " " + student.MiddleName));
            col3.appendChild(document.createTextNode(student.Audience));
            col4.appendChild(document.createTextNode(student.Profile));
            col5.appendChild(document.createTextNode(student.Bel));
            col1.appendChild(document.createTextNode(++index));
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);
            body.appendChild(row);
        }
        studentsTable.replaceChild(body, studentsTable.tBodies[0])
    }

    function fillSelector(selector, data, first = null){
        for (index in selector.options){
            selector.options[index] = null;
        }

        if (first != null) {
            var option = new Option();
            option.text = first;
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


