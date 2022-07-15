// noinspection JSUnresolvedVariable

function setValues(element) {
    $("#cargoDesc").val(element.cargoDesc);
    $("#area").val(element.area);
}

function deleteCargo(cargo) {
    sendDelete({
        id: cargo,
        url: "/cargo/delete",
        message:
            "Não é possível deletar um cargo em uso. -",
        urlLoadJson: "cargo/list"
    });
}
