const _ = require('lodash')
/*const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const env = require('../../.env')*/
const http = require('http')
const request = require('request')
const async = require('async')
var promise = require('bluebird')



/*const getTickets = async (req, res, next) => {
    const idUser = req.body.id || ''

    request.get("http://redmine:81/redmine/projects.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238" , 
    function (error, response, body) {
        if(error) {
            res.status(500).send(error)
        }
        const data = JSON.parse(body)
        let projetos = new Array()
        console.log("1")
        for(let i=0; i < data.projects.length; i++)
        {
            console.log("2")
            getAuxiliar(data.projects[i], idUser)
            console.log("4")
        }
        /*for(let i = 0 ; i < data.projects.length; i++)
        {
            projetos.push(data.projects[i])
                     
        }  *      
        //console.log(projetos)   
        console.log("5")
        res.send(projetos)

    })
}
*/
const getTickets =  (req, res, next) => {
    const idUser = req.body.id || ''

    request.get("http://redmine:81/redmine/issues.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238" , 
    function (error, response, body) {
        if(error) {
            return error
        }
        const data = JSON.parse(body)
        //console.log(data.issues)
        res.send(data.issues)
    })
    /*let projetos = new Array()
    promise.resolve(getAllProjects()).then(function(result){
        return result
    }).then(function(result){
        return get2(result)
    })
    /*for(let i = 0 ; i < data.projects.length; i++)
    {
        projetos.push(data.projects[i])
                    
    }        
    //console.log(projetos)   
    console.log("5")
    res.send(projetos)
*/
    
}

const getProjetos = (req, res, next) => {
    const idUser = req.body.id || ''
    let projetos = new Array()
    projetos = getAllProjects()
    .then(result => comparaProjetos(result, idUser))
    .then(result => res.send(result))
}

const getTicketProject = (req, res, next) => {
    const idUser = req.body.idUser.id || ''
    let init = req.body.init || ''
    const max = req.body.max || ''
    const project = req.body.project
    if(init < 1) init = 0
    
    let url = `&offset=${init}&limit=${max}&project_id=${project}`
    request.get("http://redmine:81/redmine/issues.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238" + url, 
    function (error, response, body) {
        if(error) {
            reject(error)
        }
        const data =  JSON.parse(body)
        console.log(data)
        res.send(data.issues)
    })
}

const getAllProjects = () =>{
    return new Promise((resolve, reject) => {
        request.get("http://redmine:81/redmine/projects.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238" , 
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
            request.get(`http://redmine:81/redmine/projects/${projetos[i].id}/memberships.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238` , 
            
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
const getTarefas = (projetos, init, max) => {
    return new Promise((resolve, reject) => {
        let tarefas = new Array()
        let url = `&offset=${init}&limit=${max}&project_id=${projetos[i].id}`
        request.get("http://redmine:81/redmine/issues.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238" + url, 
        function (error, response, body) {
            if(error) {
                reject(error)
            }
            const data =  JSON.parse(body)
            res.send(data)
        })
    })
}



module.exports = { getTickets, getProjetos, getTicketProject }



//projetos.push(data.projects[i])
            /*request.get("http://redmine:81/redmine/projects/"+data.projects[i].id+"/memberships.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238" , 
            function (error, response, bodyRes) {
                if(error) {
                    res.status(500).send(error)
                }
                //console.log(JSON.parse(bodyRes))
                const dt = JSON.parse(bodyRes)
                //console.log(dt.memberships[0])
                for(let j=0; j < dt.memberships.length; j++)
                {
                    //console.log(dt.memberships[j].user.id)
                    if(dt.memberships[j].user.id == idUser)
                    {
                        //console.log(i)
                        console.log(data.projects[i])
                        console.log(dt.memberships[j])
                        projetos = projetos.push(data.projects[i])
                    }
                }
                //console.log(data.projects[i])
                
            })  */ 
