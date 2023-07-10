
/* Esta secção define as variáveis usadas para construir a interface */
/****************************************************************************/

// o tempo que a página de alerta permanece para ser atendida pelo utilizador
// Unidade: segundos
const stay_time = 5;

/****************************************************************************/

// criar um registo
var date = new Date();
var day = date.getDay() + 1;
if (day < 10) { day = "0" + day;}
var month = date.getMonth() + 1;
if (month < 10) { month = "0" + month;}
var hour = date.getHours();
if (hour < 10) { hour = "0" + hour;}
var minute = date.getMinutes();
if (minute < 10) { minute = "0" + minute;}
var second = date.getSeconds();
if (second < 10) { second = "0" + second;}
var suffix = hour < 12 ? " AM" : " PM";

const record = {treated: 0, date: day + "-" + month + "-" + date.getFullYear(),
                hour: hour + ":" + minute + ":" + second + suffix, local: "Varanda", how: "Não Atendida"
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