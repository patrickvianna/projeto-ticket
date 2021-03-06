(function() {
    angular.module('myApp').controller('DetailCtrl', ['$http', 'consts', '$scope', DetailController])

    function DetailController ($http, consts) {

        const vm = this
        const rota = 47

        vm.tarefa = {

        }

        vm.coment = ''
        vm.comentsLs = []         
        
        let data = new Date()
        
        function callTicket () {   
            $http.post(`${consts.apiUrl}/getDetail`, {rota})
            .then(function(resp){
                vm.tarefa = resp.data.issue
                console.log(vm.tarefa)
            }).catch(function(resp){
                console.log(resp)
            })
        }

        vm.addComent = () => {
            console.log("ENTREI NO COMENTARIO")
            let comentario = {
                descricao : vm.coment,
                dateCreate : '12/01/2018 16:27'
            } 
            vm.comentsLs.push(comentario)
            vm.coment = ''
            console.log(vm.comentsLs)
        }


        vm.close = () => {
            vm.$dismiss({
                reason: 'cancel'
            })
        }
        callTicket()
    }
})()