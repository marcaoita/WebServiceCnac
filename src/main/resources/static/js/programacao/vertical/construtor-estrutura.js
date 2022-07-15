
/**
 * Função responsável por criar a coluna de dadas e chamar a função que monta os blocos.
 */
function montaProgVertical(anoBasePadrao) {
    $("#datas").remove();
    $("#datas2").remove();
    geraDatas(anoBasePadrao, "datas", "calendar-day");
    geraDatas(anoBasePadrao, "datas2", "calendar-day2");
    loadList();
  }

   
