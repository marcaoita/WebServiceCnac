// noinspection JSUnresolvedVariable

function setValues(element) {

    $('#numEscopo').val(element.numEscopo);
    $('#tipoEscopo').val(element.tipoEscopo);
    $('#aplicacao').val(element.aplicacao);
    $('#escopoAgregador').val(element.escopoAgregador);
    $('#apelido').val(element.apelido);

}

function deleteEscopo(numEscopo) {
    sendDelete({
        id: numEscopo,
        url: "/escopo/delete",
        message:
            "Não é possível deletar um escopo alocado em uma atividade. - ",
        urlLoadJson: "escopo/list"
    });
}