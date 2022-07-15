/**
 * @author Pedro Belo
 * Função responsável por chamar o JSON de objetos no BackEnd e chamar a função que monta a tabela.
 * @param url {String} URL da chamada no BackEnd.
 */
function loadList(url) {

    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: getFilters(),
        async: true,
        cache: false,
        beforeSend: function () {
            $(".load").fadeIn();
        },
        success: function (data) {
            montaTabela(data);
            $(".load").fadeOut();
        },
    });
}