
/* Esta secção define as variáveis usadas para construir a interface */
/****************************************************************************/

// o tempo que a página de alerta permanece para ser atendida pelo utilizador
// Unidade: segundos
const stay_time = 5;

/****************************************************************************/

// criar um registo
var now = new Date();
const record = {treated: 0, date: now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear(),
                hour: now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(), local: "Varanda", how: "Não Atendida"
                };
record_list = localStorage.getItem("intruderRecords");

// guardá-lo no local storage
if (record_list == null) {
    localStorage.setItem("intruderRecords", JSON.stringify([record]));
} else {
    record_list = JSON.parse(record_list);
    record_list[record_list.length] = record;
    localStorage.setItem("intruderRecords", JSON.stringify(record_list));
}

// se a notificacão foi atendida, muda alguns dados no registo
function atendNotification(how) {
    record_list = JSON.parse(localStorage.getItem("intruderRecords"));
    record_list[record_list.length-1].treated = 1;
    record_list[record_list.length-1].how = how;
    localStorage.setItem("intruderRecords", JSON.stringify(record_list));
    window.history.back();
}

// se ninguém a atendeu, volta para a página anterior
setTimeout(function() {window.history.back();}, stay_time * 1000);