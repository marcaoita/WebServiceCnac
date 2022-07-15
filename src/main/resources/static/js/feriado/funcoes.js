// noinspection JSUnresolvedVariable

function setValues(element) {
    $("#nome").val(element.nome);
    $("#dtRecesso").val(element.dtRecesso);
    $("#tipoFeriado").val(element.tipoFeriado);
    $("#uf").val(element.uf);
    $("#municipio").val(element.municipio);
}

function deleteFeriado(id) {
    sendDelete({
        id: id,
        url: "/feriado/delete",
        message:
            "Não é possível deletar o feriado em questão. - ",
        urlLoadJson: "feriado/list"
    });
}