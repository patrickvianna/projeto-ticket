angular.module('myApp')
    .component('detailModal', {
        template: `<div class="modal-header">
        <button type="button" ng-click="$ctrl.handleClose()" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span></button>
        <h4 class="modal-title">Detalhes ticket</h4>
      </div>
    <!-- HEADER -->
    
    <div class="jumbotron">
        <!--button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">×</span></button-->
        <div class="modal-body">
            
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h2><b>{{ ::$ctrl.tarefa.subject }}</b></h2>
                    <div class="row">
                        <div class="col-xs-6 col-md-3">
                            <h3><b>Ticket ID:</b> {{ ::$ctrl.tarefa.id }}</h3>
                        </div>
                        <div class="col-xs-6 col-md-6">
                            <h3><b>Projeto:</b> {{ ::$ctrl.tarefa.project.name }}</h3>
                        </div>
                    </div>
                    <h4><span class="glyphicon glyphicon-fire"></span> <b>Autor:</b> {{ ::$ctrl.tarefa.author.name }}</h4>
    
                    
                </div>
                <div class="panel-body">
                        <div class="row">
                                <div class="col-xs-4 col-md-3">
                                    <h4> <b>Tipo:</b> {{ ::$ctrl.tarefa.tracker.name }} </h4>
                                </div>
                                <div class="col-xs-4 col-md-3">
                                    <h4> <b>Status:</b> {{ ::$ctrl.tarefa.status.name }} </h4>
                                </div>
                                <div class="col-xs-4 col-md-3">
                                    <h4> <b>Prioridade:</b> {{ ::$ctrl.tarefa.priority.name }} </h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-4 col-md-3">
                                    <h4> <b>%</b> {{ ::$ctrl.tarefa.done_ratio }} </h4>
                                </div>
                                <div class="col-xs-4 col-md-3">
                                    <h4> <b>Estimado:</b> {{ ::$ctrl.tarefa.spent_hours }} </h4>
                                </div>
                                <div class="col-xs-4 col-md-3">
                                    <h4> <b>Gasto:</b> {{ ::$ctrl.tarefa.total_spent_hours }} </h4>
                                </div>
                            </div>
                    <pre>{{ ::$ctrl.tarefa.description }}</pre>
                    <hr>
                    <h5>Posted: {{ ::$ctrl.tarefa.start_date }}</h5>
                </div>
            </div>
    </div>
    </div>
    
    <!-- FOOTER -->
    <div class="modal-footer">
        <button type="button" ng-click="$ctrl.handleClose()" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>`,
        bindings: {
            $close: '&',
            $dismiss: '&',
            modalData: '<',
            tarefa: '<'
        },
        controller: ['$http', 'consts', function($http, consts) {
            var $ctrl = this;

            $ctrl.tarefa = {

            }

            $ctrl.handleClose = function() {
                console.info("in handle close");
                $ctrl.$close({
                    result: $ctrl.modalData
                });
            };

            console.log($ctrl.idTicket)
            console.log($ctrl.modalData)
            const rota = 47
            function callTicket () {   
                $http.post(`${consts.apiUrl}/getDetail`, {rota})
                .then(function(resp){
                    $ctrl.tarefa = resp.data.issue
                    console.log($ctrl.tarefa)
                }).catch(function(resp){
                    console.log(resp)
                })
            }

            $ctrl.handleDismiss = function() {
                console.info("in handle dismiss");
                $ctrl.$dismiss({
                    reason: 'cancel'
                });
            };

            //callTicket()
        }],
    });