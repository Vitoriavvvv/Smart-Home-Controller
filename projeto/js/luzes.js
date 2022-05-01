var lumin = JSON.parse(localStorage.getItem("lumin"));
const onOffBox = document.getElementsByClassName("onOffBox");
const lumins = document.getElementsByTagName("input");

for (var i = 0; i < lumins.length; i++) {
    const index = i;
    lumins[i].addEventListener("input", function () {
        if (lumins[index].value > 100 || lumins[index].value < 0) {
            alert("Luminosidade inválida.\nA Luminosidade tem de estar entre 0% e 100%.");
            if (onOffBox[index].classList.contains("on")) {
                switchOnOff(null, index);
                var lumin = JSON.parse(localStorage.getItem("lumin"));
                lumin[index] = null;
                localStorage.setItem("lumin", JSON.stringify(lumin));
            }
         }
    });
    onOffBox[i].addEventListener("click", function () {
        verifyValue(index);
    });
}

if (lumin == null) {
    lumin = [];
    for (var i = 0; i < lumins.length; i++) {
        lumin[i] = null;
    }
    localStorage.setItem("lumin", JSON.stringify(lumin));
} else {
    for (var i = 0; i < lumins.length; i++) {
        lumins[i].value = lumin[i];
    }
}

function saveLuminosity (index) {
    var lumin = JSON.parse(localStorage.getItem("lumin"));
    lumin[index] = document.getElementsByTagName("input")[index].value;
    localStorage.setItem("lumin", JSON.stringify(lumin));
}

function verifyValue (index) {
    var lumin = document.getElementsByTagName("input");
    if (lumin[index].value == "") {
       alert("Luminosidade não definida.");
       switchOnOff(null, index);
    } else if (lumin[index].value > 100 || lumin[index].value < 0) {
       alert("Luminosidade inválida.\nA Luminosidade tem de estar entre 0% e 100%.");
       switchOnOff(null, index);
    } else {
        saveLuminosity(index);
    }
}