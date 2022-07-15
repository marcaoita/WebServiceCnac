// noinspection JSUnresolvedVariable

/**
 * Envia uma solicitação de delete ao BackEnd
 * @param json - Recebe um JSON com a URL, Message e informações necessárias para exclusão.
 * */
function sendDelete(json) {
    if (window.confirm("Tem certeza que deseja excluir?")) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: json.url,
            data: json,
            async: true,
            cache: false,
            success: function (_data) {

                loadList(json.urlLoadJson)
                alert("Deletado com sucesso!");

            },
            error: function (XMLHttpRequest, _textStatus, errorThrown) {

                console.log(errorThrown)

                alert(json.message + " " + XMLHttpRequest.responseJSON);
            },
        });
    }
}