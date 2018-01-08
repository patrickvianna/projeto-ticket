angular.module('myApp').constant('consts', {
    appName: 'Projeto ticket',
    version: '1.0',
    owner: 'Patrick',
    year: '2018',
    site: '',
    apiUrl: 'http://localhost:3003/api',
    oapiUrl: 'http://localhost:3003/oapi',
    userKey: '_my_app_user'
}).run(['$rootScope', 'consts', function ($rootScope, consts) {
    $rootScope.consts = consts
}])