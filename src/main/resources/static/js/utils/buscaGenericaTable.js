let temporiza;

$('#txtBusca').on("input", function () {
    let nomeFiltro = $(this).val().toLowerCase();

    let table = $('table tbody');

    if (table.find('tr').size() === 0) {

        clearTimeout(temporiza);
        temporiza = setTimeout(function () {
            window.find(nomeFiltro);
        }, 500);

    } else {

        clearTimeout(temporiza);
        temporiza = setTimeout(function () {
            table.find('tr').each(function () {
                let conteudoCelula = $(this).find('td').text();
                let corresponde = conteudoCelula.toLowerCase().indexOf(nomeFiltro) >= 0;
                $(this).css('display', corresponde ? '' : 'none');
            });
        }, 500);
    }
});