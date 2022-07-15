$('#dados').on('dbl-click-row.bs.table', function (_row, $element, _field) {

    //Função será chamada polimorficamente, conforme o contexto da entidade.
    setValues($element);
})