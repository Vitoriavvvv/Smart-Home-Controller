/* Esta secção define as variáveis usadas para construir a interface */
/****************************************************************************/

// definir o tempo de intervalo para alerta de intruso
// unidade: segundos
const intervalSeconds = 2;


// Pode adicionar mais categorias aqui conforme o formato apresentado abaixo
// os nomes das subcategorias não podem ser iguais
const categories_list = [
    {category: "Emergência", sub_list: [
        {sub_category: "Intruso", sub_category_link: "notificacoes_intruso.html"},
        {sub_category: "Incêndio", sub_category_link: "#"},
        {sub_category: "Fuga de Gás", sub_category_link: "#"}
    ]},
    {category: "#", sub_list: [
        {sub_category: "#1", sub_category_link: "#"},
        {sub_category: "#2", sub_category_link: "#"}
    ]},
    {category: "#", sub_list: [
        {sub_category: "#3", sub_category_link: "#"},
        {sub_category: "#4", sub_category_link: "#"}
    ]}
];

/****************************************************************************/

// construir a lista de notificações
if (categories_list != null) {
    lista = document.getElementById("lista-notificacoes");
    for (var i = 0; i < categories_list.length; i++) {
        const category = createCategory(categories_list[i].category);
        lista.appendChild(category);

        const hiddenList = document.createElement("ul");
        hiddenList.classList.add("hidden-list");
        hiddenList.classList.add("box");
        const sublist = categories_list[i].sub_list;
        for (var j = 0; j < sublist.length; j++) {
            sub_category = createSubCategory(sublist[j].sub_category_link, 
                                             sublist[j].sub_category);
            hiddenList.appendChild(sub_category);
        }
        lista.appendChild(hiddenList);
    }
}

function createCategory(title) {
    const category_link = document.createElement("a");
    category_link.href = "#";
    const category = document.createElement("li");
    category.innerHTML = title;
    category_link.appendChild(category);
    return category_link;
}

function createSubCategory(link, title) {
    const category_link = document.createElement("a");
    category_link.href = link;
    const category = document.createElement("li");
    category.setAttribute("id", getId(title));

    span = document.createElement("span");
    span.innerHTML = title;
    
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
    category_link.appendChild(category);

    return category_link;
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
        enableAlert();
    } else {
        if (isActive == 1) {
            localStorage.setItem(title, 0);
            target_classList.remove("on");
            target_classList.add("off");
            disableAlert();
        } else {
            localStorage.setItem(title, 1);
            target_classList.remove("off");
            target_classList.add("on");
            enableAlert();
        }
    }
    e.preventDefault();
}

// restaurar as definições anteriores
for (var i = 0; i < categories_list.length; i++) {
    const subList = categories_list[i].sub_list;
    for (var j = 0; j < subList.length; j++) {
        const category = subList[j].sub_category;

        if (localStorage.getItem(category) == 1) {
            document.getElementById(getId(category)).
                     getElementsByClassName("onOffBox")[0].
                     classList.add("on");
        }
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

function enableAlert() {
    localStorage.setItem("interval", intervalSeconds);
    localStorage.setItem("intruder_timeout", intervalSeconds);
    startAlert();
}

function disableAlert() {
    clearTimeout(ret_timeout);
    clearInterval(ret_submit);
    clearInterval(ret_interval);
}


