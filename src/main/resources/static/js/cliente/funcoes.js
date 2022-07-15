// noinspection JSUnresolvedVariable

function carregarLote() {
    $('#gifAtividade').removeClass('esconder-com-espaco');
}

function setValues(element) {
    $("#cnpj").val(element.cnpjCliente);
    $("#numCoop").val(element.numCoop);
    $("#siglaCoop").val(element.siglaCoop);
    $("#razaoSocial").val(element.razaoSocial);
    $("#codCentral").val(element.codCentral);
    $("#siglaCentral").val(element.siglaCentral);
    $("#codSistema").val(element.codSistema);
    $("#sisbr").val(String(element.sisbr));
    $("#associado").val(String(element.associado));
    $("#segmentacao").val(element.segmentacao);
    $("#classe").val(element.classe);
    $("#municipio").val(element.municipio);
    $("#estado").val(element.estado);
    $("#cor").val(element.cor);
}

function deleteCliente(cnpj) {
    sendDelete({
        cnpj: cnpj,
        url: "/cliente/delete",
        message:
            "Não é possível deletar um cliente alocado em uma Atividade ou Programação. - ",
        urlLoadJson: "cliente/list"
    });
}
