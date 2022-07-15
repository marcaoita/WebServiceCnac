/**
 * Função responsável por fazer a exportação da tabela em Excel.
 * @param id {String} ID da tabela.
 * @param fileName {String}  - Nome do arquivo.
 */
 function Export(id, fileName) {
    $("#" + id).table2excel({
        formats: ["xlsx"],
        filename: fileName
    });
  }