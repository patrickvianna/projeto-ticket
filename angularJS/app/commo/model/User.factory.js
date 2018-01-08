angular.module('myApp').factory('User', function(){

    function User(id, created_on, name, fistname, lastname, login, mail){
        this.id = id;
        this.created_on = created_on;
        this.name = name;
        this.fistname = fistname;
        this.lastname = lastname;
        this.login = login;
        this.mail = mail;       
    }

    return (User);
})