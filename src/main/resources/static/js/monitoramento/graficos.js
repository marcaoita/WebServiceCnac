function loadDados(url) {

    let retorno;

    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: getFilters(),
        async: false,
        cache: false,
        success: function (data) {
            retorno = data;
        },
    });
    return retorno;
}

function changeFunc() {

    let selectBox = document.getElementById("tipoGrafico");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;

    let selectBoxTipo = document.getElementById("tipoServico");
    let selectedValueTipo = selectBoxTipo.options[selectBoxTipo.selectedIndex].value;

    switch (selectedValue) {
        case 'emissaoRAC' :
            GrafStatusRac(loadDados('monitoramento/relatorio'), selectedValueTipo);
            break
        case 'execucao' :
            GrafMediaByExc(loadDados('monitoramento/relatorio'), selectedValueTipo);
            break
    }
}

function GrafStatusRac(dados, servicos) {

    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus !== undefined) {
        chartStatus.destroy();
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    const atrasados = CountByStatus(dados, ["Atrasado"], servicos);
    const emDia = CountByStatus(dados, ["Em dia"], servicos);
    const entregue = CountByStatus(dados, ["Entregue"], servicos);
    const entregueEmAtraso = CountByStatus(dados, ["Entregue com atraso"], servicos);


    const data = {
        type: 'bar',
        labels: atrasados.get('labels'),
        datasets: [{
            label: 'Atrasados',
            data: atrasados.get('data'),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',

            ],
            borderWidth: 1
        },
            {
                label: 'Em dia',
                data: emDia.get('data'),
                backgroundColor: [
                    'rgba(76, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgb(153, 102, 255)',
                ],
                borderWidth: 1
            },
            {
                label: 'Entregue',
                data: entregue.get('data'),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgb(75, 192, 192)',
                ],
                borderWidth: 1
            },
            {
                label: 'Entregue com Atraso',
                data: entregueEmAtraso.get('data'),
                backgroundColor: [
                    'rgba(255, 205, 86, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 205, 86)',
                ],
                borderWidth: 1
            }
        ]
    };

    Chart.register(ChartDataLabels);

    const myChart = new Chart(ctx, {

        type: 'bar',
        data: data,
        options: {
            plugins: [{
                title: {
                    display: true,
                    text: 'Status de entrega de RAC'
                },
            }, ChartDataLabels],
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    });

}

function GrafMediaByExc(dados, servicos) {

    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus !== undefined) {
        chartStatus.destroy();
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    const avgExcByCentral = AvgExcByCentral(dados, 'todos', servicos);


    const data = {
        type: 'bar',
        labels: avgExcByCentral.get('labels'),
        datasets: [{
            label: '% Executado',
            data: avgExcByCentral.get('data'),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',

            ],
            borderWidth: 1
        },
        ]
    };

    Chart.register(ChartDataLabels);

    const myChart = new Chart(ctx, {

        type: 'bar',
        data: data,
        options: {
            plugins: [{
                title: {
                    display: true,
                    text: '% Executado por central'
                },
            }, ChartDataLabels],
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    });

}

/**
 * @Return um map agrupando os valores por central.
 * @param dados {Array} array contento dos dados de monitoramento
 * @param filters {Array} status que se deseja filtrar.
 * */
function groupByCentral(dados, filters, servicos) {

    //Filtra somente os dados cujo status foi passado como parâmetro.
    return dados.reduce(function (r, a) {
        r[a.codCentral] = r[a.codCentral] || [];

        if (filters.includes(a.statusRac) || filters === 'todos') {
            if (servicos.includes('todos')) {
                r[a.codCentral].push(a);
            } else {
                if (servicos.includes(a.tipoServico)) {
                    r[a.codCentral].push(a);
                }
            }
        }
        return r;
    }, Object.create([]));
}


function CountByStatus(dados, filters, servicos) {

    const map = new Map();

    let valores = groupByCentral(dados, filters, servicos)

    //Obtem a contagem de cada central.
    let data = [];
    Object.keys(valores).forEach((item) => data.push(valores[item].length))

    map.set('labels', Object.keys(valores))
    map.set('data', data)

    return map
}


function AvgExcByCentral(dados, filters, servicos) {

    const map = new Map();

    let valores = groupByCentral(dados, filters, servicos)

    //Obtem a contagem de cada central.
    let data = [];
    Object.keys(valores).forEach((item) => data.push(mediaByExec(valores[item])))

    map.set('labels', Object.keys(valores))
    map.set('data', data)


    return map
}

function mediaByExec(lista) {

    if (lista.length === 0) {
        return 0;
    }

    let total = 0;

    for (const item of lista) {
        total += parseFloat(item.executado);
    }

    return (total / lista.length).toFixed(2);

}

