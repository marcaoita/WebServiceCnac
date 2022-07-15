// noinspection JSUnresolvedVariable

/**
 * @author Pedro Belo
 * Função responsável por criar os blocos, dados os dados passados como parâmetros.
 * @param programacao Objeto do tipo <code>Programacao</code>
 * @param nomeColaborador nome do colaborador.
 * @param cpf do colaborador.
 */
function geraBlocos(programacao, nomeColaborador, cpf) {

    let splitIni;
    let inicial;
    let splitFin;
    let final;

    splitIni = programacao.dtInicio.split("-");
    inicial = new Date(splitIni[0], splitIni[1] - 1, splitIni[2]);

    splitFin = programacao.dtFim.split("-");
    final = new Date(splitFin[0], splitFin[1] - 1, splitFin[2]);

    /* Etiqueta */
    let elEtiqueta = document.createElement("div");
    let eText = document.createTextNode(programacao.tipoServico + " - " + programacao.executado);
    elEtiqueta.appendChild(eText);
    elEtiqueta.classList.add("etiquetas");


    /* Monta o elemento DIV com os parâmetros necessários */
    let divElement = document.createElement("div");
    let h = document.createElement("h5");
    divElement.setAttribute("inicio", programacao.dtInicio);
    divElement.setAttribute("fim", programacao.dtFim);
    divElement.setAttribute("cooperativa", programacao.cli.siglaCoop);
    divElement.setAttribute("colaborador", cpf);
    divElement.setAttribute("cnpj", programacao.cli.cnpjCliente);
    divElement.setAttribute("idProg", programacao.id);
    divElement.setAttribute("tipoServico", programacao.tipoServico);
    divElement.setAttribute("data-toggle", "tooltip");
    divElement.setAttribute("data-placement", "top");
    divElement.setAttribute("title", programacao.stringEscopos);
    divElement.addEventListener(
        "dblclick",
        function (_e) {
            //Evento responsável por chamar a tela de visualização de programação.

            let cnpjModal = $(this).attr("cnpj");
            let cpfColaborador = $(this).attr("colaborador");
            let dtBase = $("#anoBase").val();
            let etiqueta = $(this).children(".etiquetas").text().split(' ')[0];
            let idProgramacao = $(this).attr("idprog");

            if (
                etiqueta === "FERIAS" ||
                etiqueta === "COMPENSACAO" ||
                (etiqueta === "TREINAMENTO" && cnpjModal === "09140486") ||
                etiqueta === "LICENCA"
            ) {
                loadModal("programacao/modal", {
                    cpf: cpfColaborador,
                    tipo: 'colaborador',
                    idProgramacao: idProgramacao,
                    dtBase: dtBase,
                    message: "Não foi possível carregar as informações do colaborador"
                })
            } else {
                loadModal("programacao/modal", {
                    cnpj: cnpjModal,
                    tipo: 'cliente',
                    idProgramacao: idProgramacao,
                    dtBase: dtBase,
                    message: "Não foi possível carregar as informações do cliente"
                })
            }
        },
        false
    );
    divElement.classList.add("myPopover");
    divElement.classList.add("intervalos");
    divElement.classList.add("intervalos-over");
    divElement.style.zIndex = "4";
    divElement.style.border = "1px solid";
    divElement.appendChild(elEtiqueta);

    /* Obtem a posição da data inicial programada e seta o bloco com a posição Y da data inicial localizada */
    let findDate = getInitialDate(inicial);

    if (findDate == null) return null;

    let posy = findDate.getBoundingClientRect().y;
    let scrollTop = $(window).scrollTop();
    let heightDate = findDate.getBoundingClientRect().height;
    let blockHeight = getBlockHeight(inicial, final, heightDate);
    divElement.style.top = posy + scrollTop + "px";
    divElement.style.position = "absolute";
    divElement.style.width = "125px";
    divElement.style.cursor = "pointer";
    divElement.style.height = blockHeight + "px";
    let fonteCor;
    let cor;

    if (programacao.cli.cor != null) {
        cor = programacao.cli.cor;
    }

    fonteCor = "#000";

    if (!(programacao.tipoServico === "AC" || programacao.tipoServico === "AE" || programacao.tipoServico === "ES" || programacao.tipoServico === "CSA" || programacao.tipoServico === "TI")) {
        cor = "#000";
        fonteCor = "#ffffff";
    }

    divElement.style.backgroundColor = cor;
    divElement.style.color = fonteCor;

    let t;
    if (blockHeight <= heightDate * 3) {
        t = document.createTextNode(programacao.cli.numCoop);
    } else {
        t = document.createTextNode(
            programacao.cli.numCoop + " - " + programacao.cli.siglaCoop
        );
    }

    h.appendChild(t);
    divElement.appendChild(h);

    let findCol = getColumColaborador(nomeColaborador);

    if (findCol != null) findCol.appendChild(divElement);
}

/**
 * @author Pedro Belo
 * Função responsável por detectar o paralelismo entre as programação e dividir o bloco ao meio.
 * @param nome nome do colaborador.
 * @param progParalelas JSON com as programações em paralelo, dado o colaborador passado como parâmetro.
 */
function programacoesParalelas(nome, progParalelas) {

    let col = getColumColaborador(nome);

    for (let i in progParalelas) {
        let prog = col.querySelector(
            "[idProg=" + '"' + progParalelas[i].id + '"]'
        );

        if (prog != null) {
            if (i % 2 === 0) {
                prog.style.width = 125 / 2 + "px";
            } else {
                prog.style.width = 125 / 2 + "px";
                prog.style.marginLeft = 125 / 2 + "px";

            }
        }

    }
}

