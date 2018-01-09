(function() {
    angular.module('myApp').controller('NewTicket', ['$scope', '$http', 'Ticket', 'consts', 'Msg', NewTicketController])

    function NewTicketController($scope, $http, Ticket, consts, Msg) {
        const vm = this

        vm.severidade = {
            idSeveridade: null,
            availableOptions : [
                            {model: 1, severidade: "Baixa"},
                            {model: 2, severidade: "Média"},
                            {model: 3, severidade: "Alta"},
                            {model: 4, severidade: "Urgente"},
                            {model: 5, severidade: "Imediata"}
        ]}
        vm.tipo = {
            idTipo: null,
            availableOptions : [
                            {model: 1, tipo: "Bug"},
                            {model: 2, tipo: "Funcionalidade"},
                            {model: 3, tipo: "Suporte"}
                            
        ]}
        vm.projeto = {
            idProjeto: null,
            availableOptions : [
                            {model: 1, projeto: "Teste"}
        ]}                   
        vm.tarefa = {
            idUser: '',
            titulo: '',
            descricao : '',
            tipo: '',
            severidade: '',
            projeto: ''            
        }

        vm.setTickets = () => {
            vm.tarefa.tipo = vm.tipo.idTipo
            vm.tarefa.severidade = vm.severidade.idSeveridade
            vm.tarefa.projeto = vm.projeto.idProjeto
            vm.tarefa.idUser = JSON.parse(localStorage.getItem(consts.userKey)).id
            console.log(vm.tarefa)
            $http.post(`${consts.apiUrl}/setTickets`, vm.tarefa)
            .then(resp => {
                //vm.tickets = resp.data
                console.log(resp)
                Msg.addSucess('Criado com sucesso')
            }).catch(function (resp) {
                console.log(resp)
                Msg.addError('Ops, houve algo de errado')
            })
        }
    }
})()

