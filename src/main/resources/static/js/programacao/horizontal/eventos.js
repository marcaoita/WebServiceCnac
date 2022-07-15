// noinspection JSUnusedLocalSymbols,JSUnresolvedVariable

$('#dados').on('dbl-click-row.bs.table', function (row, $element, field) {

    let cnpjModal = $element.cli.cnpjCliente;
    let dtBase = $element.anoBase;
    let idProgramacao = $element.id;

    loadModal("programacao/modal", {cnpj: cnpjModal, dtBase: dtBase, tipo: 'cliente', idProgramacao: idProgramacao})

})
