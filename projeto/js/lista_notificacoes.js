/* Esta secção define as variáveis usadas para construir a interface */
/****************************************************************************/

// definir o tempo de intervalo para alerta de intruso
// unidade: segundos
const intervalSeconds = 2;


// Pode adicionar mais categorias aqui conforme o formato apresentado abaixo
// os nomes das subcategorias não podem ser iguais
const categories_list = [
        {name: "Fuga de Gás", link: "#", icon: '<i class="fa-solid fa-skull-crossbones"></i>'},
        {name: "Incêndio", link: "#", icon: '<i class="fa-solid fa-fire"></i>'},
        {name: "Intruso", link: "notificacoes_intruso.html", icon: '<i class="fa-solid fa-user-large-slash"></i>'}
];

/****************************************************************************/

// construir a lista de notificações
if (categories_list != null) {
    lista = document.getElementById("lista-notificacoes");
    for (var i = 0; i < categories_list.length; i++) {
        const category = createCategory(categories_list[i].name, categories_list[i].icon);
        lista.appendChild(category);

        var a = document.createElement("a");
        a.href = categories_list[i].link;
        var li = document.createElement("li");
        li.innerHTML = "Ver o histórico";
        a.appendChild(li);
        lista.appendChild(a);
    }
}

function createCategory(title, icon) {
    const category = document.createElement("li");
    category.setAttribute("id", getId(title));
    
    span = document.createElement("span");
    span.innerHTML = icon + title;
    
    onoffCircle = document.createElement("div");
    onoffCircle.classList.add("onOffCircle");

    onOffBox = document.createElement("div");
    onOffBox.classList.add("onOffBox");
    onOffBox.addEventListener("click", function() {switchOnOff(event, title);});

    category.appendChild(span);
    category.appendChild(document.createTextNode("off"));
    onOffBox.appendChild(onoffCircle);
    category.appendChild(onOffBox);
    category.appendChild(document.createTextNode("on"));

    return category;
}

// activar ou desativar as alertas de notificação
function switchOnOff (e, title) {
    isActive = localStorage.getItem(title);
    target_classList = e.target.classList;

    if (target_classList[0] == "onOffCircle") {
        target_classList = e.target.parentElement.classList;
    }

    if (isActive == null) {
        localStorage.setItem(title, 1);
        target_classList.add("on");
        enableAlert(title);
    } else {
        if (isActive == 1) {
            localStorage.setItem(title, 0);
            target_classList.remove("on");
            disableAlert(title);
        } else {
            localStorage.setItem(title, 1);
            target_classList.add("on");
            enableAlert(title);
        }
    }
    e.preventDefault();
}

// restaurar as definições anteriores
for (var i = 0; i < categories_list.length; i++) {
    const category = categories_list[i].name;

    if (localStorage.getItem(category) == 1) {
        document.getElementById(getId(category)).
                    getElementsByClassName("onOffBox")[0].
                    classList.add("on");
    }
}

// construir um id sem espaços, substituindo por "_"
function getId(category_name) {
    var str = "";
    for (var i = 0; i < category_name.length; i++) {
        if (category_name[i] == " ") {
            str += "_";
        } else {
            str += category_name[i];
        }
    } 
    return str;
}

// função incompleta, só para ativar "Intruso"
function enableAlert(title) {
    if (title == "Intruso") {
        localStorage.setItem("interval", intervalSeconds);
        localStorage.setItem("intruder_timeout", intervalSeconds);
        startAlert();
    }
}

// função incompleta, só para desativar "Intruso"
function disableAlert(title) {
    if (title == "Intruso") {
        clearTimeout(ret_timeout);
        clearInterval(ret_submit);
        clearInterval(ret_interval);
    }
}


