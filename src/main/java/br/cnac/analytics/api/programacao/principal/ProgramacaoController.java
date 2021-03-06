package br.cnac.analytics.api.programacao.principal;

import br.cnac.analytics.api.atividade.AtividadeController;
import br.cnac.analytics.api.colaborador.ColaboradorController;
import br.cnac.analytics.api.email.EmailController;
import br.cnac.analytics.configuration.user.UsuarioSessao;
import br.cnac.analytics.domain.dao.cliente.ClienteDAO;
import br.cnac.analytics.domain.dao.programacao.ProgramacaoDAO;
import br.cnac.analytics.domain.dto.programacao.ProgramacaoDTO;
import br.cnac.analytics.service.enumeration.TipoServico;
import br.cnac.analytics.service.interfaces.colaborador.ColaboradorSimple;
import br.cnac.analytics.service.model.colaborador.Colaborador;
import br.cnac.analytics.service.model.programacao.Programacao;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @author Pedro Belo
 */

@SuppressWarnings("SameReturnValue")
@Controller
@RequestMapping("programacao/")
@PreAuthorize("hasAnyAuthority('APPROLE_gestores', 'APPROLE_gestaoPessoas', 'APPROLE_qualidade')")
public class ProgramacaoController {

    private static final String[] OFFICES = {"BH", "BSB", "SP", "CSA", "TI", "UAD"};
    private static final String[] TIPO_GESTORES = {"diretores", "gerentes", "supervisores"};
    private static final String ANO_BASE = "anoBase";
    private static final String[] GRUPO_FUNCTION = {"APPROLE_qualidade", "APPROLE_gestores", "APPROLE_gestaoPessoas"};
    private static ProgramacaoDAO componentProgramacaoDAO;
    private final ProgramacaoDAO programacaoDAO;
    private final ClienteDAO clienteDAO;

    public ProgramacaoController(ProgramacaoDAO programacaoDAO, ClienteDAO clienteDAO) {
        this.programacaoDAO = programacaoDAO;
        this.clienteDAO = clienteDAO;
    }

    /**
     * @param dtInicial   Data inicial que se deseja iniciar a programa????o.
     * @param colaborador Colaborador selecionado.
     * @param model       Html da tela
     * @return retorna a tela de cadastro de programa????o.
     */
    @PostMapping("/index")
    public String index(@RequestParam(required = false) String dtInicial,
                        @RequestParam(required = false) String colaborador, Model model) {

        Map<String, List<ColaboradorSimple>> json = ColaboradorController.getJsonColaboradores();

        model.addAttribute("programacao", new Programacao());
        setModel(model, json);

        if (dtInicial != null) {

            if (!dtInicial.equals("aN-aN-NaN - aN-aN-NaN"))
                model.addAttribute("data", dtInicial);

            model.addAttribute("colaborador", (colaborador));
        }

        return "programacao/cadastro/cadastro-programacao";
    }

    private void setModel(Model model, Map<String, List<ColaboradorSimple>> json) {
        model.addAttribute("clientes", clienteDAO.findSimple());
        model.addAttribute(ANO_BASE, AtividadeController.getYearsAvailable());

        model.addAttribute(OFFICES[0], json.get(OFFICES[0]));
        model.addAttribute(OFFICES[1], json.get(OFFICES[1]));
        model.addAttribute(OFFICES[2], json.get(OFFICES[2]));
        model.addAttribute(OFFICES[3], json.get(OFFICES[3]));
        model.addAttribute(OFFICES[4], json.get(OFFICES[4]));
        model.addAttribute(TIPO_GESTORES[0], json.get(TIPO_GESTORES[0]));
        model.addAttribute(TIPO_GESTORES[1], json.get(TIPO_GESTORES[1]));
        model.addAttribute(TIPO_GESTORES[2], json.get(TIPO_GESTORES[2]));
    }

    /**
     * @param id da programa????o
     * @return retorna a programa????o desejada, dato o ID passado como par??metro.
     */
    @PostMapping("/get-prog")
    public ResponseEntity<Programacao> getOne(@RequestParam() String id) {

        Programacao p = componentProgramacaoDAO.findOne(Long.valueOf(id));

        return ResponseEntity.ok(p);

    }

    @PostMapping("/update")
    public String update(@RequestParam() String id,
                         @RequestParam() String cnpjCliente,
                         @RequestParam() String anoBase, Model model) throws ClassNotFoundException {

        Map<String, List<ColaboradorSimple>> json = ColaboradorController.getJsonColaboradores();

        Programacao p = componentProgramacaoDAO.findOne(Long.valueOf(id));

        if (!possuiAcesso(p.getGestores(), p.getTipoServico()))
            throw new ClassNotFoundException(
                    "Voc?? n??o possui privil??gios suficientes para editar a programa????o em quest??o.");

        model.addAttribute("id", id);
        model.addAttribute("cnpjCliente", cnpjCliente);
        model.addAttribute("anoBaseSelecionado", anoBase);
        model.addAttribute("programacao", new ProgramacaoDTO());
        setModel(model, json);

        return "programacao/edicao/edicao-programacao";
    }

    /**
     * M??todo respons??vel por persistir uma programa????o no Banco de dados.
     *
     * @param programacaoDTO - Objeto do tipo <code>ProgramacaoDTO</code>
     * @param result         - Resultado da valida????o.
     * @throws BindException - ?? lan??ada caso algum campo contenha
     *                       informa????es inv??lidas.
     * @throws IOException   - ?? lan??ada caso n??o seja poss??vel enviar
     *                       e-mail.
     */
    @PostMapping("/add")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void add(@Valid ProgramacaoDTO programacaoDTO, BindingResult result)
            throws BindException, IOException {

        if (result.hasErrors()) {
            throw new BindException(result);
        }

        Programacao p = programacaoDTO.convertDTOToEntity();

        verificaAutoridade(p);

        boolean[] alteracao = new boolean[2];

        // caso se trate de uma edi????o, e-mails com as altera????es s??o disparados.
        if (programacaoDTO.getId() != null) {
            alteracao = notificaAlteracao(p);
        }

        //Caso a posi????o 1 do array seja true, a programa????o foi prorrogada, o que indica que a amostra gerada foi perdida.
        if (alteracao[1]) {
            p.setDtBase(null);
            p.setAmostraGerada(false);
        }

        Programacao atual = programacaoDAO.save(p);

        if (alteracao[0])
            EmailController.sendEmailAlocacaoEquipe(atual);

    }

    /**
     * M??todo respons??vel por notificar as altera????es ocorridas na programa????o.
     * Posi????o 0 do array indica altera????o nos colaboradores, posi????o 1 indica prorroga????o.
     *
     * @param atual Programa????o atual.
     * @return Retorna true caso haja altera????o de colaboradores especificamente.
     * @throws IOException ?? lan??ado caso haja falha no envio de e-mails.
     */
    private boolean[] notificaAlteracao(Programacao atual) throws IOException {

        boolean[] alteracao = new boolean[2];

        if (TipoServico.getServicosOperacionais().contains(atual.getTipoServico()) && atual.isAmostraGerada()) {

            Programacao anterior = componentProgramacaoDAO.findOne(atual.getId());

            //Notifica sobre a inclus??o ou exclus??o de colaborador, caso haja.
            alteracao[0] = EmailController.sendEmailAlteracaoColab(anterior, atual, UsuarioSessao.nomeUsuario());

            // Caso a programa????o tenha sido adiantada
            if (atual.getDtInicio().before(anterior.getDtInicio()))
                EmailController.sendEmailAdiantamentoProg(anterior, atual, UsuarioSessao.nomeUsuario());

            // Caso a programa????o tenha sido prorrogada.
            if (atual.getDtInicio().after(anterior.getDtInicio()))
                EmailController.sendEmailProrrogacaoProg(anterior, atual, UsuarioSessao.nomeUsuario());
            alteracao[1] = true;
        }

        return alteracao;

    }


    /**
     * M??todo respons??vel por verificar a autoridade do usu??rio que deseja adicionar ou alterar a programa????o.
     *
     * @param p Programa????o em quest??o.
     * @throws IllegalArgumentException ?? lan??ado caso o usu??rio em quest??o n??o tenha autoridade para cadastrar ou alterar a programa????o em quest??o.
     */
    private void verificaAutoridade(Programacao p) throws IllegalArgumentException {

        String userFunctionApp = UsuarioSessao.getAutoridade();

        if ((TipoServico.getServicosAusencias().contains(p.getTipoServico()))
                && (!userFunctionApp.equals(GRUPO_FUNCTION[0]) && !userFunctionApp.equals(GRUPO_FUNCTION[2])))
            throw new IllegalArgumentException(
                    "Somente ?? area de suporte organizacional poder?? cadastrar f??rias ou licen??as.");

    }

    @PostConstruct
    private void initAtividade() {
        componentProgramacaoDAO = this.programacaoDAO;
    }

    /**
     * Deleta a programa????o com ID passado como par??metro.
     *
     * @param id - Id da programa????o em quest??o.
     * @throws ClassNotFoundException ?? lan??ado caso o usu??rio n??o possua
     *                                privil??gios de exclus??o.
     * @throws IOException            ?? lan??ado caso n??o seja poss??vel enviar o
     *                                correio eletr??nico.
     */
    @PostMapping("/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@RequestParam(required = false) String id) throws ClassNotFoundException, IOException {
        try {

            Programacao p = programacaoDAO.findOne(Long.valueOf(id));

            if (TipoServico.getServicosOperacionais().contains(p.getTipoServico()) && p.isAmostraGerada())
                EmailController.sendEmailCancelamento(p, UsuarioSessao.nomeUsuario());// Notifica os atores da
            // programa????o sobre a exclus??o.

            if (possuiAcesso(p.getGestores(), p.getTipoServico())) {
                programacaoDAO.delete(Long.valueOf(id));
            } else {
                throw new ClassNotFoundException(
                        "Voc?? n??o possui privil??gios suficientes para excluir a programa????o em quest??o.");
            }

        } catch (EmptyResultDataAccessException ex) {
            throw new ClassNotFoundException("Entidade n??o encontrada no servidor de dados!");
        }
    }

    /**
     * @param cnpj  - CNPJ do cliente em quest??o.
     * @param model - HTML com o cabe??alho.
     * @return retorna o p??gina com a todas as programa????es por cliente.
     */
    @PostMapping("/modal")
    @PreAuthorize("hasAnyAuthority('APPROLE_gestores', 'APPROLE_qualidade')")
    public String modal(
            @RequestParam(value = "cnpj", required = false) String cnpj,
            @RequestParam(value = "cpf", required = false) String cpf,
            @RequestParam(value = "idProgramacao", required = false) String idProgramacao,
            @RequestParam(value = "tipo") String tipo,
            Model model) {

        model.addAttribute("cnpj", cnpj);
        model.addAttribute("cpf", cpf);
        model.addAttribute("tipo", tipo);
        model.addAttribute("idProgramacao", idProgramacao);
        model.addAttribute(ANO_BASE, AtividadeController.getYearsAvailable());

        return "programacao/modal/modal";
    }

    /**
     * @param gestores    - Gestores da cooperativa em quest??o
     * @param tipoServico Tipo de servi??o em quest??o.
     * @return Retorna true se o usu??rio em quest??o possuir privil??gios de edi????o ou
     * exclus??o
     */
    private boolean possuiAcesso(Set<Colaborador> gestores, TipoServico tipoServico) {

        if (UsuarioSessao.getAutoridade().equals(GRUPO_FUNCTION[0]))
            return true;

        //A area de gerenciamento de pessoas podem editar as programa????es nos tipos definidos abaixo.
        if (UsuarioSessao.getAutoridade().equals(GRUPO_FUNCTION[2])
                && (tipoServico.equals(TipoServico.FERIAS) || tipoServico.equals(TipoServico.LICENCA) || tipoServico.equals(TipoServico.TREINAMENTO)))
            return true;

        List<String> g = gestores.stream().map(Colaborador::getNome).toList();

        return g.contains(UsuarioSessao.nomeUsuario());

    }

}
