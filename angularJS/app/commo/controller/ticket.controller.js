(function(){
angular.module('myApp').controller('TicketCtrl', ['$scope', '$http', 'Ticket', 'consts', TicketController])

function TicketController($scope, $http, Ticket, consts){
    //import  Ticket  from ('./../model/Ticket')
    const vm = this

    
    //let ticket = new Ticket(0)
    //let ticket = new Ticket()
    //console.log(ticket)

    /*vm.getSummary = function(){ 
        const ar = {
            method: 'GET',
            url: "http://local.pentago.com.br:81/redmine/users.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238" 
        }       
        const url = "http://redmine:81/redmine/users.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238" //"http://localhost:3003/api/billingSummary"
        
        $http.get(url).then(function(data) { 
            //const {credit =0, debt = 0 } = response.data
            //vm.credit = credit
            //vm.debt = debt
            //vm.total = credit - debt
            
            console.log(data)
        }).catch(function(data){
            console.log(data)
        })

        
    }

    vm.getSummary()*/

    function getTickets() {
        $http.post(`${consts.apiUrl}/getTickets`, JSON.parse(localStorage.getItem(consts.userKey)))
        .then(resp => {
            /*localStorage.setItem(consts.userKey, JSON.stringify(resp.data))
            $http.defaults.headers.common.Authorization = resp.data.token*/
            vm.tickets = resp.data
            console.log(vm.tickets)
        }).catch(function (resp) {
            /*if (callback) {
                console.log(resp)
                //callback(resp, null)  
             }*/console.log(resp)
        })
    }

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