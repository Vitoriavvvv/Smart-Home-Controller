const addHours = document.getElementsByClassName("addHour");
const HORARIOS = "horarios";

for (var i = 0; i < addHours.length; i++) {
    const index = i;
    addHours[i].addEventListener("click", function() {
       addHour(index, true);
    });
}

const horarios = JSON.parse(localStorage.getItem(HORARIOS));

if (horarios == null) {
    localStorage.setItem(HORARIOS, JSON.stringify([]));
} else {
    for (var i = 0; i < horarios.length; i++) {
        const sublist = horarios[i];
        for (var j = 0; j < sublist.length; j++) {
            addHour(i, false);
            const inputs = document.getElementsByTagName("input");
            inputs[inputs.length - 1].value = horarios[i][j];
        }
    }
}

function addHour(list_index, b) {
    var hideList = document.getElementsByClassName("hide-list")[list_index];
    const item_index = hideList.getElementsByTagName("input").length;
    var newHour = document.createElement("li");
    newHour.innerHTML = "<form class='horário' action='#'><label for=''>Horário" + 
    ": </label><input type='time'><span>off<div class='onOffBox' onclick='switchOnOff2(" + 
    list_index + "," + item_index + ")'><div class='onOffCircle'></div></div>on</span></form>";
    hideList.appendChild(newHour);
    
    var input = hideList.getElementsByTagName("input")[item_index];
    var onOffBox = hideList.getElementsByClassName("onOffBox")[item_index];
    input.addEventListener("input", function () {
        saveTime(list_index, item_index);
    });
    onOffBox.addEventListener("click", function () {
        verifyValue(list_index, item_index);
    });

    var newRemove = document.createElement("li");
    newRemove.classList.add("removeHour");
    newRemove.innerHTML = "Remove Horário";
    newRemove.addEventListener("click", function () {
        removeHour(list_index, item_index);
    });
    hideList.appendChild(newRemove);

    var horarios = JSON.parse(localStorage.getItem(HORARIOS));
    if (horarios[list_index] == null) {
        horarios[list_index] = [];
    }
    if (horarios[list_index][item_index] == null) {
        horarios[list_index][item_index] = null;
    }
    localStorage.setItem(HORARIOS, JSON.stringify(horarios));

    if (b == true) {
        var buttonSwitchRecords = JSON.parse(localStorage.getItem(itemName));
        buttonSwitchRecords.splice(getIndexInTotal(list_index, item_index), 0, false);
        localStorage.setItem(itemName, JSON.stringify(buttonSwitchRecords));
    }
}

function saveTime(list_index, item_index) {
    var horarios = JSON.parse(localStorage.getItem(HORARIOS));
    horarios[list_index][item_index] = document.getElementsByClassName("hide-list")[list_index].
                                       getElementsByTagName("input")[item_index].value;
    localStorage.setItem(HORARIOS, JSON.stringify(horarios));
}

function verifyValue(list_index, item_index) {
    var horarios = JSON.parse(localStorage.getItem(HORARIOS));
    if (horarios[list_index][item_index] == null) {
        alert("Horário não definido.");
        switchOnOff2(list_index, item_index);
    }
}

function removeHour(list_index, item_index) {
    if (confirm("Tem a certeza que quer remover este horário de rega automática?") == true) {
        // atualizar dados no local storage
        var horarios = JSON.parse(localStorage.getItem(HORARIOS));
        horarios[list_index].splice(item_index, 1);
        localStorage.setItem(HORARIOS, JSON.stringify(horarios));
    
        // remover a horário da hide-list
        document.getElementsByClassName("hide-list")[list_index].
        getElementsByTagName("input")[item_index].parentElement.parentElement.remove();
        document.getElementsByClassName("hide-list")[list_index].
        getElementsByClassName("removeHour")[item_index].remove();

        // atualizar buttonSwitchRecords
        var buttonSwitchRecords = JSON.parse(localStorage.getItem(itemName));
        buttonSwitchRecords.splice(getIndexInTotal(list_index, item_index), 1);
        localStorage.setItem(itemName, JSON.stringify(buttonSwitchRecords));
    }
}

function getIndexInTotal (list_index, item_index) {
    var num = 0;
    for (var i = 0; i < list_index; i++) {
        num += document.getElementsByClassName("hide-list")[i].getElementsByTagName("input").length;
    }
    return num + item_index;
} 

function switchOnOff2(list_index, item_index) {
    var records = JSON.parse(localStorage.getItem(itemName));
    const index = getIndexInTotal(list_index, item_index);
    var target_classList = document.getElementsByClassName("hide-list")[list_index].
                           getElementsByClassName("onOffBox")[item_index].classList;
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