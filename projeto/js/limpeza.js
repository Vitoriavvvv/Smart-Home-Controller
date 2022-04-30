/* Esta secção define as variáveis usadas para construir a interface */
/****************************************************************************/

const categorias = [
    {categoria: "Casa de Banho", opcoes: ["Banheira", "Pia", "Sanita"], tempos: [4, 8, 6]},
    {categoria: "Cozinha", opcoes: ["Exaustor", "Fogão", "Forno", "Loiças", "Microondas"], tempos: [7, 4, 6, 6, 9]},
    {categoria: "General", opcoes: ["Carros", "Chão", "Janelas", "Roupas"], tempos: [5, 4, 8, 9]},
    {categoria: "Outros", opcoes: ["Piscina"], tempos: [10]},
]

/****************************************************************************/

var main = document.getElementsByClassName("scroll")[0];
for (var i = 0; i < categorias.length; i++) {
    var categoria = categorias[i];
    var titulo = document.createElement("div");
    titulo.innerHTML = categoria.categoria;
    main.appendChild(titulo);
    var form = document.createElement("form");
    for (var j = 0; j < categoria.opcoes.length; j++) {
        var label = document.createElement("label");
        var checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        label.appendChild(checkBox);
        var div = document.createElement("div");
        div.appendChild(document.createTextNode(categoria.opcoes[j]));
        label.appendChild(div);
        form.appendChild(label);
    }
    main.appendChild(form);
}
const checkBoxes = document.getElementsByTagName("input");
const limpeza_total = JSON.parse(localStorage.getItem("limpeza"));
if (limpeza_total == null) {
    localStorage.setItem("limpeza", JSON.stringify([]));
} else {
    for (var i = 0; i < limpeza_total.length; i++) {
        if (limpeza_total[i] != null) {
            for (var j = 0; j < limpeza_total[i].length; j++) {
                if (limpeza_total[i][j].timeout > 0) {
                    checkBoxes[limpeza_total[i][j].index].setAttribute("disabled", "disabled");
                    document.getElementById("consult").style.display = "block";
                }
            }
        }
    }
}

function startCleaning () {
    var options = document.querySelectorAll("input:checked");
    if (options.length == 0) {
        alert("Ainda não escolheu nada para limpar.");
    } else {
        var limpeza_total = JSON.parse(localStorage.getItem("limpeza"));
        var numNull = 0;
        for (; numNull < limpeza_total.length; numNull++) {
            if (limpeza_total[numNull] != null) {
                break;
            }
        }
        if (numNull == limpeza_total) {
            limpeza_total = [];
            localStorage.removeItem("numDeletes");
            localStorage.removeItem("rets");
        }
        alert("Começa a limpeza...");
        var limpeza = [];
        var itemIndex = 0;
        var i = 0; // curr option index
        for (var j = 0; j < categorias.length; j++) {
            if (options[i].parentElement.parentElement.previousSibling.innerHTML == categorias[j].categoria) {
                for (var z = 0; z < categorias[j].opcoes.length; z++) {
                    if (categorias[j].opcoes[z] == options[i].nextSibling.innerHTML) {
                        options[i].checked = false;
                        options[i].setAttribute("disabled", "disabled");
                        i++;
                        limpeza[limpeza.length] = {name: categorias[j].opcoes[z], timeout: categorias[j].tempos[z], index: itemIndex};
                        if (i == options.length) {
                            break;
                        }
                    }
                    itemIndex++;
                }
                if (i == options.length) {
                    break;
                }
            } else {
                itemIndex += categorias[j].opcoes.length;
            }
        }
        limpeza_total[limpeza_total.length] = limpeza;
        localStorage.setItem("limpeza", JSON.stringify(limpeza_total));
        startNotifCleaningCurr(limpeza_total.length - 1);
        document.getElementById("consult").style.display = "block";
    }
}