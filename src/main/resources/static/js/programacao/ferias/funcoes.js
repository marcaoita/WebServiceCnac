function deleteFerias(id) {
    sendDelete({
        id: id,
        message: "Não foi possível deletar as férias ou trenamentos",
        urlLoadJson: "programacao-lote/list",
        url: "programacao-lote/delete"
    })
}