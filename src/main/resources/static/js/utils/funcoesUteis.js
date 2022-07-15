// noinspection JSUnusedGlobalSymbols

/**
 * @param  date no formato AAAA-MM-DD
 * @return Retorna a data no formato invertido DD-MM-AAAA
 * */
function dataAtualFormatada(date) {

    if (date == null)
        return null;

    return date.split("-").reverse().join("-")
}

function convertBoolean(item) {
    if (item) {
        return "SIM"
    } else {
        return "NÃO"
    }
}