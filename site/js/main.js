(function(){
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

    fillSelector(corpusSelector, data, "");
    corpusSelector.addEventListener(
        'change',
        event => 
        {
            if (corpusSelector.options[0].text == ""){
                corpusSelector.options[0] = null;
            }
            
            fillSelector(profileSelector, data[event.target.value].Profiles, "Все")
            profileSelector.dispatchEvent(new Event('change'))
        }
    );
    profileSelector.addEventListener(
        'change',
        event => 
        {
            var corpsIndex = corpusSelector.selectedIndex;
            var index = event.target.value;
            if (index == Number.MAX_SAFE_INTEGER){
                var audiences = [];
                for (item of data[corpsIndex].Profiles){
                    audiences = audiences.concat(item.Audiences);
                }
                fillSelector(audienceSelector, audiences, "Все")
            } else{
                fillSelector(audienceSelector, data[corpsIndex].Profiles[index].Audiences, "Все")
            }
        }
    );
    
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
