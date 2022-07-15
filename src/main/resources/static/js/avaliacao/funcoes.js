/**
 * Carrega as avaliações conforme seleção do escopo.
 * */
function loadAvaliacao() {

    let escopo = $("#escopo");

    if (escopo.find(":selected").val() !== 'selecione') {
        let avaliacao = $("#avaliacoes");
        avaliacao.empty();
        avaliacao.load("avaliacao/get",
            {
                anoBase: $("#filters").attr("anoBase"), cnpj: $("#cliente").attr("cnpj"),
                escopo: escopo.find(":selected").val()
            })
    }


}
