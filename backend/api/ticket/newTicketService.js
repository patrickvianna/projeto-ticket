const _ = require('lodash')
/*const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const env = require('../../.env')*/
const http = require('http')
const request = require('request')


const setTickets = (req, res, next) => {
    const idUser = req.body.id || ''

    /*request.post("http://redmine:81/redmine/issues.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238" , 
    function (error, response, body) {
        if(error) {
            res.status(500).send(error)
        }
    })*/
    request(
        {
        method:'POST',
        url:"http://redmine:81/redmine/issues.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238", 
        body: {
            "issue": {
                "project_id": "1",
                "subject": "CRIANDO UM TESTE",
                "tracker_id" : "3",
                "status_id" : "3",
                "priority_id" : "2",
                "description" : "DESCRIPTION DESCRIPTION",
                "category_id" : "3"
            }
        }, 
        /*request.post("http://redmine:81/redmine/issues.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238", 
        {
            "issue": {
                "project_id": "1",
                "subject": "CRIANDO UM TESTE",
                "tracker_id" : "3",
                "status_id" : "3",
                "priority_id" : "2",
                "description" : "DESCRIPTION DESCRIPTION",
                "category_id" : "3"
            }
        },*/
        function(error, response, body){
            /*if(error) 
            {
                const er = JSON.parse(error)
                console.log(er)
                res.status(500).send(er)
            }

            console.log(body)
            const data = JSON.parse(body)
            res.status(200).send(data)
            */
            console.log(response);
            console.log(body);
            console.log(error);
            res.sendStatus(200)
        }
        })

    res.send(idUser)
}

module.exports = { setTickets }