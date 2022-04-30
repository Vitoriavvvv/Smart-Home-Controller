const HORARIOS = "horarios";
const horarios = JSON.parse(localStorage.getItem(HORARIOS));
const addHours = document.getElementsByClassName("addHour");

for (var i = 0; i < addHours.length; i++) {
    const index = i;
    addHours[i].addEventListener("click", function() {
       addHour(index);
    });
    if (horarios == null || horarios[i].length == 0) {
        addNoHourInfo(i);
    }
}

if (horarios == null) {
    localStorage.setItem(HORARIOS, JSON.stringify([]));
} else {
    for (var i = 0; i < horarios.length; i++) {
        const sublist = horarios[i];
        for (var j = 0; j < sublist.length; j++) {
            addHour(i);
            const inputs = document.getElementsByTagName("input");
            inputs[inputs.length - 1].value = horarios[i][j];
        }
    }
}

function addNoHourInfo (list_index) {
    var hideList = document.getElementsByClassName("hide-list")[list_index];
    var item = document.createElement("li");
    item.classList.add("noHourInfo");
    item.innerHTML = "Não tem horário definido.";
    hideList.appendChild(item);
}

function addHour(list_index) {
    var hideList = document.getElementsByClassName("hide-list")[list_index];
    const item_index = hideList.getElementsByTagName("input").length;
    if (hideList.getElementsByTagName("li").length == 1 && item_index == 0) {
        hideList.innerHTML = "";
    }
    var newHour = document.createElement("li");
    newHour.innerHTML = "<form class='horário'><label>Horário: </label>" + 
    "<input type='time'><a><span><i class='fa-solid fa-trash-can delete'></i>Remover</span></a></form>";
    hideList.appendChild(newHour);
    
    var input = hideList.getElementsByTagName("input")[item_index];
    input.addEventListener("input", function () {
        saveTime(list_index, item_index);
    });

    var remove = hideList.getElementsByTagName("a")[item_index];
    remove.addEventListener("click", function () {
        removeHour(list_index, item_index);
    });

    var horarios = JSON.parse(localStorage.getItem(HORARIOS));
    if (horarios[list_index] == null) {
        horarios[list_index] = [];
    }
    if (horarios[list_index][item_index] == null) {
        horarios[list_index][item_index] = null;
    }
    localStorage.setItem(HORARIOS, JSON.stringify(horarios));
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
        return false;
    }
    return true;
}

function removeHour(list_index, item_index) {
    if (confirm("Tem a certeza que quer remover este horário de rega automática?") == true) {
        // atualizar dados no local storage
        var horarios = JSON.parse(localStorage.getItem(HORARIOS));
        horarios[list_index].splice(item_index, 1);
        localStorage.setItem(HORARIOS, JSON.stringify(horarios));
    
        // remover o horário da hide-list
        var hideList = document.getElementsByClassName("hide-list")[list_index];
        var items = hideList.getElementsByTagName("input");
        items[item_index].parentElement.parentElement.remove();
        if (horarios[list_index].length == 0) {
            addNoHourInfo(list_index);
        }

        // atualizar event listeners
        for (var i = 0; i < items.length; i++) {
            var input = items[i];
            var remove = hideList.getElementsByTagName("a")[i];
            const index = i;
            replaceEventListener(input, "input", function () {
                saveTime(list_index, index); 
            });
            replaceEventListener(remove, "click", function () {
                removeHour(list_index, index); 
            });
        }
    }
}

function replaceEventListener(oldElement, type, func) {
    var newElement = oldElement.cloneNode(true);
    newElement.addEventListener(type, func);
    oldElement.parentElement.replaceChild(newElement, oldElement);
}