/* Esta secção define as variáveis usadas para construir a interface */
/****************************************************************************/

// número de blocos por página 
// não pode ser alterado se não fizer alterações no index.html
const item_count_per_page = 5;

// adicionar ou alterar os dados à vontade conforme o formato apresentado abaixo
// sem precisar fazer alterações no index.html
// o length de option_list têm de ser o múltiplo de item_count_per_page
const option_list = [
    {icon_class: "fa-solid fa-house", title: "Estados da Casa", link: "html/estado.html"},
    {icon_class: "fa-solid fa-broom", title: "Limpeza de Casa", link: "html/limpeza.html"},
    {icon_class: "fa-solid fa-list", title: "Funcionalidades", link: "html/Funcionalidades.html"},
    {icon_class: "fa-solid fa-bell", title: "Alertas e Notificações", link: "html/lista_notificacoes.html"},
    {icon_class: "fa-solid fa-gear", title: "Configurações", link: "html/configuracoes.html"},
];

/****************************************************************************/

// construir os pontos no footer de maneira dinâmica
if (option_list.length > item_count_per_page) {
    for (i = 0; i < option_list.length/item_count_per_page; i++) {
        // construir um ponto
        point = document.createElement("div");
        point.classList.add("point");
        const indexPage = i;
        point.addEventListener("click", function() {changePage(indexPage);});
        document.getElementById("points").appendChild(point);
    }
    document.querySelector(".point").classList.add("active");
    changePage(0);
}


function changePage(indexPage) {
    box_list = document.getElementsByClassName("menu-box");

    for (i = 0; i < item_count_per_page; i++) {
        index = indexPage * item_count_per_page + i;
        // atualizar os ícones e os títulos nos blocos
        box_list[i].innerHTML = "<i class='" + option_list[index].icon_class + 
                                " menu-icon'></i>" + option_list[index].title;
        // atualizar os links 
        box_list[i].parentElement.href = option_list[index].link;
    }
    
    document.getElementsByClassName("active")[0].classList.remove("active");
    document.getElementsByClassName("point")[indexPage].classList.add("active");
}

if (localStorage.getItem("firstTime") == 'false') {
    showMenu();
}

function showMenuFirst () {
    document.getElementById("weather-wrapper").style.display = "none";
    document.getElementsByTagName("header")[0].style.animation = "show 1s 1 forwards";
    document.getElementsByTagName("main")[0].style.animation = "goUp 1s 1 forwards";
    document.getElementsByClassName("down")[0].style.display = "none";
    localStorage.setItem("firstTime", false);
}

function showMenu () {
    document.getElementById("weather-wrapper").style.display = "none";
    document.getElementsByClassName("down")[0].style.display = "none";
    document.getElementsByTagName("header")[0].style.opacity = 1;
    var main = document.getElementsByTagName("main")[0];
    main.style.opacity = 1;
    main.style.marginTop = '15px';
}