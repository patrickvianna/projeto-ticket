(function() {
    angular.module('myApp').factory('Url', function() {
    
        // /users.json – Utilizar este método para retornar todos os usuários em formato jSON; Acesse o link para ver o resultado 
        function userAll(){
            return "http://redmine:81/redmine/users.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238"
        } 

        // /projects.json – Este método retorna TODOS os projetos em formato json. Acesse o link e veja o resultado 
        function projectAll() {
            return "http://redmine:81/redmine/projects.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238"
        }
        
        ///projects/idProject/memberships.json – Este método retorna TODOS os usuários que são membros de um determinado projeto, passado como idProjeto em formato jSON. Acesse o link e veja os usuários membros do projeto TESTE 
        function usersProject(projeto){
            return "http://redmine:81/redmine/projects/"+ projeto +"/memberships.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238"
        }

        /* /issues.json – Este método invocado por POST cria uma atividade no REDEMINE o formato dos parâmetros de envio deverão ser em jSON;
        Maiores informações acesse a documentação: http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Creating-an-issue
        */

        function validarUsuario(login) {
            return "http://redmine:81/redmine/users.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238&name=" + login
        }
        
        return { userAll, projectAll, usersProject, validarUsuario }
    })
})()


/* // /users.json – Utilizar este método para retornar todos os usuários em formato jSON; Acesse o link para ver o resultado 
const userAll = "http://redmine:81/redmine/users.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238"

// /projects/idProject/memberships.json – Este método retorna TODOS os usuários que são membros de um determinado projeto, passado como idProjeto em formato jSON. Acesse o link e veja os usuários membros do projeto TESTE 
const userProjeto =  "http://redmine:81/redmine/projects/1/memberships.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238"
 
/issues.json – Este método invocado por POST cria uma atividade no REDEMINE o formato dos parâmetros de envio deverão ser em jSON;
Maiores informações acesse a documentação: http://www.redmine.org/projects/redmine/wiki/Rest_Issues#Creating-an-issue
 

Formulário de autenticação de usuários:
Para autenticar um usuário usando a API, faça chamada ao método /users.xml ou /users.json passando como parâmetro a KEY fornecida à cima e o filtro “name” que deve conter o username passado pelo formulário exemplo: http://redmine:81/redmine/users.xml?key=683ad157ea69a8e9d8b5db20782b92fd1267e238&name=teste

Para listar no dropdown os projetos do usuário usando a API, faça chamada ao método /projects.xml ou /projects.json passando como parâmetro a KEY fornecida à cima. Exemplo: http://redmine:81/redmine/projects.xml?key=683ad157ea69a8e9d8b5db20782b92fd1267e238
 */

