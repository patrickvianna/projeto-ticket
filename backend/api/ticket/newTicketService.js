const _ = require('lodash')
/*const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const env = require('../../.env')*/
const http = require('http')
const request = require('request')


const setTickets = (req, res, next) => {
    const user = req.body.idUser || ''
    const titulo = req.body.titulo || ''
    const idProjeto = req.body.projeto || ''
    const descricao = req.body.descricao || ''
    const tipo = req.body.tipo || ''
    const estado = 1
    const prioridade = req.body.prioridade

    console.log(user)
    console.log(titulo)
    console.log(idProjeto)
    console.log(descricao)
    console.log(tipo)
    console.log(estado)
    console.log(prioridade)

    console.log(req.body)
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
        form: {
            "issue": {
                "project_id": "1",
                "autor" : user,
                "subject": titulo,
                "tracker_id" : tipo,
                "status_id" : estado,
                "priority_id" : prioridade,
                "description" : descricao,
                "category_id" : "3"
            }
        }}, 
        function(error, response, body){
            if(error) 
            {
                const er = JSON.parse(error)
                console.log(er)
                res.status(500).send(er)
            }
            res.send(response)
        }
    )
}

module.exports = { setTickets }