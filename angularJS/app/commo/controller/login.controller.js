(function() {
    angular.module('myApp').controller('LoginCtrl', ['$http', 'Msg', 'Url', 'auth', '$location', LoginController])

    function LoginController($http, Msg, Url, auth, $location) {
        const vm = this
        vm.loginMode = true
         vm.user = {
            login: 'teste',
            senha: '123456789'
        }

        //vm.changeMode = () => vm.loginMode = !vm.loginMode

        vm.logar = function() {
            auth.login(vm.user, err => {
                if (err) {
                    Msg.addError(err.data)
                } else {
                    $location.path('/ticketList')
                    Msg.addSucess('Bem-vindo', 'Logado com sucesso!')
                }
            })
        }

        /*
        vm.login = () => {
            auth.login(vm.user, err => err ? msgs.addError(err) : msgs.addSucess('Sucesso'))
        }*/
        vm.logout  = () => {
            auth.logout(() => $location.path('/'))
        }

        vm.getUser = () => auth.getUser()
        
    }
})()