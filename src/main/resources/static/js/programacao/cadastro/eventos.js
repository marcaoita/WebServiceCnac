function onChangeIntervalo() {

    let tipoServico = $("#tipoServicoCadastro option:selected").val()

    if (getHorasSelecionadas() > 0 || !(tipoServico === 'AC' || tipoServico === 'AE' || tipoServico === 'ES' || tipoServico === 'TI')) {
        verificaIntervalo();
    } else {
        zeraValores();
    }
}


function onChangeColaboradores() {

    if (getHorasSelecionadas() > 0) {
        getDataMaxima();
    } else {
        zeraValores();
    }
}

/**
 * @author Pedro Belo
 * Função acionada pelo evento onChange de atividade, responsável por chamar os métodos de cálculo de horas vendidas e busca de data final sugerida.
 */
function onChangeAtividade() {

    if (getHorasSelecionadas() > 0) {
        getDataMaxima();
    } else {
        let dtInicial = dataformat(dataPicker.getDate());
        dataPicker.setDateRange(dtInicial, dtInicial);
        $(".alerta").text("");
        zeraValores();
    }
}

function onChangeServico() {

    if ($("#clienteDisp option:selected").val() !== 'selecione') {
        zeraValores();
        loadAtividades();
    }

    let tipoServico = $("#tipoServicoCadastro").find(":selected").val()

    if (tipoServico === 'AC' || tipoServico === 'TI' || tipoServico === 'AE' || tipoServico === 'ES') {
        $("#hasCSA").val('true');
        onChangeColaboradores();
    } else {
        $("#hasCSA").val('false');
    }

}

