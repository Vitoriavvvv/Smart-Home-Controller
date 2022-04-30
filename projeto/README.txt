==============={ Menu }====================

Se quiser modificar as informações dos blocos, ir ao "js/index.js"


==============={ Notificações }============

1. Faz aparecer alerta de intruso na interface que quiser, adiciona no ficheiro .html o código seguinte:

        <form name="activateAlert" action="./alerta_intruso.html"></form>
        <script src="../js/alerta_comum.js"></script>

    Nota: Altere os links da action e do src se o ficheiro não está na diretoria html/. 

2. Ligar ou Desligar a alerta de intruso, na GUI "Notificações" -> "Emergênica" -> clicar no botão do "Intruso"

3. Ajustar o tempo em que a alerta está ativa, ir ao "js/alerta_intruso.js"

4. Ajustar o tempo de intervalo entre 2 alertas, ir ao "js/lista_notificacoes.js"

5. Mudar ou adicionar mais categorias de norificacão, ir ao "js/lista_notificacoes.js"

==============={ Atualizações após TP9 }============

1. Foram descartados os efeitos hover desnecessários, em "css/luzes.css" e "css/ac.css"

2. Separação de duas funções dentro do mesmo bloco --> des/ativar alerta e consulta de respetiva lista de notificações

3. Mais uma funcionalidade Limpesa de Casa.