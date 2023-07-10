var ac_temp = JSON.parse(localStorage.getItem("ac_temp"));
const onOffBox = document.getElementsByClassName("onOffBox");
const temps = document.getElementsByTagName("input");

for (var i = 0; i < temps.length; i++) {
    const index = i;
    temps[i].addEventListener("input", function () {
        var ac_temp = JSON.parse(localStorage.getItem("ac_temp"));
        if (temps[index].value == "" || temps[index].value > 40 || temps[index].value < -20) {
            if (temps[index].value != "") {
                alert("Temperatura inválida.\nA tempratura tem de estar entre -20ºC e 40ºC.");
            }
            if (onOffBox[index].classList.contains("on")) {
                onOffBox[index].classList.remove("on");
            }
            ac_temp[index].value = null;
            ac_temp[index].on = false;
        } else {
            ac_temp[index].value = temps[index].value;
        }
        localStorage.setItem("ac_temp", JSON.stringify(ac_temp));
    });
    onOffBox[i].addEventListener("click", function () {
        verifyValue(index);
    });
}

if (ac_temp == null) {
    ac_temp = [];
    for (var i = 0; i < temps.length; i++) {
        ac_temp[i] = {value: null, on: false};
    }
    localStorage.setItem("ac_temp", JSON.stringify(ac_temp));
} else {
    for (var i = 0; i < temps.length; i++) {
        temps[i].value = ac_temp[i].value;
        if (ac_temp[i].on) {
            onOffBox[i].classList.add("on");
        }
    }
}

function verifyValue (index) {
    var ac_temp = document.getElementsByTagName("input");
    if (ac_temp[index].value == "") {
       alert("Temperatura não definida.");
       switchOnOff(null, index);
    } else if (ac_temp[index].value > 40 || ac_temp[index].value < -20) {
       alert("Temperatura inválida.\nA tempratura tem de estar entre -20ºC e 40ºC.");
       switchOnOff(null, index);
    } else {
       var temps = JSON.parse(localStorage.getItem("ac_temp"));
       var onOffBox = document.getElementsByClassName("onOffBox");
       if (temps[index].on) {
           onOffBox[index].classList.remove("on");
           temps[index].on = false;
       } else {
           onOffBox[index].classList.add("on");
           temps[index].on = true;
       }
       localStorage.setItem("ac_temp", JSON.stringify(temps));
    }
}