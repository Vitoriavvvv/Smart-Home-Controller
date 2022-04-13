// variáveis que guardam info para cancelar a alerta
var ret_timeout, ret_submit, ret_interval;

startAlert();

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