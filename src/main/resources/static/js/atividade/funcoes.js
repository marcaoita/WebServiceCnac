// noinspection JSUnresolvedVariable

/**
 * Quando houver ampliação de escopo o campo requisitante ampliação de escopo é mostrado.
 */
function onChangeAmpliacaoEscopo() {
    let value = $("#ampliacaoEscopo option:selected").val()

    if (value === 'true') {
        document.getElementById("errrequisitanteAmpliacaoEscopo").style.display = "block";
    } else {
        document.getElementById("errrequisitanteAmpliacaoEscopo").style.display = "none";
    }
}

/**
 * Função responsável por setar os valores no Form ao clicar.
 * @param {JSON} element
 */
function setValues(element) {

    $('#numContratoOrig').val(element.numContratoOrig).change();
    $('#clienteDisp').val(element.cliente.cnpjCliente).change();
    $('#escopoDisp').val(element.escopo.numEscopo).change();
    $('#HorasVendidas').val(element.horasVendidas);
    $('#anoBase').val(element.anoBase);
    $('#tipoServico').val(element.tipoServico).change();
    $('#ampliacaoEscopo').val(String(element.ampliacaoEscopo)).change();
    $('#descricaoAmpliacaoEscopo').val(element.descricaoAmpliacaoEscopo).change();
    $('#requisitanteAmpliacaoEscopo').val(element.requisitanteAmpliacaoEscopo).change();
    $('#status').val(element.statusAtividade).change();
    $('#dtRescisao').val(element.dtRescisao).change();

}

/**
 * Deleta a atividade selecionada.
 * @param {String} cnpj do cliente.
 * @param {String} numEscopo Número do escopo.
 * @param {String} anoBase Ano Base.
 * */
function deleteAtividade(cnpj, numEscopo, anoBase) {
    sendDelete({
        cnpj: cnpj,
        numEscopo: numEscopo,
        anoBase: anoBase,
        url: "atividade/delete",
        message:
            "Não é possível deletar uma Atividade alocada a uma Programação. -",
        urlLoadJson: "atividade/list"
    });
}

