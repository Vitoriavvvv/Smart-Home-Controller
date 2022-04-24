constructListNotifs();
// construir a lista de notificações de intruso a partir dos registos guardados no local storage
function constructListNotifs() {
    const intrude_records = JSON.parse(localStorage.getItem("intruderRecords"));
    if (intrude_records != null) {
        table_list = document.getElementById("intrude-list-wrapper");
        table_list.innerHTML = "";
        for (var i = intrude_records.length - 1; i >= 0 ; i--) {
            const currRecord = intrude_records[i];
            table = document.createElement("table");
            table.classList.add("box");
            table.classList.add("intrude-item");
            if (currRecord.treated == 1) {
                content = "<tr><th colspan='2' class='treated'>" + 
                "<i class='fa-regular fa-circle-check'></i>";
            } else {
                content = "<tr><th colspan='2' class='untreated'>" + 
                "<i class='fa-regular fa-circle-xmark'></i>" 
            }
            const index = i;
            content += currRecord.how + "</th><th><div class='dlt-wrapper' onclick='dltNotif(" + index + ")'>" + 
                       "<i class='fa-solid fa-xmark dlt'></i></div></th></tr><tr><td>Data:</td><td>" + 
                       currRecord.date + "</td><tr><td>Hora:</td><td>" + 
                       currRecord.hour + "</td></tr><tr><td>Localização:</td><td>" +
                       currRecord.local + "</td></tr></table>";
            table.innerHTML = content;
            table_list.appendChild(table);
        }
    }
}

function deleteNotifs () {
    if (localStorage.getItem("intruderRecords") == null) {
        alert("Não há notificações para remover.");
    } else {
        if (confirm("Quer remover todas as notificações de intruso?") == true) {
            localStorage.removeItem("intruderRecords");
            table_list.innerHTML = "";
        }
    }
}

function dltNotif (index) {
    if (confirm("Tem a certeza que quer remover esta notificação?") == true) {
        const intrude_records = JSON.parse(localStorage.getItem("intruderRecords"));
        var records = [];
        var j = 0;
        for (var i = 0; i < intrude_records.length; i++) {
            if (i != index) {
                records[j] = intrude_records[i];
                j++;
            }
        }
        localStorage.setItem("intruderRecords", JSON.stringify(records));
        constructListNotifs();
    }
}