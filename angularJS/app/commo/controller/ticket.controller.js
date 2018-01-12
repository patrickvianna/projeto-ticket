(function(){
angular.module('myApp').controller('TicketCtrl', ['$scope', '$http', '$location', 'consts', '$state', TicketController])

function TicketController($scope, $http, $location, consts, $state){
    const vm = this

    vm.tickets = {
        tarefas : ''
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