const itemName = getId(document.getElementById("title").innerHTML) + "ButtonRecords";
const buttonSwitchRecords = JSON.parse(localStorage.getItem(itemName));
const buttons = document.getElementsByClassName("onOffBox");

if (buttonSwitchRecords == null) {
    const records = [];
    for (var i = 0; i < buttons.length; i++) {
        records[i] = false;
    }
    localStorage.setItem(itemName, JSON.stringify(records));
} else {
    for (var i = 0; i < buttonSwitchRecords.length; i++) {
         if (buttonSwitchRecords[i] == true) {
             buttons[i].classList.add("on");
         }
    }
}

function switchOnOff(e, index) {
    records = JSON.parse(localStorage.getItem(itemName));
    if (e != null) {
        target_classList = e.target.classList;
    
        if (target_classList[0] == "onOffCircle") {
            target_classList = e.target.parentElement.classList;
        }
        e.preventDefault();
    }

    if (records[index] == false) {
        records[index] = true;
        localStorage.setItem(itemName, JSON.stringify(records));
        target_classList.add("on");
    } else {
        records[index] = false;
        localStorage.setItem(itemName, JSON.stringify(records));
        target_classList.remove("on");
    }
}

// construir um id sem espaços, substituindo por "_"
function getId(title) {
    var str = "";
    for (var i = 0; i < title.length; i++) {
        if (title[i] == " ") {
            str += "_";
        } else {
            str += title[i];
        }
    } 
    return str;
}