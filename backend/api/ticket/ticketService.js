const _ = require('lodash')
const http = require('http')
const request = require('request')
var promise = require('bluebird')
const web = require('../../config/web.config')

const getTickets =  (req, res, next) => {
    const idUser = req.body.id || ''

    request.get(`${web.url}issues${web.key}` , 
    function (error, response, body) {
        if(error) {
            return error
        }
        const data = JSON.parse(body)
        res.send(data.issues)
    })
}

const getProjetos = (req, res, next) => {
    const idUser = req.body.id || ''
    let projetos = new Array()
    projetos = getAllProjects()
    .then(result => comparaProjetos(result, idUser))
    .then(result => res.send(result))
}

const getTicketProject = (req, res, next) => {
    const idUser = req.body.idUser || ''
    let init = req.body.init || ''
    const max = req.body.max || ''
    const project = req.body.project
    init -= 1
    init *= 10    
    
    let url = `&offset=${init}&limit=${max}&project_id=${project}`
    request.get(`${web.url}issues${web.key}${url}`, 
    function (error, response, body) {
        if(error) {
            reject(error)
        }
        const data =  JSON.parse(body)
        console.log(data.total_count)
        res.send(data)        
    })
}

const getAllProjects = () =>{
    return new Promise((resolve, reject) => {
        request.get(`${web.url}projects${web.key}` , 
        function (error, response, body) {
            if(error) {
                reject(error)
            }
            const data = JSON.parse(body)
            resolve(data.projects)
        })
    })
    
}

const comparaProjetos = (projetos, idUser) => {
    return new Promise((resolve, reject) => {
        let projetosUser = new Array()
        const max = projetos.length
        console.log('/////////////////////-------------------------')
        for(let i=0; i < projetos.length; i++)
        {            
            request.get(`${web.url}projects/${projetos[i].id}/memberships${web.key}` , 
            
            function (error, response, body) {
            if(error) {
                return error
            }
            const data = JSON.parse(body)
            for(let j=0; j < data.memberships.length; j++)
            {
                if(idUser == data.memberships[j].user.id)
                {
                    projetosUser.push(projetos[i])
                }
                setTimeout( ()=> {
                    if(projetos[projetos.length-1] == projetos[i] && 
                        data.memberships[data.memberships.length-1] == data.memberships[j])
                    {
                        resolve(projetosUser), 1000
                    }
                }, 1000)
                              
            }                       
            })
        }
    })   
}

const getTarefas = (projetos, init, max) => {
    return new Promise((resolve, reject) => {
        let tarefas = new Array()
        let url = `&offset=${init}&limit=${max}&project_id=${projetos[i].id}`
        request.get(`${web.url}issues${web.key}${url}`,
        function (error, response, body) {
            if(error) {
                reject(error)
            }
            const data =  JSON.parse(body)
            res.send(data)
        })
    })
}
const getUsers = (req, res, next) => {
    request.get(`${web.url}users${web.key}`,
        function (error, response, body) {
            if(error) {
                reject(error)
            }
            const data =  JSON.parse(body)
            res.send(data)
        })
}

module.exports = { getTickets, getProjetos, getTicketProject, getUsers }
