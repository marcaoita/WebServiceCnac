
/**
 * @author Pedro Belo
 * @return Retorna um JSON com os filtros selecionados pelo usuário.
 */
function getFilters() {

    let mes = $("#mes option:selected")
        .map(function () {
            return this.value;
        })
        .toArray();

    let areas = $("#areas option:selected")
        .map(function () {
            return this.value;
        })
        .toArray();

    let escritorios = $("#escritorios option:selected")
        .map(function () {
            return this.value;
        })
        .toArray();

    let escritorioColaborador = $("#colaboradorEscritorio option:selected")
        .map(function () {
            return this.value;
        })
        .toArray();

    let tipoServico = $("#tipoServico option:selected")
        .map(function () {
            return this.value;
        })
        .toArray();

    let anoBase = $("#anoBase option:selected").val();

    //Em alguns casos há mais de um tipo de ano Base na página, por exemplo, o ano Base de filtro e o ano Base de formulário.
    if(anoBase === undefined)
        anoBase = $("#anoBaseVisualizacao option:selected").val()

    let gestores = $("#gestoresFilter option:selected")
        .map(function () {
            return this.value;
        })
        .toArray();

    let amostra = $("#amostra option:selected").val();

    let cargos = $("#cargos option:selected")
        .map(function () {
            return this.value;
        })
        .toArray();

    let status = $("#status option:selected")
        .map(function () {
            return this.value;
        })
        .toArray();

    return {
        offices: escritorios,
        tipoServico: tipoServico,
        anoBase: anoBase,
        gestores: gestores,
        escritorioColaborador: escritorioColaborador,
        amostra: amostra,
        mes: mes,
        cargos: cargos,
        areas: areas,
        status: status
    };
}
