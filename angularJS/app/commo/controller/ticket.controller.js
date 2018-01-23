(function(){
angular.module('myApp').controller('TicketCtrl', ['$scope', '$http', '$location', 'consts', '$state', 'Msg', '$q', TicketController])

function TicketController($scope, $http, $location, consts, $state, Msg, $q){
    const vm = this

    vm.tickets = {
        tarefas : ''
    }

    const vr=  {
        idUser: JSON.parse(localStorage.getItem(consts.userKey)), 
        init: 0.1, 
        max: 10, 
        project : ''
    }

    vm.projetos = {
        lista : [],
        selectedOption: {id: '', name: ''} //This sets the default value of the select in the ui
    }
    
    function getTickets() {
        $http.post(`${consts.apiUrl}/getTickets`, JSON.parse(localStorage.getItem(consts.userKey)))
        .then(resp => {
            vm.tickets.tarefas = resp.data
        }).catch(function (resp) {
            //console.log(resp)
        })
    }

    vm.verTicket =  (idTicket) => {
        //REDIRECIONA PARA A ROTA DO TICKET
        //$location.path('/detalhe-ticket/' + idTicket);
        $state.go('ticketDetalhe',{ idTicketRota: idTicket })
    }

    function getProjetos() {
        console.log('ENTREI')
        return $q(function(resolve, reject) {
            $http.post(`${consts.apiUrl}/getProjetos`, JSON.parse(localStorage.getItem(consts.userKey)))
            .then(resp => {
                vm.projetos.lista = resp.data
                vm.projetos.selectedOption = resp.data[0] || ''
                resolve()
            }).catch(resp => {
                Msg.addError('Não foi possível carregar os projetos')
                reject()
            })
        })
    }

    vm.getTicketProject = () => {
        vr.project = vm.projetos.selectedOption.id
        console.log(vr)
        $http.post(`${consts.apiUrl}/getTicketProject`, vr)
        .then(resp => {
            console.log(resp.data)
            vm.tickets.tarefas = resp.data
        }).catch(function (resp) {
            Msg.addError('Não foi possível carregar os tickets')
        })
    }

    getProjetos()
    .then(function(greeting){
        vm.getTicketProject()
    })

    //getTickets()

}
})()


/*
$http({
     url: user.details_path, 
     method: "GET",
     params: {user_id: user.id}  
});
*/