function Feriado (dtRecesso, nome, tipoFeriado) {
    this.dtRecesso = dtRecesso;
    this.nome = nome;
    this.tipoFeriado = tipoFeriado;
}

Feriado.prototype.toString = function feriadoToString() {
    return 'Feriado: ' + this.nome + ', dia: ' + this.dtRecesso + ', tipo: ' + this.tipoFeriado + '\n';
}