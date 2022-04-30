var rets = localStorage.getItem("rets_processes");
if (rets != null) {
    for (var i = 0; i < rets.length; i++) {
        clearInterval(rets[i]);
    }
}
localStorage.setItem("rets_processes", JSON.stringify([])); 

var limpeza_total = JSON.parse(localStorage.getItem("limpeza"));

for (var i = 0; i < limpeza_total.length; i++) {
    if (limpeza_total[i] != null) {
        for (var j = 0; j < limpeza_total[i].length; j++) {
            if (limpeza_total[i][j].timeout > 0) {
                constructBar(limpeza_total[i][j].name, limpeza_total[i][j].timeout);
            }
        }
    }
}

function constructBar (name, timeout) {
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = timeout;
    span.classList.add("timeLeft");
    p.appendChild(document.createTextNode(name + " | Tempo: "));
    p.appendChild(span);
    p.appendChild(document.createTextNode(" s"));
    var processoBar = document.createElement("div");
    processoBar.classList.add("process-bar");
    var insideBar = document.createElement("div");
    insideBar.classList.add("inside-bar");
    insideBar.style.animation = "process 1 " + timeout + "s forwards";
    processoBar.appendChild(insideBar);

    var scroll = document.getElementsByClassName("scroll")[0];
    scroll.appendChild(p);
    scroll.appendChild(processoBar);

    var rets = JSON.parse(localStorage.getItem("rets_processes"));
    const index = rets.length;
    const ret = setInterval(function() {
       var time = document.getElementsByClassName("timeLeft")[index];
       time.innerHTML = parseInt(time.innerHTML, 10) - 1;
       if (time.innerHTML == "0") {
           clearInterval(localStorage.getItem("rets_processes" + index));
           var p = document.getElementsByTagName("p")[index];
           p.innerHTML = name + " | Concluída<span class='timeLeft' style='display:none;'>0</span>";
           p.nextSibling.childNodes[0].style.backgroundColor = "green";
           alert("Conluiu a limpeza de " + name + ".");
       }
    }, 1000);
    rets[index] = ret;
    localStorage.setItem("rets_processes", JSON.stringify(rets));
}