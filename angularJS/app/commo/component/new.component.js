angular.module('myApp')
    .component('newModal', {
        template: `<div class="modal-header">
        <button type="button" ng-click="$ctrl.handleClose()" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span></button>
        <h2 class="modal-title">Novo ticket</h2>
      </div>
    <!-- HEADER -->
    
    <!--div class="jumbotron">
    <div class=" row">
    <div class="col-xs-10 col-xs-offset-1 col-md-10 col-md-offset-1 "-->
    <div class="jumbotron ">	
     
        <form name="ticketForm">
            <h2>Insira um Ticket</h2>
            <input class="form-control" type="text" ng-model="$ctrl.tarefa.titulo" name="title" placeholder="Título" ng-required="true" ng-minlength="10" ng-maxlength="50"required/>
            <div class="row">
                <div class="col-xs-12 col-md-4">
                    Tipo: 
                    <select class="form-control" name="mySelectTipo" id="mySelectTipo"
                            ng-options="option.name for option in $ctrl.tipo.lista track by option.id"
                            ng-model="$ctrl.tipo.selectedOption"
                            required>
                    </select>
                </div>
                <div class="col-xs-12 col-md-4">
                    Severidade: 
                    <select class="form-control" name="repeatSelect" id="repeatSelect" ng-model="$ctrl.severidade.idSeveridade" ng-required="true" required>
                        <option ng-repeat="option in $ctrl.severidade.availableOptions" value="{{option.model}}">{{  option.severidade  }}</option>
                    </select>
                </div>
                <div class="col-xs-12 col-md-4">
                    Projeto: 
                    <select class="form-control" name="mySelect" id="mySelect"
                            ng-options="option.name for option in $ctrl.projetos.lista track by option.id"
                            ng-model="$ctrl.projetos.selectedOption"
                            required>
                    </select>
                </div>
            </div>	
        </form>
        <textarea class="form-control" ng-model="$ctrl.tarefa.descricao" name="Descricao" form="contatoForm" placeholder="Descrição" maxlength="500" required></textarea>
     
        <button class="btn btn-primary btn-block" ng-click="$ctrl.setTickets()" >Adicionar Ticket</button> <!-- ng-disabled="!contatoForm.$valid"-->
    
    <!--/div>
    </div>
    </div-->`,
        bindings: {
            $close: '&',
            $dismiss: '&',
            projetos: '<'
        },
        controller: ['$http', 'consts', 'Msg', function($http, consts, Msg) {
            var $ctrl = this;

            $ctrl.severidade = {
                idSeveridade: null,
                availableOptions : [
                                {model: 1, severidade: "Baixa"},
                                {model: 2, severidade: "Normal"},
                                {model: 3, severidade: "Alta"},
                                {model: 4, severidade: "Urgente"},
                                {model: 5, severidade: "Imediata"}
            ]}
            $ctrl.tipo = {
                lista : [],
                selectedOption: {id: '', name: ''}
            }

            $ctrl.tarefa = {
                idUser: '',
                titulo: '',
                descricao : '',
                tipo: '',
                prioridade: '',
                projeto: ''            
            }
    
            $ctrl.setTickets = () => {
                console.log($ctrl.tarefa)
                if($ctrl.tarefa.titulo == null || $ctrl.tarefa.titulo == '' || $ctrl.tarefa.titulo == ' ')
                {
                    Msg.addError("Campo título não pode ser vazio", "Campo obrigatório")
                    return
                }                    
                if($ctrl.severidade.idSeveridade == null || $ctrl.severidade.idSeveridade == '' || $ctrl.severidade.idSeveridade == ' ')
                {
                    Msg.addError("Campo severidade não pode ser vazio", "Campo obrigatório")
                    return
                }                    
                if($ctrl.projetos.selectedOption.id == null || $ctrl.projetos.selectedOption.id == '' || $ctrl.projetos.selectedOption.id == ' ')
                {
                    Msg.addError("Campo projeto não pode ser vazio", "Campo obrigatório")
                    return
                }                    
                if($ctrl.tipo.selectedOption.id == null || $ctrl.tipo.selectedOption.id == '' || $ctrl.tipo.selectedOption.id == ' ')
                {
                    Msg.addError("Campo tipo não pode ser vazio", "Campo obrigatório")
                    return
                }                    
                if($ctrl.tarefa.descricao == null || $ctrl.tarefa.descricao == '' || $ctrl.tarefa.descricao == ' ')
                {
                    Msg.addError("Campo descricao não pode ser vazio", "Campo obrigatório")
                    return
                }
                    
                $ctrl.tarefa.tipo = $ctrl.tipo.idTipo
                $ctrl.tarefa.prioridade = $ctrl.severidade.idSeveridade
                $ctrl.tarefa.projeto = $ctrl.projetos.selectedOption.id
                $ctrl.tarefa.idUser = JSON.parse(localStorage.getItem(consts.userKey)).id
                $http.post(`${consts.apiUrl}/setTickets`, $ctrl.tarefa)
                .then(resp => {
                    //$ctrl.tickets = resp.data
                    console.log(resp)
                    $ctrl.$dismiss({
                        reason: 'success'
                    });
                    //Msg.addSucess('Criado com sucesso')
                }).catch(function (resp) {
                    console.log(resp)
                    Msg.addError('Ops, houve algo de errado')
                })
            }

            const getTipo = () => {
                $http.post(`${consts.apiUrl}/getTipo`, JSON.parse(localStorage.getItem(consts.userKey)))
                .then(resp => {
                    $ctrl.tipo.lista = resp.data
                }).catch(resp => {
                    Msg.addError('Não foi possível carregar as informações')
                })
            }

            //CHAMADA DA FUNÇÃO            
            getTipo()

            $ctrl.handleClose = function() {
                console.info("in handle close");
                $ctrl.$close({
                    result: $ctrl.modalData
                });
            };
            $ctrl.handleDismiss = function() {
                console.info("in handle dismiss");
                $ctrl.$dismiss({
                    reason: 'cancel'
                });
            };

            
        }],
    });