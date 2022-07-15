
/**
 * @author Pedro Belo
 * Função responsável por obter dados no BackEnd e chamar as funções que montam a programação vertical.
 * @see getFilters() - JSON com os dados selecionados pelo usuário.
 */
function loadList() {

  let jsonSelection = getFilters();

  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/programacao-vertical/list",
    data: jsonSelection,
    async: true,
    cache: false,
    beforeSend: function () {
      $('.load').show();
    },
    success: function (data) {
      if (data) {
        $(".myPopover").remove();
        $(".colaboradores").remove();
        setColumns(data.length);
        data.forEach(arrayColaborador);

        $('.load').hide();
        $('.tooltip-inner').remove();
        $('.myPopover').tooltip({ boundary: 'window'} );
      }
    },
  });
}
