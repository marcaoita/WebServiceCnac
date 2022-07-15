/**
 * @param {String} date String no formato AAAA-MM-DD
 * @returns retorna uma String no formato DD-MM-AAAA
 */
function convertFormatDate(date) {
  if(date == null)
      return null;
  return date.split("-").reverse().join("-");
}
 
function zeraValores() {
    document.getElementById("diasSelecionados").innerHTML = '0';
    document.getElementById("diasProgramados").innerHTML = '0';
    document.getElementById("saldoDias").innerHTML = '0';
}

/**
 * 
 * @param {*} date objeto do tipo date
 * @returns Converte um objeto do tipo date para uma string no formato DD-MM-AAAA
 */
function dateformat(date) {
    if (date == null) return null;
  
    return (
      date.getDate().toString().padStart(2, "0") +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getFullYear()
    );
}

