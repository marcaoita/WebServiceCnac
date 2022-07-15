# Web Service Cnac
Projeto destinago ao gerênciamento de cronograma de auditoria da CNAC. 


  <a href="https://www.linkedin.com/in/pedro-belo-70a969115/">
    <img alt="Made by Pedro Belo" src="https://img.shields.io/badge/made%20by-Pedro Belo-%23FC943D">
  </a>

  <a href="https://www.linkedin.com/in/thaina-chavarry/">
    <img alt="Made by Thaina Chavarry" src="https://img.shields.io/badge/made%20by-Thaina Chavarry-%23FC943D">
  </a>

## 🔨 Funcionalidades do projeto
- `Funcionalidade 1` `Cadastro de entidades`: O sistema permite o cadastro, edição e exclusão de 8 entidades distindas, sendo elas: Escopos, Atividades, Clientes, Colaboradores, Cargos, Férias, Feriados e Pareceres.

- `Funcionalidade 2` `Programação Vertical`: Principal funcionalidade do sistema, esta visão permite a gestão do cronograma de auditoria de maneira gráfica.
![Programação Vertical](https://user-images.githubusercontent.com/71827973/172846596-c97b961b-9c10-41f8-8a59-ebe3518b1fe4.JPG)

- `Funcionalidade 3` `Programação Horizontal`: Visão do cronograma de auditoria em tabela, bastante útil para controles gerênciais.
![Horizontal](https://user-images.githubusercontent.com/71827973/172847267-2f6c601b-9165-4320-ad99-ff719b7ceb7a.JPG)

- `Funcionalidade 4` `Controle de amostras`: O sistema permite que seja gerenciado a geração de amostras de auditoria, como qual data base foi utilizada e quando ela estará disponível.

- `Funcionalidade 5` `Envio automático de e-mails`: O sistema notifica os atores (auditores, gerentes, supervisores e csa) da programação em 5 situações, quando uma amostra está disponível, quando uma programação é prorrogada, adiantada, excluída, editada.

- `Funcionalidade 6` `Monitoramento de andamento de trabalhos`: Usando informações advindas do TeamAudit, o sistema permite que o andamento do trabalho sejam acompanhados por ele, mostrando o percentual de passos concluídos, revisados e pendentes de revisão. (informações obtidas por arquivo CSV)

- `Funcionalidade 7` `Obrigações acessórias`: O sistema permitirá a gerações de obrigações acessórias como o 7110 e 7120, arquivos em XML que são entregues ao Banco Central do Brasil. 

- `Funcionalidade 8` `Relatórios gerênciais`: O sistema possui alguns relatórios gerênciais, como controle do CSA e clientes com horas vendidas, mas sem programação.

## ✔️ Técnicas e tecnologias utilizadas

- ``Java 11``
- ``Hibernate``
- ``Spring Boot``
- ``Azure Active Directory``
- ``Azure Logic Apps``
- ``Azure SQL``
- ``Azure Web Apps``
- ``Paradigma de orientação a objetos``
- ``Thymeleaf``
- ``InteliJ IDEA``
- ``BootsTrap``
- ``Java Script``
- ``CSS``
- ``HTML``
- ``JQuery``

## 🔧 Instalação

**Variáveis de ambiente** Para que o software funcione, é necessário configuração das variáveis de ambiente descritas abaixo: 

| Variáveis     | Descrição                                                   |
| :----------- | :------------------------------------------------------------ |
| `$AZ_SQL_URL`      | String de conexão com o servidor SQL                            |
| `$AZ_SQL_SERVER_USERNAME`      | Usuário do banco de dados |
| `$AZ_SQL_SERVER_PASSWORD`       | Senha do usuário do banco de dados.                                |
| `$TENENT_ID`    | Token do Azure Active Directory.                           |
| `$CLIENTE_ID`       | ID do cliente do Azure Active Directory.                |
| `$CLIENTE_SECRET`       | Token do cliente no Azure Active Directory.                                    |
| `$AZURE_LOGIC_APP`       | Token de acesso ao Azure Logic Apps.                                  |

```bash
 #  Atribua o valor padrão
: ${AZ_SQL_URL:='default'}
: ${$AZ_SQL_SERVER_USERNAME:='default'}
: ${$AZ_SQL_SERVER_PASSWORD:='default'}
: ${$TENENT_ID:='default'}
: ${$CLIENTE_ID:='default'}
: ${$CLIENTE_SECRET:='default'}
: ${$AZURE_LOGIC_APP:='default'}
```

## 🔒 Aspectos de segurança.
- Todas as requisições ao servidor tem a autenticação como pré-requisito. 
- O MFA é imposto para todos os usuários do sistema. 
- O gerênciamento de usuários e autenticação é feito com o Azure Active Directory.
- Somente os Ip's da CNAC são permitidos à acessar o sistema. 

# test
