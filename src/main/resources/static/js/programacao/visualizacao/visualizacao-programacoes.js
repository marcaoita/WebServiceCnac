
/**
 * Carrega as programações de um determinado cliente.
 * */
function loadProgramacoes(tipo) {

  let prog = $("#programacoes");
  prog.empty();

  if (tipo === 'cliente') {
    prog.load("cliente/modal", {
      anoBase: $("#anoBaseVisualizacao").find(":selected").val(),
      cnpj: $("#cliente").attr("cnpj")
    });
  } else {
    prog.load("colaborador/modal", {
      anoBase: $("#anoBaseVisualizacao").find(":selected").val(),
      cpf: $("#colaborador").attr("cpf")
    })
  }


}

function onChangeAnoBase(tipo) {
  loadProgramacoes(tipo);
}

function onChangTipoFilter() {

  let tipo = $("#tipoServicoModal option:selected").val();

  if (tipo !== 'todos') {
    $("div[tipo-servico='" + tipo + "'].card").removeClass('esconder-sem-espaco');
    $("div[tipo-servico!='" + tipo + "'].card").addClass('esconder-sem-espaco');
  } else {
    $("div > .card").removeClass('esconder-sem-espaco');
  }
}

function onChangeVisibilidade() {

  let visualizacao = $("#visibilidade option:selected").val();

  let idProgramacao = $('#idProgramacao').attr("idProgramacao");

  if (idProgramacao === undefined) {
    return null;
  }

  if (visualizacao !== 'todos') {
    $("div[id='" + idProgramacao + "'].card").removeClass('esconder-sem-espaco');
    $("div[id!='" + idProgramacao + "'].card").addClass('esconder-sem-espaco');
  } else {
    $("div > .card").removeClass('esconder-sem-espaco');
  }


}

/**
 * Envia uma solicitação de delete ao BackEnd.
 * */
function deleteProgramacao(id) {
  sendDelete({url: "programacao/delete", id: id, message: "Somente um dos gestores da programação pode exclui-lá."})
  $("#" + id).remove();
}

  /**
   * @param id da programação.
   * @param cnpj do cliente em questão.
   * @param anoBase desejado.
   * */
  function editaProgramacao(id, cnpj, anoBase) {
    loadModal("programacao/update",{ id: id, cnpjCliente: cnpj, anoBase: anoBase, message: "Somente os gestores da programação podem edita-lá." })
  }

  /**
   * Função responsável por chamar o modal de parecer.
   * @param id do parecer.
   * */
  function parecer(id) {
    loadModal("parecer/modal",{ id: id, message: "Não foi possível carregar o parecer" })
  }

/**
 * Função responsável por chamar o modal da avaliação.
 * @param anoBase das avaliações.
 * @param cnpj do cliente.
 * */
function avaliacao(cnpj, anoBase) {
  loadModal("avaliacao/modal",{ cnpjCliente: cnpj, anoBase: anoBase, message: "Não foi possível carregar as avaliações." })
}





