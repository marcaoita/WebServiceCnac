// noinspection JSUnresolvedVariable

/**
 * Função responsável por receber a resposta do BackEnd e setar os alerta aplicáveis.
 * @param {JSON} resposta Resposta do BackEnd.
 * */
function setAlertas(resposta) {

    if (resposta.feriasLicencas.length > 0) {
        alertaFerias(resposta.feriasLicencas);
    } else {
        $("#alertaFerias").text("");
    }

    if (resposta.programacoesParalelas.length > 0) {
        alertaProgramacaoParalela(resposta.programacoesParalelas);
    } else {
        $("#alertaParalelismo").text(
            "Alerta 1: As datas em questão são sugestões do sistema, você pode alterá-las."
        );
    }

    if (resposta.programacaoDuplicada.length > 0) {
        $("#alertaParalelismo").text("Alerta 6: Programação duplicada!");
    }

    if (resposta.feriadosAplicaveis.length > 0) {
        alertaFeriados(resposta.feriadosAplicaveis);
    } else {
        $("#alertaFeriado").text("");
    }

}

/**
 * Seta no HTML alerta sobre férias, caso aplicável.
 * @param {Array} feriasLicencas JSON contendo as férias ou licenças dos colaboradores em questão.
 * */
function alertaFerias(feriasLicencas) {
    $("#alertaFerias").text(
        "Alerta 4: Há férias ou licenças alocadas a um ou mais colaboradores no período selecionado. " +
        "Início em: " +
        convertFormatDate(feriasLicencas[0].dtInicio) +
        " - Colaborador: " +
        feriasLicencas[0].colaboradores[0].nome
    );
}

/**
 * Seta no HTML alerta referente a paralelismo de programações.
 * @param {Array} p Programações em paralelo.
 *
 * */
function alertaProgramacaoParalela(p) {

    let filters = getSelection();
    let idProgramacao = $("#idProgramacao").val()

    if (p.length === 1 && p[0].id !== idProgramacao) {
        $("#alertaParalelismo").text(
            "Alerta 2: Um ou mais colaboradores selecionados já estão programados em outro trabalho, o sistema permite até dois trabalhos pro colaborador em paralelo. Programação: " +
            p[0].cli.siglaCoop +
            ", com início em: " +
            convertFormatDate(p[0].dtInicio)
        );
    } else if (p[0].id !== idProgramacao) {
        $("#alertaParalelismo").text(
            "Alerta 3: Há mais de duas programações alocadas para um mesmo colaborador ao mesmo tempo, isso não é permitido! Cliente: " +
            p[0].cli.siglaCoop +
            ", com início em: " +
            convertFormatDate(p[0].dtInicio) +
            "; Cliente: " +
            p[1].cli.siglaCoop +
            ", com início em: " +
            convertFormatDate(p[1].dtInicio)
        );
    }

    if ((p[0].cli.cnpjCliente === filters.cnpjCliente) && p[0].id !== idProgramacao && ((convertFormatDate(p[0].dtInicio) === filters.dtInicio) && (convertFormatDate(p[0].dtFim) === filters.dtFim))) {
        $("#alertaParalelismo").text("Alerta 5: Programação Já cadastrada");
    }
}

/**
 * Seta no HTML alertas referentes a feriados.
 * @param {Array} feriados Feriados aplicáveis.
 * */
function alertaFeriados(feriados) {
    if (feriados.length === 1) {
        let f = new Feriado(
            convertFormatDate(feriados[0].dtRecesso),
            feriados[0].nome,
            feriados[0].tipoFeriado
        );

        $("#alertaFeriado").text(
            "Há um feriado entre o intervalo selecionado, " + f.toString()
        );
    } else {
        let feriadoArray = [];
        feriados.forEach(function (item) {
            feriadoArray.push(
                new Feriado(
                    convertFormatDate(item.dtRecesso),
                    item.nome,
                    item.tipoFeriado
                )
            );
        });
        $("#alertaFeriado").text(
            "Há feriados entre o intervalo selecionado, " + feriadoArray.toString()
        );
    }
}


