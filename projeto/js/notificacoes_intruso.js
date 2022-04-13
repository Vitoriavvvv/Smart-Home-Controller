table_list = document.getElementById("intrude-list-wrapper");
const intrude_records = JSON.parse(localStorage.getItem("intruderRecords"));

// construir a lista de notificações de intruso a partir dos registos guardados no local storage
if (intrude_records != null) {
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
        content += currRecord.how + "</th></tr><tr><td>Data:</td><td>" + 
                   currRecord.date + "</td><tr><td>Hora:</td><td>" + 
                   currRecord.hour + "</td></tr><tr><td>Localização:</td><td>" +
                   currRecord.local + "</td></tr></table>";
        table.innerHTML = content;
        table_list.appendChild(table);
    }
}