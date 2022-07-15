// noinspection JSUnresolvedVariable

$('#dados').on('dbl-click-row.bs.table', function (_row, $element, _field) {

    let id = $element.programacao.id;

    loadModal("parecer/modal", {id: id, message: "Não foi possível carregar o parecer"})
})
