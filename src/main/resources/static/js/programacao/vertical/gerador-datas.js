/**
 * @author Pedro Belo
 * Função responsável por a coluna referente ao ano Base passado como parâmetro.
 * Por padrão o ciclo de auditoria termina em abril do ano subsequente passado como parâmetro, lembrando que em JS o mês inicia em 00.
 * @param ano a partir do qual o usuário deseja gerar datas.
 * @param nomeElemento - elemento no qual as datas serão inseridas no HTML.
 * @param classe - classe ao qual as datas iram pertencer.
 *
 */
function geraDatas(ano, nomeElemento, classe) {

    const mesInicio = 3;

    let dataInicial = new Date(ano, mesInicio, 1);
    let dateFinal = new Date(parseInt(ano) + 1, mesInicio, 30);
    let novaData = dataInicial;
    let cont = 0;
    let dia = 24 * 60 * 60 * 1000; // Um dia em milisegundos.

    let divElement = document.createElement("div");
    let t = document.createTextNode("Datas");
    let h = document.createElement("div");
    divElement.id = nomeElemento;
    divElement.style.marginTop = "10px";
    divElement.style.width = "224px";
    divElement.appendChild(t);
    divElement.style.position = "sticky";
    divElement.style.left = "-24px";
    divElement.style.backgroundColor = "#fcfcfcd9";
    divElement.style.zIndex = "3";
    let colaboradores = document.getElementById("colaboradoresDashBoard");
    h.id = "titulo-datas";
    h.appendChild(t);
    divElement.appendChild(h);

    colaboradores.insertBefore(divElement, colaboradores.childNodes[0]);

    while (novaData < dateFinal) {
        if (cont > 0) novaData = new Date(novaData.getTime() + dia);

        let dataFormatada = dataformat(novaData);
        let d = document.createElement("div");
        let td = document.createTextNode(
            dataFormatada + " - " + diaDaSemana(novaData)
        );
        d.setAttribute("data-id", dataformat(novaData));
        d.appendChild(td);

        if (diaDaSemana(novaData) === "Sábado" || diaDaSemana(novaData) === "Domingo")
            d.style.background = "#c9c1c124";

        d.addEventListener(
            "dblclick",
            function (e) {
                if (e.target !== e.currentTarget) return null;

                //Evento responsável por chamar o modal de cadastro de programação.

                let posyX = e.clientX;
                let scrollTop = $(window).scrollTop();

                let posyCol = document
                    .querySelectorAll(".colaboradores")
                    .item(0)
                    .getBoundingClientRect().y;

                let divAviso = document.getElementById("avisos");

                //Deve-se deduzir os pixes do aviso quando há.
                if(scrollTop === 0){
                    posyCol = posyCol + scrollTop
                } else {

                    if(divAviso.style.visibility === 'hidden') {
                        posyCol = posyCol + scrollTop
                    } else {
                        let avisoLenth = divAviso.getBoundingClientRect().height;
                        posyCol = posyCol + scrollTop - avisoLenth
                    }
                }

                let elementByPosition = document.elementFromPoint(posyX, posyCol);

                let cpfColab = $(elementByPosition).attr("cpf");
                let data = $(this).attr("data-id");

                loadModal("programacao/index", {
                    dtInicial: data,
                    colaborador: cpfColab,
                    message: "Não foi possível carregar o modal de cadastro"
                });

            },
            false
        );


        d.classList.add(classe);
        document.getElementById(nomeElemento).appendChild(d);
        cont++;
    }
}
