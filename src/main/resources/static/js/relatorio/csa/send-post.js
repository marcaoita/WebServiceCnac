function loadList() {
    /**
     * @author Pedro Belo
     * @return retorna os colaboradores baseados nos filtros.
     * @see getSelectionDashBoard()
     */
    
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/relatorios/relatorio-csa-dados",
      data: {anoBase: $("#anoBase").find(":selected").val()},
      async: true,
      cache: false,
      beforeSend: function () {
  
        $('.load').show();
  
      },
      success: function (data) {
        if (data) {
          montaTabela(data);
          $('.load').hide();
  
        }
      },
    });
  }
  