==============={ Menu }====================

Se quiser modificar as informações dos blocos, ir ao "js/index.js"


==============={ Notificações }============

1. Faz aparecer alerta de intruso na interface que quiser, adiciona no ficheiro .html o código seguinte:

        <form name="activateAlert" action="./alerta_intruso.html"></form>
        <script src="js/alerta_comum.js"></script>

    Nota: Altere o link da action ou do src se for preciso. 

2. Ligar ou Desligar a alerta de intruso, na GUI "Notificações" -> "Emergênica" -> clicar no botão do "Intruso"

3. Ajustar o tempo em que a alerta está ativa, ir ao "js/alerta_intruso.js"

4. Ajustar o tempo de intervalo entre 2 alertas, ir ao "js/lista_notificacoes.js"

5. Mudar ou adicionar mais categorias de norificacão, ir ao "js/lista_notificacoes.js"