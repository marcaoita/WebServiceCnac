function sendCadastro(dados) {

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/programacao/add",
        data: dados,
        async: true,
        cache: false,
        success: function () {
            loadList();
            zeraForm();
            alert("Programação cadastrada com sucesso!");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest)
            console.log(textStatus)
            alert(errorThrown);
        },
    });
}

function zeraForm() {


    $("#gestores").selectpicker("deselectAll");
    $("#colaboradores").selectpicker("deselectAll");
    $("#atividades").selectpicker("deselectAll");
    $("#clienteDisp").selectpicker("deselectAll");
    $("#tipoServicoCadastro").selectpicker("deselectAll");

    $("#myform")[0].reset();
}

/**
 * Função responsável por solicitar ao BackEnd a verificação do intervalo selecionado pelo usuário.
 */
function verificaIntervalo() {

    let json = getSelection();

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/verifCadProg/verificaIntervalo",
        data: json,
        async: false,
        cache: false,
        success: function (data) {
            setBackEndResponseInputUser(data);
        },
    });

}

function setBackEndResponseInputUser(resposta) {

    // noinspection JSUnresolvedVariable
    setValores(resposta.horasSimuladas, resposta.horasJaAlocadas);
    setAlertas(resposta);

}

/**
 * @author Pedro Belo
 * retorna a data maxima que a entidade poderá ter,
 * caso haja colaboradores alocados no intervalo entre a data inicial passada como parâmetro
 * e a data final calculada, será retornada a programação em questão.
 * @see getSelection()
 */
function dataFinalSugerida() {

    let json = getSelection();

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/verifCadProg/dataMaxima",
        data: json,
        async: true,
        cache: false,
        success: function (data) {
            setBackEndResponseDtMax(data, json.dtInicio);
            console.log(data)
        },
    });
}

function setBackEndResponseDtMax(resposta, dtInicial) {

    // noinspection JSUnresolvedVariable
    setValores(resposta.horasSimuladas, resposta.horasJaAlocadas);
    setAlertas(resposta);

    // noinspection JSUnresolvedVariable
    dataPicker.setDateRange(dtInicial, resposta.dataFinal);
}

/**
 * Carregas as atividades dados os valores imputador pelo usuário.
 */
function loadAtividades() {

    let json = getSelection();

    $.getJSON(
        "/atividade/find",
        {
            cnpj: json.cnpjCliente,
            anoBase: json.anoBase,
            tipoServico: json.tipoServico,
            ajax: "true",
        },
        function (data) {
            zeraValores();

            let atividades = $("#atividades");
            atividades.empty();
            data.forEach(function (item) {
                // noinspection JSUnresolvedVariable
                $("#atividades").append(
                    $("<option>", {
                        value: item.escopo.numEscopo,
                        text:
                            item.escopo.numEscopo +
                            " - " +
                            item.escopo.tipoEscopo +
                            " - " +
                            item.horasVendidas,
                        "data-valor": item.horasVendidas,
                    })
                );
            });
            atividades.selectpicker("refresh");
        }
    );
}
  