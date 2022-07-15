
/**
* @param json - JSON com os dados necessários para a chamada.
* @param url - URL da API a ser chamada.
* Função genérica responsável por chamar o modal desejado.
* */
function loadModal(url, json) {

    //Antes de abrir um novo modal, fecha o antigo caso exista.
    $('#myModal').modal('hide')
    $(".modal-backdrop").remove();
    $(".modal").remove();

    $("#recebeModal").load(
        url,
        json,
        function (_response, status, xhr) {

            console.dir(status)

            if ( status === "error" ) {
               alert( json.message + xhr.status + " " + xhr.statusText );
            }

            $("#myModal").modal('show');
            $("#datas").addClass("datas-index");
        },
    );


}