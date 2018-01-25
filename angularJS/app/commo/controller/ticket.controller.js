(function(){
angular.module('myApp').controller('TicketCtrl', ['$scope', '$http', '$location', 'consts', '$state', 'Msg', '$q', 'ticketService', '$rootScope', TicketController])

function TicketController($scope, $http, $location, consts, $state, Msg, $q, ticketService, $rootScope){
    const vm = this

    vm.tickets = {
        tarefas : ''
    }

    const vr=  {
        idUser: JSON.parse(localStorage.getItem(consts.userKey)), 
        init: '', 
        max: 10, 
        project : ''
    }

    vm.projetos = {
        lista : [],
        selectedOption: {id: '', name: ''} //This sets the default value of the select in the ui
    }

    vm.pager = {
        atualPage : '',
        totalItens : '',
        totalPages : '',
        startPage: '',							
        endPage: '',								
        startIndex: '',							
        endIndex: '',								
        pages: ''
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

    vm.getTicketProject = (atualPage = 1) => {
        vr.project = vm.projetos.selectedOption.id
        vr.init = atualPage
        
        $http.post(`${consts.apiUrl}/getTicketProject`, vr)
        .then(resp => {
            vm.tickets.tarefas = resp.data.issues
            vm.pager.totalItens = resp.data.total_count
            vm.pager = pagination(atualPage, vm.pager.totalItens)
            console.log(vm.pager)
        }).catch(function (resp) {
            Msg.addError('Não foi possível carregar os tickets')
        })
    }

    const pagination = (atualPage, totalItens) => {
        const pageSize =  10;											        //QUANTIDADE DE ITENS DA PAGINA
        // calculate total pages
        let totalPages = Math.ceil(totalItens / pageSize);				//CALCULO DA QUANTIDADE DE PAGINAS
        let startPage, endPage;												//START PRIMEIRA E ULTIMA PAGINAS
        
        if (totalPages <= 10) {											    //SE TIVER MENOS QUE 10 PAGINAS MOSTRE TUDO
            startPage = 1;													//A PRIMEIRA PAGINA VAI SER 1
            endPage = totalPages;											//A ULTIMA VAI SER O NUMERO DO TOTAL
        }else {                                                                 //MAIS QUE 10 PARA CALCULAR AS PAGINAS DE INICIO E O FIM
            if (atualPage <= 6) {										///SE A PAGINA ATUAL FOR MENOR OU IGUAL A 6
                startPage = 1;													//A PRIMEIRA PAGINA RECEBE 1
                endPage = 10;													//A ULTIMA PAGINA RECEBE 10
            }    
            else if (atualPage+ 4 >= totalPages) {						    //SE A (PAGINA ATUAL + 4) FOR MAIOR OU IGUAL AO TOTAL DE PAGINAS
                startPage = totalPages - 9;										//A PRIMEIRA PAGINA RECEBE O TOTAL DE PAGINAS MENOS 9
                endPage = totalPages;											//A ULTIMA PAGINA RECEBE O TOTAL DE PAGINAS
            } else {                                                            //SE NAO    
                startPage = atualPage - 5;							    //A PRIMEIRA PAGINA RECEBE A PAGINA ATUAL MENOS 5
                endPage = atualPage + 4;									//A ULTIMA PAGINA RECEBE A PAGINA ATULA MAIS 4
            }																	
        }
        // calculate start and end item indexes								    --CALCULANDO O ITEM DO COMEÇO E DO FINAL
        let startIndex = (atualPage - 1) * pageSize;					    //O PRIMEIRO INDEX RECEBE A (PAGINA ATUAL -1) VEZES O TAMANHO DA PAGINA
        let endIndex = Math.min(startIndex + pageSize - 1, totalItens - 1);	//O ULTIMO INDEX RECEBE O MENOR VALOR DENTRE (O PRIMEIRO INDEX + TAMANHO DA PAGINA -1, OU TOTAL DE ITENS -1)
    
        // create an array of pages to ng-repeat in the pager control		    --CRIA UM ARRAY DE PAGINAS PARA O NG-REPEAT NO CONTROLLER
        let pages = [];
        for(let i = startPage; i <= endPage; i++)                               //FOR PARA PEGAR TODAS AS PAGINAS, DO INICIO AO FIM
        {
            pages.push(i);
        }
        // return object with all pager properties required by the view		--RETORNA UM OBJETO COM TODAS PROPRIEDADES
        return {
            //totalItems: $rootScope.tot,										//TOTAL DE ITENS
            //currentPage: $rootScope.atual,									//PAGINA ATUAL
            atualPage,
            pageSize: pageSize,												//TAMANHO DE ITENS DA PAGINA
            totalPages: totalPages,											//TOTAL DE PAGINAS
            startPage: startPage,											//PRIMEIRA PAGINA
            endPage: endPage,												//ULTIMA PAGINA
            startIndex: startIndex,											//PRIMEIRO ITEM DA PAGINA
            endIndex: endIndex,												//ULTIMO ITEM DA PAGINA
            pages: pages													//PAGINA
        };
    }

    //CHAMADA DAS FUNÇÕES
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