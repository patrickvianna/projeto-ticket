angular.module('myApp').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 
    function($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider.state('ticketList',{
            url: "/ticketList",
            templateUrl: "template/ticket.list.html"
        })
        .state('newTicket', {
            url: "/newTicket",
            templateUrl: "template/ticket.new.html"
        }).state('login', {
            url: "/login",
            templateUrl: "template/login.html"
        }).state('ticketDetalhe', {
            url:'/detalhe-ticket/:idTicketRota', 
            templateUrl: 'template/ticket.detail.html'
        })

        //$urlRouterProvider.otherwise('/ticketList')

        $httpProvider.interceptors.push('handleResponseError')
    }])

    .run(['$rootScope','$http', '$location', '$window', 'auth', function ($rootScope, $http, $location, $window, auth) {
        validateUser()
        $rootScope.$on('$locationChangeStart', () => validateUser())

        
        function validateUser() {
            const user = auth.getUser()
            const authPage = '/auth.html'
            const isAuthPage = $window.location.href.includes(authPage)
            
            if(!user && !isAuthPage) {                
                $window.location.href = authPage
            } else if (user && !user.isValid) {                
                auth.validateToken(user.token, (err, valid) => {
                    if(!valid) {
                        $window.location.href = authPage
                    } else {
                        user.isValid = true
                        $http.defaults.headers.common.Authorization = user.token
                        isAuthPage ? $window.location.href = '/' : $location.path('/ticketList')
                    }
                })
                
            }
        }
    }])