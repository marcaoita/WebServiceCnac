/**
 * Evento de click na tabela do plugin BootstrapTable.
 */
$('#dados').on('dbl-click-row.bs.table', function (_row, $element, _field) {

    setValues($element)

})