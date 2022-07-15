function verificarInformacoes() {
    
  let dados = getSelection();

  verificaIntervalo();

  let liberado = true;

  let CodAlertaFerias = $("#alertaFerias").text().substring(0, 8);

  let substring = $("#alertaParalelismo").text().substring(0, 8);
  if (substring === "Alerta 3") {
    $("#alertaCadastro").text("Não é permitido cadastrar um mesmo colaborador em mais de duas programações ao mesmo tempo.");
    liberado = false;
  } else if (substring === "Alerta 5") {
    $("#alertaCadastro").text("Programação Já Cadastrada.");
    liberado = false;
  }

  if(substring === "Alerta 6"){
    $("#alertaCadastro").text("Programação duplicada!");
    liberado = false;
  }


  if (dados.gestoresIds.length === 0) {
    $("#alertaCadastro").text("Você deve selecionar ao menos um gestor.");
    liberado = false;
  }

  if (dados.cnpjCliente === "Selecione") {
    $("#alertaCadastro").text("Você deve selecionar um Cliente.");
    liberado = false;
  }

  if (dados.colaboradoresIds.length === 0) {
    $("#alertaCadastro").text("Você deve selecionar ao menos um Colaborador.");
    liberado = false;
  }

  if (
    dados.escoposAtividades.length === 0 &&
    (
      dados.tipoServico === "AC" ||
      dados.tipoServico === "AE" ||
      dados.tipoServico === "ES" ||
      dados.tipoServico === "TI"
    )
  ) {
    $("#alertaCadastro").text("Você deve selecionar ao menos uma Atividade.");
    liberado = false;
  }

  if (dados.tipoVisita === "selecione") {
    $("#alertaCadastro").text("Você deve selecionar o tipo de visita.");
    liberado = false;
  }

  if (dados.escritorio === "selecione") {
    $("#alertaCadastro").text("Você deve selecionar o escritório responsável.");
    liberado = false;
  }

  if (CodAlertaFerias === "Alerta 4") {
    $("#alertaCadastro").text(
      "Não é possível cadastrar programação com férias em paralelo"
    );
    liberado = false;
  }

  if (
    dados.cnpjCliente !== "09140486" &&
    (dados.tipoServico === "FERIAS" ||
      dados.tipoServico === "COMPENSACAO" ||
      dados.tipoServico === "LICENCA")
  ) {
    $("#alertaCadastro").text(
      "Não é permitido cadastrar férias, licenças ou compensações com cliente diferente da CNAC!"
    );
    liberado = false;
  }

  if (dados.temCSA === "false" && dados.csaIds.length > 0) {
    $("#alertaCadastro").text(
      "Não é permitido alocar executores CSA com o campo 'tem CSA?' marcado como não!"
    );
    liberado = false;
  }

  if (liberado) {
    $("#alertaCadastro").text("");
    sendCadastro(dados);
  }
}
