(function() {
    angular.module('myApp').controller('NewTicket', ['$scope', '$http', 'Ticket', 'consts', 'Msg', '$state', NewTicketController])

    function NewTicketController($scope, $http, Ticket, consts, Msg, $state) {
        const vm = this

        vm.severidade = {
            idSeveridade: null,
            availableOptions : [
                            {model: 1, severidade: "Baixa"},
                            {model: 2, severidade: "Normal"},
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
        vm.projetos = {
            lista : [],
            selectedOption: {id: '', name: ''} 
        }

        vm.tarefa = {
            idUser: '',
            titulo: '',
            descricao : '',
            tipo: '',
            prioridade: '',
            projeto: ''            
        }

        vm.setTickets = () => {
            vm.tarefa.tipo = vm.tipo.idTipo
            vm.tarefa.prioridade = vm.severidade.idSeveridade
            vm.tarefa.projeto = vm.projetos.selectedOption.id
            vm.tarefa.idUser = JSON.parse(localStorage.getItem(consts.userKey)).id
            $http.post(`${consts.apiUrl}/setTickets`, vm.tarefa)
            .then(resp => {
                //vm.tickets = resp.data
                console.log(resp)
                $state.go('ticketList')
                Msg.addSucess('Criado com sucesso')
            }).catch(function (resp) {
                console.log(resp)
                Msg.addError('Ops, houve algo de errado')
            })
        }

        function getProjetos() {
                $http.post(`${consts.apiUrl}/getProjetos`, JSON.parse(localStorage.getItem(consts.userKey)))
                .then(resp => {
                    vm.projetos.lista = resp.data
                    vm.projetos.selectedOption = resp.data[0] || ''
                    console.log(resp.data)
                }).catch(resp => {
                    Msg.addError('Não foi possível carregar os projetos')
                })
            }
        

        getProjetos()
    }
})()

