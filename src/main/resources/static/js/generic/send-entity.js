// noinspection JSUnresolvedVariable

/**
 * Função responsável por capturar o evento de submissão de uma entidade.
 */
$(function () {
    $("#myform").submit(function (event) {
        event.preventDefault();
        $(".erros").remove();
        let form = $(this);
        $.ajax({
            type: form.attr("method"),
            url: form.attr("action"),
            data: form.serialize(),
        })
            .done(function (_data) {
                //Função que será chamada polimorficamente em função da entidade.
                loadList(form.attr("url"));
                form[0].reset();

                try {
                    loadAvaliacao()
                } catch (e) {

                }


                alert("Salvo com sucesso");
            })
            .fail(function (data) {
                trataError(data);
            });
    });
});


/**
 * Função responsável por capturar o evento de envio de dados em lote.
 */
$(function () {
    $("#myformArq").submit(function (event) {
        event.preventDefault();
        $(".erros").remove();
        let form = $(this);
        let formData = new FormData(this);

        $.ajax({
            type: form.attr("method"),
            url: form.attr("action"),
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $(".load").show();
            },
        })
            .done(function (_data) {
                $(".load").hide();
                loadList(form.attr("url"));
                alert("Cadastrado com sucesso");

            })
            .fail(function (data) {
                alert(data.responseJSON.message);
            });
    });
});

/**
 *
 * @param item - Campo que apresenta erro.
 */
function insertErro(item) {
    let li = document.createElement("li");
    let text = item.defaultMessage.split(":");
    let t = document.createTextNode(text[1]);

    li.appendChild(t);
    li.classList.add("erros");

    document.getElementById("err" + item.field).appendChild(li);
}

/**
 *
 * @param data - resposta do BackEnd em relação a erros.
 */
function trataError(data) {
    console.dir(data)
    alert("Falha ao cadastrar ou atualizar entidade. " + data.responseJSON.message);
}
