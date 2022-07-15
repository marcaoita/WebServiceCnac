function setValues(element) {

    // noinspection JSUnresolvedVariable
    $("#cpfColaborador").val(element.cpfCnpj);
    $("#nomeColaborador").val(element.nome);
    // noinspection JSUnresolvedVariable
    $("#cargoColaborador").val(element.cargo.cargoDesc).change();
    // noinspection JSUnresolvedVariable
    $("#escritorioOrigem").val(element.escritorioOrigem).change();
    // noinspection JSUnresolvedVariable
    $("#municipio").val(element.municipio);
    // noinspection JSUnresolvedVariable
    $("#estado").val(element.estado);
    // noinspection JSUnresolvedVariable
    $("#emailColaborador").val(element.email);
    // noinspection JSUnresolvedVariable
    $("#statusColaborador").val(element.statusAtual);
    // noinspection JSUnresolvedVariable
    $("#tipoAlocacao").val(element.tipoAlocacao);
}

function deleteColaborador(cpf) {
    sendDelete({
        cpf: cpf,
        url: "/colaborador/delete",
        message:
            "Não é possível deletar um colaborador alocado em uma Programação. - ",
        urlLoadJson: "colaborador/list"
    });
}
