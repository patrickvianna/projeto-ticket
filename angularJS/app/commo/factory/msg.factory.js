(function() {
    angular.module('myApp').factory('Msg', ['toastr', msgFactory])

    function msgFactory(toastr) {
        function addMsg(msgs, title, method) {
            if(msgs instanceof Array) {
                msgs.forEach(msg => toastr[method](msg, title))
            }else {
                toastr[method](msgs, title)
            }
        }

        function addSucess(msgs, titulo = 'Sucesso') {
            addMsg(msgs, titulo, 'success')
        }

        function addError(msgs, titulo = 'Erro') {
            addMsg(msgs, titulo, 'error')
        }

        return { addSucess, addError }
    }
})()