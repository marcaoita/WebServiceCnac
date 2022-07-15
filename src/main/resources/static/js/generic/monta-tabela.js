/**
 * @author Pedro Belo
 * @param array {Array} Arrays de objetos que irá popular a tabela.
 * */
function montaTabela(array) {

    $("#corpoTabela").empty();

    let $table = $('#dados')
    $table.bootstrapTable('removeAll');


    //Oculta algumas colunas desnecessárias incialmente.
    try {
        $table.bootstrapTable('hideColumn', 'cli.segmentacao')
        $table.bootstrapTable('hideColumn', 'cli.cnpjCliente')
        $table.bootstrapTable('hideColumn', 'cli.municipio')
        $table.bootstrapTable('hideColumn', 'cli.estado')
        $table.bootstrapTable('hideColumn', 'anoBase')
        $table.bootstrapTable('hideColumn', 'diasAtraso')
        $table.bootstrapTable('hideColumn', 'horasVendidas')
        $table.bootstrapTable('hideColumn', 'horasAlocadas')
        $table.bootstrapTable('hideColumn', 'horasDestCSA')
        $table.bootstrapTable('hideColumn', 'horasRevisao')
        $table.bootstrapTable('hideColumn', 'saldoLiquidoHoras')
        $table.bootstrapTable('hideColumn', 'executado')
        $table.bootstrapTable('hideColumn', 'emRevisao')
        $table.bootstrapTable('hideColumn', 'revisado')

    } catch (e) {

    }

    $table.bootstrapTable('append', array);

}

function editaTabela() {
    $(".dataRAC").dblclick(function () {
        let conteudoOriginal = $(this).text();

        $(this).addClass("celulaEmEdicao");
        $(this).html("<input type='date' value='" + conteudoOriginal + "' />");
        $(this).children().first().focus();

        $(this).children().first().keypress(function (e) {
            if (e.which === 13) {
                let novoConteudo = $(this).val();
                $(this).parent().text(novoConteudo);
                $(this).parent().removeClass("celulaEmEdicao");
            }
        });

        $(this).children().first().blur(function () {
            $(this).parent().text(conteudoOriginal);
            $(this).parent().removeClass("celulaEmEdicao");
        });
    });
}