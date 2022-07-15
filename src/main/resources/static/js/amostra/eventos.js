// noinspection JSUnresolvedVariable

$('#dados').on('dbl-click-row.bs.table', function (_row, $element, _field) {

    let id = $element.id;
    let cnpjModal = $element.cli.cnpjCliente;
    let siglaCoop = $element.cli.siglaCoop;
    let stringEscopos = $element.stringEscopos;

    loadModal("controle-geracao-amostra/get-modal", {
        id: id,
        cnpj: cnpjModal,
        siglaCoop: siglaCoop,
        escopos: stringEscopos,
        message: "Não foi possível carregar as informações de amostra"
    })

})

function setMesAtual() {

    //Seta o mês atual no filtro de mês.
    const date = new Date().getMonth() + 1;
    let meses = [];
    meses.push(date.toString())
    meses.push((date + 1).toString())
    $("#mes").selectpicker("val", meses);

}