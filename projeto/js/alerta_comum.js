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
            if (limpeza_total[i] != null) {
                startNotifCleaningCurr(i);
            }
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
    for (var i = 0; i < limpeza.length; i++) {
        const index = i;
        const ret = setInterval(function() {
                var limpeza_total = JSON.parse(localStorage.getItem("limpeza"));
                if (--limpeza_total[index_cleaning][index].timeout == 0) {
                    stopTimeout(index_cleaning, index);
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
                    if (++numDlts[index_cleaning] == limpeza.length) {
                        limpeza_total[index_cleaning] = null;
                    }
                    localStorage.setItem("numDeletes", JSON.stringify(numDlts));
                }
                localStorage.setItem("limpeza", JSON.stringify(limpeza_total));
        }, 1000);
        rets_temp[i] = ret;
    }
    rets[index_cleaning] = rets_temp;
    localStorage.setItem("rets", JSON.stringify(rets));
}

function stopTimeout(index_cleaning, index) {
    var rets = JSON.parse(localStorage.getItem("rets"));
    clearInterval(rets[index_cleaning][index]);
}
    
setInterval(function () {
   var date = new Date();
   var top_bar = document.getElementById("top-bar");

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

   top_bar.innerHTML ="<span>" + day + "-" + month + "-" + date.getFullYear() + "</span>"
                + "<span>" + hour + ":" + minute + ":" + second + suffix + "</span>" 
                + '<span>80%</span><i class="fa-solid fa-battery-three-quarters"></i><i class="fa-solid fa-signal"></i>' + 
                '<i class="fa-solid fa-wifi"></i><i class="fa-solid fa-volume-high"></i>';
}, 1000);

constructBreadcrumb();

function constructBreadcrumb() {
    var title = document.getElementById("title");
    if (title != null) {
        title = title.innerHTML;
        var nav = document.getElementById("breadcrumb");
        nav.appendChild(constructLink("&nbsp&nbspMenu Principal&nbsp;&nbsp>&nbsp&nbsp;", "../index.html"));
    
        var trail = JSON.parse(localStorage.getItem("trail"));
        if (trail == null) {
            trail = [];
        }
        var removeFurther = false;
        for (var i = 0; i < trail.length;) {
            if (removeFurther) {
                trail.splice(i, 1);
            } else {
                if (trail[i].title == title) {
                    removeFurther = true;
                    nav.appendChild(constructLink(title, trail[i].link));
                } else {
                    nav.appendChild(constructLink(trail[i].title + "&nbsp;&nbsp>&nbsp&nbsp;" , trail[i].link));
                }
                i++;
            }
        }
        if (!removeFurther) {
            var url = document.URL.split("/");
            nav.appendChild(constructLink(title, url[url.length - 1]));
            trail[trail.length] = {title: title, link: url[url.length - 1]};
        }
        localStorage.setItem("trail", JSON.stringify(trail));
    } else {
        localStorage.setItem("trail", JSON.stringify([]));
    }
}

function constructLink (title, link) {
    var a = document.createElement("a");
    a.href = link;
    a.innerHTML = title;
    return a;
}