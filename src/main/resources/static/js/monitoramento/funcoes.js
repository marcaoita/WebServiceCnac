function setValues(element) {
    avaliacao(element);
}


/**
 * Função responsável por chamar o modal da avaliação.
 * @param element da atividade.
 * */
function avaliacao(element) {
    loadModal("avaliacao/modal", {
        anoBase: element.anoBase,
        cnpjCliente: element.cnpjCliente,
        escopo: element.numEscopo,
        message: "Não foi possível carregar as avaliações."
    })
}