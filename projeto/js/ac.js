var ac_temp = JSON.parse(localStorage.getItem("ac_temp"));
const onOffBox = document.getElementsByClassName("onOffBox");
const temps = document.getElementsByTagName("input");

for (var i = 0; i < temps.length; i++) {
    const index = i;
    temps[i].addEventListener("input", function () {
        saveTemperature(index);
    });
    onOffBox[i].addEventListener("click", function () {
        verifyValue(index);
    });
}

if (ac_temp == null) {
    ac_temp = [];
    for (var i = 0; i < temps.length; i++) {
        ac_temp[i] = null;
    }
    localStorage.setItem("ac_temp", JSON.stringify(ac_temp));
} else {
    for (var i = 0; i < temps.length; i++) {
        temps[i].value = ac_temp[i];
    }
}

function saveTemperature (index) {
    var ac_temp = JSON.parse(localStorage.getItem("ac_temp"));
    ac_temp[index] = document.getElementsByTagName("input")[index].value;
    localStorage.setItem("ac_temp", JSON.stringify(ac_temp));
}

function verifyValue (index) {
    var ac_temp = JSON.parse(localStorage.getItem("ac_temp"));
    if (ac_temp[index] == null) {
       alert("Temperatura não definida.");
       target_classList = document.getElementsByClassName("onOffBox")[index].classList;
       switchOnOff(null, index);
    } else if (ac_temp[index] > 40 || ac_temp[index] < -20) {
       alert("Temperatura inválida.\nA tempratura tem de estar entre -20 e 40 ºC.");
       target_classList = document.getElementsByClassName("onOffBox")[index].classList;
       switchOnOff(null, index);
    }
}