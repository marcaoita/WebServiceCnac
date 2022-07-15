// noinspection JSUnresolvedVariable

function arrayColaborador(c) {
    /**
     * @author Pedro Belo
     * Função responsável por iterar as programações do colaborador passado como parâmetro
     * @param c Objeto do tipo <code>Colaborador</code>
     */

    let size = c.programacoes.length;

    montaColunaColaborador(c);

    if (size > 0) {
        for (let j in c.programacoes) {
            geraBlocos(
                c.programacoes[j],
                c.nome,
                c.cpfCnpj
            );
        }
    }

    if (c.programacoesParalelas.length > 0) {
        programacoesParalelas(
            c.nome,
            c.programacoesParalelas
        );
    }

}

function montaColunaColaborador(c) {
    let divElementPai = document.createElement("div");
    let divElement = document.createElement("div");
    let h = document.createElement("p");
    h.classList.add("nome-colaborador");
    let t = document.createTextNode(c.nome + ' - ' + c.escritorioOrigem);
    divElement.setAttribute("colaborador", c.nome);
    divElement.setAttribute("cpf", c.cpfCnpj);
    h.setAttribute("cpf", c.cpfCnpj);
    divElement.classList.add("colaboradores");
    divElement.classList.add("colaboradores-index");
    divElementPai.appendChild(divElement);
    h.appendChild(t);
    divElement.appendChild(h);

    if(c.statusAtual !== 'Ativo') {
        divElement.style.background = '#bbbbbb'
    }


    let findCol = document.getElementById("colaboradoresDashBoard");

    if (findCol != null) findCol.appendChild(divElement);
}
  
 