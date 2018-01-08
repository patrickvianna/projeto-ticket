(function() {
    angular.module('myApp').controller('NewTicket', ['$scope', '$http', 'Ticket', 'consts', NewTicketController])

    function NewTicketController($scope, $http, Ticket, consts) {
        const vm = this

        vm.ticket

        vm.setTickets = () => {
            $http.post(`${consts.apiUrl}/setTickets`, JSON.parse(localStorage.getItem(consts.userKey)))
            .then(resp => {
                //vm.tickets = resp.data
                console.log(resp)
            }).catch(function (resp) {
                console.log(resp)
            })
        }

        vm.setTickets()
    }
})()

