// noinspection JSUnresolvedVariable

function getProgramacao(idProgramacao, cnpjCliente, anoBase) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/programacao/get-prog",
        data: {id: idProgramacao, cnpjCliente: cnpjCliente, anoBase: anoBase},
        async: false,
        cache: false,
        success: function (data) {
            setDados(data);
        }
    });

}

function setDados(programacao) {

    $("#idProgramacao").val(programacao.id);
    $("#anoBaseCadastro").val(programacao.anoBase);
    $("#tipoVisita").val(programacao.tipoVisita);
    $("#clienteDisp").val(programacao.cli.cnpjCliente).change();
    $("#escritorio").val(programacao.escritorioOrig).change();
    $("#tipoServicoCadastro").val(programacao.tipoServico).change();
    $("#dtBaseCadastro").val(programacao.dtBase);
    $("#atraso").val(programacao.diasAtraso);
    $("#dtBase").val(programacao.dtBase);

    if (programacao.temCSA) {
        $("#hasCSA").selectpicker("val", "true");
    } else {
        $("#hasCSA").selectpicker("val", "false");
    }

    if (programacao.amostraGerada) {
        $("#amostraGerada").selectpicker("val", "true");
    } else {
        $("#amostraGerada").selectpicker("val", "false");
    }

    let gestores = $("#gestores");

    /**
     * Seta os gestores na tela.
     */
    let arrayGestores = [];
    programacao.gestores.forEach((element) => {
        arrayGestores.push(element.cpfCnpj);
    });

    gestores.selectpicker("val", arrayGestores);
    gestores.selectpicker("refresh");

    /**
     * Seta os Colaboradores na tela.
     */
    let arrayColaboradores = [];
    programacao.colaboradores.forEach((element) => {
        arrayColaboradores.push(element.cpfCnpj);
    });

    let colaboradores = $("#colaboradores")

    colaboradores.selectpicker("val", arrayColaboradores);
    colaboradores.selectpicker("refresh");

    dataPicker.setDateRange(
        convertFormatDate(programacao.dtInicio),
        convertFormatDate(programacao.dtFim)
    );

    if (programacao.dtInicioExe != null) {
        dataPickerExec.setDateRange(
            convertFormatDate(programacao.dtInicioExe),
            convertFormatDate(programacao.dtFimExe)
        );
    }

    let arrayAtividade = [];
    programacao.escopos.forEach((element) => {
        arrayAtividade.push(element);
    });

    loadAtividades();
    /**
     * Seta as atividades
     */
    $("#atividades").on(
        "refreshed.bs.select",
        function () {
            $("#atividades").selectpicker(
                "val",
                arrayAtividade
            );

            verificaIntervalo();
        });
}

function convertFormatDate(date) {
    if (date == null) return null;
    return date.split("-").reverse().join("-");
}

