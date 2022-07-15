// noinspection JSValidateTypes,JSCheckFunctionSignatures

/**
 * @author Pedro Belo
 * @return retorna as horas vendidas calculadas.
 */
function getHorasVendidas() {

    let horasVendidas = 0;

    $("#atividades")
        .find("option")
        .each(function () {
            horasVendidas += parseFloat($(this).data("valor"));
        });

    if (horasVendidas === "") {
        return 0;
    } else {
        return parseFloat(horasVendidas);
    }
}

function getHorasSelecionadas() {
    let horasSelecionadas = 0;

    $("#atividades")
        .find(":selected")
        .each(function () {
            let valor = parseFloat($(this).data("valor"));
            horasSelecionadas += isNaN(valor) ? 0 : valor;
        });

    if (horasSelecionadas === "") {
        return 0;
    } else {
        return parseFloat(horasSelecionadas);
    }
}

/**
 * @author Pedro Belo
 * seta os valores recebidos pelo BackEnd no Front.
 * @param {Number} horasJaAlocadas Horas que já foram alocadas ao tipo de serviço.
 * @param {Number} horasSimuladas Horas que foram simuladas pelo BackEnd.
 */
function setValores(horasSimuladas, horasJaAlocadas) {

    const DIA = 8;

    let diasContratados = getHorasVendidas() / DIA;
    let diasSelecionados = getHorasSelecionadas() / DIA;

    let temCSA = $("#hasCSA").find(":selected").val();

    let tipoServico = $("#tipoServicoCadastro").find(":selected").val();

    if (temCSA === 'true' && tipoServico !== 'CSA') {
        diasContratados = diasContratados * 0.75;
        diasSelecionados = diasSelecionados * 0.75;

        let horasMaximasCSA = 4.0;
        let horasCalCSA = (diasContratados * 0.25);
        let horasSelCSA = (diasSelecionados * 0.25);

        diasSelecionados = Math.round((diasSelecionados - Math.min(horasMaximasCSA, horasSelCSA)))
        diasContratados = Math.round((diasContratados - Math.min(horasMaximasCSA, horasCalCSA)))

    }

    if (temCSA === 'false' && tipoServico !== 'CSA') {
        diasContratados = Math.round(diasContratados * 0.75);
        diasSelecionados = Math.round(diasSelecionados * 0.75);
    }

    if (tipoServico === 'CSA') {
        diasContratados = diasContratados * 0.75;
        diasSelecionados = diasSelecionados * 0.75;

        let horasMaximasCSA = 4.0;
        let horasCalCSA = (diasContratados * 0.25);
        let horasSelCSA = (diasSelecionados * 0.25);

        diasSelecionados = Math.round((Math.min(horasMaximasCSA, horasSelCSA)))
        diasContratados = Math.round((Math.min(horasMaximasCSA, horasCalCSA)))
    }


    let diasProgramados;

    if (tipoServico === 'CSA') {

        diasProgramados = (((parseFloat(horasJaAlocadas) + parseFloat(horasSimuladas)) / DIA) / 0.5)
    } else {
        diasProgramados = parseInt((parseFloat(horasJaAlocadas) + parseFloat(horasSimuladas)) / DIA)
    }


    let saldoDias = diasContratados - diasProgramados

    document.getElementById("diasSelecionados").innerHTML = diasSelecionados;
    document.getElementById("diasProgramados").innerHTML = diasProgramados;
    document.getElementById("saldoDias").innerHTML = saldoDias;
}

/**
 * @author Pedro Belo
 * Chama a função responsável por calcular a data final sugerida, antes é verificado que hà colaboradores selecionados.
 */
function getDataMaxima() {

    if (getSelection().colaboradoresIds.length > 0) {
        dataFinalSugerida();
    } else {
        let dtInicial = dateformat(dataPicker.getDate());
        dataPicker.setDateRange(dtInicial, dtInicial);
        $(".alerta").text("");
    }
}

/**
 * @author Pedro Belo
 * @return retorna um JSON com os dados selecionados pelo usuário no cadastro de programação.
 */
function getSelection() {

    let gestores = $("#gestores");
    let colaboradores = $("#colaboradores");
    let atividades = $("#atividades");

    return {
        id: $("#idProgramacao").val(),
        atraso: $("#atraso").val(),
        anoBase: $("#anoBaseCadastro").find(":selected").val(),
        dtBase: $("#dtBase").val(),
        amostraGerada: $("#amostraGerada").find(":selected").val(),
        temCSA: $("#hasCSA").find(":selected").val(),
        tipoServico: $("#tipoServicoCadastro").find(":selected").val(),
        cnpjCliente: $("#clienteDisp").find(":selected").val(),
        horas: getHorasSelecionadas(),
        dtInicio: dateformat(dataPicker.getDate()),
        dtFim: dateformat(dataPicker.getEndDate()),
        dtInicioExe: dateformat(dataPickerExec.getDate()),
        dtFimExe: dateformat(dataPickerExec.getEndDate()),
        gestoresIds: gestores
            .find(":selected")
            .map(function () {
                return this.value;
            })
            .toArray(),
        colaboradoresIds: colaboradores
            .find(":selected")
            .map(function () {
                return this.value;
            })
            .toArray(),
        csaIds: $("#csa")
            .find(":selected")
            .map(function () {
                return this.value;
            })
            .toArray(),
        horasAtividades: atividades
            .find(":selected")
            .map(function () {
                return $(this).data("valor");
            })
            .toArray(),

        emailGestores: gestores
            .find(":selected")
            .map(function () {
                return $(this).data("valor");
            })
            .toArray(),

        emailColaboradores: colaboradores
            .find(":selected")
            .map(function () {
                return $(this).data("valor");
            })
            .toArray(),

        areaColaboradores: colaboradores
            .find(":selected")
            .map(function () {
                return $(this).data("area");
            })
            .toArray(),

        areaGestores: gestores
            .find(":selected")
            .map(function () {
                return $(this).data("area");
            })
            .toArray(),

        escoposAtividades: atividades
            .find(":selected")
            .map(function () {
                return this.value;
            })
            .toArray(),
        tipoVisita: $("#tipoVisita").find(":selected").val(),
        escritorio: $("#escritorio").find(":selected").val()
    };
}