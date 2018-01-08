angular.module('myApp').factory('Ticket', function(){

    /**
     * Constructor, with class name
     */   
    function Ticket(numRegistro, titulo = "", dtCriacao = null, status = null){
        this.numRegistro = numRegistro;
        this.titulo = titulo;
        this.dtCriacao = dtCriacao;
        this.status = status;
    }

    return (Ticket);

})


/*
myApp.factory('ResulSet', function() {
    function ResultSetInstance(dataSet) { 
        this.filter = function(){ 
            // ...
        }
    }

    return {
        createNew: function(dataSet) {
            return new ResultSetInstance(dataSet);
        }
    };
});


myApp.controller('pageCtrl', function(ResultSet) {
    var someData = ...;
    var rs = ResultSet.createNew(someData);
}
*/