function onChangeAnoBase() {
    loadList();

}

$('#dados').on('dbl-click-row.bs.table', function (_row, $element, _field) {

    let cnpjModal = $element.cnpjCliente;
    let dtBase = $element.anoBase;

    loadModal("programacao/modal", {cnpj: cnpjModal, dtBase: dtBase, tipo: 'cliente'})

})