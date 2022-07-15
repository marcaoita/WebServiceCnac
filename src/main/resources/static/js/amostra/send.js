$(function () {
  $("#myform").submit(function (event) {
    event.preventDefault();
    $(".erros").remove();
    const form = $(this);
    $.ajax({
      type: form.attr("method"),
      url: form.attr("action"),
      data: form.serialize(),
      beforeSend: function () {
        $(".enviando").fadeIn();
      }
    })
      .done(function (_data) {
        loadList('controle-geracao-amostra/list')
        $(".enviando").fadeOut();
        $("#alerta").text("E-mail enviado!");
      })
      .fail(function (data) {
        trataError(data);
      });
  });
});
