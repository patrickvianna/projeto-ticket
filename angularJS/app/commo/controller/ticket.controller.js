(function(){
angular.module('myApp').controller('TicketCtrl', ['$scope', '$http', '$location', 'consts', '$state', 'Msg', TicketController])

function TicketController($scope, $http, $location, consts, $state, Msg){
    const vm = this

    vm.tickets = {
        tarefas : ''
    }

    const vr=  {
        idUser: JSON.parse(localStorage.getItem(consts.userKey)), 
        init: 0.1, 
        max: 10
    }

    function getTickets() {
        $http.post(`${consts.apiUrl}/getTickets`, vr)
        .then(resp => {
            vm.tickets.tarefas = resp.data
        }).catch(function (resp) {
            Msg.addError('Não foi possível carregar os tickets')
        })
    }

    vm.verTicket =  (idTicket) => {
        //REDIRECIONA PARA A ROTA DO TICKET
        //$location.path('/detalhe-ticket/' + idTicket);
        $state.go('ticketDetalhe',{ idTicketRota: idTicket })
    };

    getTickets()

}
})()


/*
$http({
     url: user.details_path, 
     method: "GET",
     params: {user_id: user.id}  
});
*/