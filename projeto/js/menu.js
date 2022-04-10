const item_count_per_page = 3;
// os lengths de todas as listas abaixo têm de ser o múltiplo de item_count_per_page
const icon_class_list = ["fa-solid fa-house", "fa-solid fa-list", "fa-solid fa-bell", "#", "#", "#"];
const title_list = ["Estado da Casa", "Funcionalidades", "Notificações", "#", "#", "#"];
const link_list = ["html/estado.html", "html/Funcionalidades.html", "html/lista_intruso.html", "#", "#", "#"];

function changePage(indexPage) {
    box_list = document.getElementsByClassName("menu-box");

    for (i = 0; i < item_count_per_page; i++) {
        index = indexPage * item_count_per_page + i;
        // atualizar os ícones e os títulos nos blocos
        box_list[i].innerHTML = "<i class='" + icon_class_list[index] + 
                                " menu-icon'></i>" + title_list[index];
        // atualizar os links 
        box_list[i].parentElement.href = link_list[index];
    }
    
    document.getElementsByClassName("active")[0].classList.remove("active");
    document.getElementsByClassName("point")[indexPage].classList.add("active");
}

// construir os pontos no footer de maneira dinâmica
const title_len = title_list.length;
if (title_len > item_count_per_page) {
    for (i = 0; i < title_len/item_count_per_page; i++) {
        // construir um ponto
        point = document.createElement("div");
        point.classList.add("point");
        const indexPage = i;
        point.addEventListener("click", function() {changePage(indexPage);});
        document.getElementById("points").appendChild(point);
    }
    document.querySelector(".point").classList.add("active");
}