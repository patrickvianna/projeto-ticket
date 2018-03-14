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

    console.log(`USER: ${user}`)
    console.log(`TITULO: ${titulo}`)
    console.log(`PROJETO: ${idProjeto}`)
    console.log(`DESCRICAO: ${descricao}`)
    console.log(`TIPO: ${tipo}`)
    console.log(`ESTADO: ${estado}`)
    console.log(`PRIORIDADE: ${prioridade}`)

    console.log(req.body)
    //request.get(`redmine:81/redmine/users/${user}.json?include=memberships?key=683ad157ea69a8e9d8b5db20782b92fd1267e238` ,
    request.get("http://redmine:81/redmine/users/6.json?key=1ace348514d8992b4cf46a632a6aa837fc38e520",
    function (error, response, body) {
        if(error) {
            res.status(500).send(error)
        }
        const key = JSON.parse(body).user.api_key;

        request(
            {
            method:'POST',
            url: `http://redmine:81/redmine/issues.json?key=${key}`,
            //url:"http://redmine:81/redmine/issues.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238",
            form: {
                "issue": {
                    "project_id": idProjeto,
                    "author_id" : user,
                    "subject": titulo,
                    "tracker_id" : tipo,
                    "status_id" : estado,
                    "priority_id" : prioridade,
                    "description" : descricao,
                    "category_id" : "2"       // Categoria sempre será nova
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
    })

}

const getTipo = (req, res, next) => {
    return new Promise((resolve, reject) => {
        request.get("http://redmine:81/redmine/trackers.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238" ,
        function (error, response, body) {
            if(error) {
                reject(error)
            }
            const data = JSON.parse(body)
            res.send(data.trackers)
        })
    })
}

module.exports = { setTickets, getTipo }
