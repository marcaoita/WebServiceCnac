/**
 * @return Função responsável por formatar a data passada como parâmetro da seguinte maneira: DD-MM-AAAA
 *
 * */
function dataformat(data) {
    if (data == null) return null;

    return (
        data.getDate().toString().padStart(2, "0") +
        "-" +
        (data.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        data.getFullYear()
    );
}

/**
 * Retorna o dia da semana dado uma data passada como parâmetro.
 * @param date data do tipo <code>Date</code>.
 * */
function diaDaSemana(date) {
    return [
        "Domingo",
        "Segunda-Feira",
        "Terça-Feira",
        "Quarta-Feira",
        "Quinta-Feira",
        "Sexta-Feira",
        "Sábado",
    ][new Date(date).getDay()];
}

/**
 * Determina a quantidade  de colunas na Grid dado a quantidade de colaboradores passados como parâmetro.
 * @param quantColab - Quantidade de colaboradores.
 * */
function setColumns(quantColab) {

    let find = document.querySelector("#colaboradoresDashBoard");

    find.style.display = "grid";
    find.style.marginLeft = "3px";
    find.style.gridTemplateColumns = "repeat(" + (quantColab + 3) + ",136px)";
}

/**
 * localiza a coluna do colaborador passado como parâmetro
 * @param cpf - CPF do colaborador.
 * */
function getColumColaborador(cpf) {
    /* localiza a coluna do colaborador passado como parâmetro */
    return document.querySelector("[colaborador=" + '"' + cpf + '"]');
}

/**
 * @param initialDate - Data inicial da programação.
 * Obtem a posição da data inicial em que se deseja programar.
 */
function getInitialDate(initialDate) {
    return document.querySelector(
        "[data-id=" + "'" + dataformat(initialDate) + "'" + "]"
    );
}

/**
 *
 * @return Retorna o tamanho que o bloco deve ter. O tamanho é determinado pela diferença entre a data inicial e final (inclusive) multiplicado pela altura das células de datas
 * @param dtInicial - Data inicial da programação.
 * @param dtFinal - Data final da programação.
 * @param heightDate - Altura em PX das datas.
 *
 */
function getBlockHeight(dtInicial, dtFinal, heightDate) {

    let dia = 24 * 60 * 60 * 1000; // Um dia em milisegundos.
    let diff = Math.abs(dtFinal.getTime() - dtInicial.getTime()) / dia;

    return heightDate * (diff + 1);
}
