// variáveis que guardam info para cancelar a alerta
var ret_timeout, ret_submit, ret_interval;

startAlert();
startNotifCleaning();

// ativar a alerta se a notificação de intruso não estiver desligada
// para desligá-la, ir à interface "html/lista_notificacoes.html -> emergência"
// e desliga o butão "Intruso"
function startAlert() {
    if (localStorage.getItem("Intruso") == 1) {
        var timeout = localStorage.getItem("intruder_timeout");
        ret_timeout = setTimeout(function() {
            document.activateAlert.submit();
        }, timeout * 1000);
        
        const interval = localStorage.getItem("interval");
        ret_submit = setInterval(function() { 
           document.activateAlert.submit();
        }, interval * 1000);
    
        ret_interval = setInterval(function() { 
            timeout = localStorage.getItem("intruder_timeout");
            if (timeout - 1 == 0) {
                localStorage.setItem("intruder_timeout", interval);
            } else {
                localStorage.setItem("intruder_timeout", timeout - 1);
            }
        }, 1000);
    }
}

function startNotifCleaning() {
    var limpeza_total = JSON.parse(localStorage.getItem("limpeza"));
    if (limpeza_total != null) {
        for (var i = 0; i < limpeza_total.length; i++) {
            startNotifCleaningCurr(i);
        }
    }
}

function startNotifCleaningCurr (index_cleaning) {
    // init numDeletes
    var numDeletes = JSON.parse(localStorage.getItem("numDeletes"));
    if (numDeletes == null) {
        numDeletes = [];
    }
    
    if (numDeletes[index_cleaning] == null) {
        numDeletes[index_cleaning] = 0;
        localStorage.setItem("numDeletes", JSON.stringify(numDeletes));
    }
    // init rets
    var rets = JSON.parse(localStorage.getItem("rets"));
    if (rets == null) {
        rets = [];
    }
    var rets_temp = [];
    
    var limpeza = JSON.parse(localStorage.getItem("limpeza"))[index_cleaning];
    if (limpeza != null) {
        for (var i = 0; i < limpeza.length; i++) {
            const index = i;
            const ret = setInterval(function() {
                    var limpeza_total = JSON.parse(localStorage.getItem("limpeza"));
                    var limpeza = limpeza_total[index_cleaning];
                    if (--limpeza[index].timeout == 0) {
                        const splits = document.URL.split("/");
                        if (splits[splits.length - 1] == "limpeza.html") {
                            document.getElementsByTagName("input")[limpeza[index].index].removeAttribute("disabled");
                            if (document.querySelectorAll("input[disabled=disabled]").length == 0) {
                                document.getElementById("consult").style.display = "none";
                            }
                        }
                        if (splits[splits.length - 1] != "processos.html") {
                            alert("Concluiu a limpeza de " + limpeza[index].name + ".");
                        }
                        var numDlts = JSON.parse(localStorage.getItem("numDeletes"));
                        numDlts[index_cleaning]++;
                        localStorage.setItem("numDeletes", JSON.stringify(numDlts));
                        if (numDlts[index_cleaning] == limpeza.length) {
                            limpeza_total[index_cleaning] = null;
                            stopTimeout(index_cleaning);
                        }
                    } else {
                        limpeza_total[limpeza_total.length - 1] = limpeza;
                    }
                    localStorage.setItem("limpeza", JSON.stringify(limpeza_total));
            }, 1000);
            rets_temp[i] = ret;
        }
        rets[index_cleaning] = rets_temp;
        localStorage.setItem("rets", JSON.stringify(rets));
    }
}

function stopTimeout(index_cleaning) {
    var rets = JSON.parse(localStorage.getItem("rets"));
    for (var i = 0; i < rets[index_cleaning].length; i++) {
        clearInterval(rets[index_cleaning][i]);
    }
}
    
setInterval(function () {
   var date = new Date();
   var top_bar = document.getElementById("top-bar");

   var day = date.getDay();
   if (day < 10) { day = "0" + day;}
   var month = date.getMonth();
   if (month < 10) { month = "0" + month;}
   var hour = date.getHours();
   if (hour < 10) { hour = "0" + hour;}
   var minute = date.getMinutes();
   if (minute < 10) { minute = "0" + minute;}
   var second = date.getSeconds();
   if (second < 10) { second = "0" + second;}
   var suffix = hour < 12 ? "AM" : "PM";

   top_bar.innerHTML ="<span>" + day + "-" + month + "-" + date.getFullYear() + "</span>"
                + "<span>" + hour + ":" + minute + ":" + second + " " + suffix + "</span>" 
                + '<span>80%</span><i class="fa-solid fa-battery-three-quarters"></i><i class="fa-solid fa-signal"></i>' + 
                '<i class="fa-solid fa-wifi"></i><i class="fa-solid fa-volume-high"></i>';
}, 1000);