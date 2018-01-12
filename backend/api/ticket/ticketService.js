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

const getAllProjects = () =>{
    console.log("1")
    request.get("http://redmine:81/redmine/projects.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238" , 
    function (error, response, body) {
        if(error) {
            return error
        }
        const data = JSON.parse(body)
        console.log(data.projects)
        return data.projects
    })
}
const get2 = (projetos) => {
    console.log("2")
    for(let i=0; i < projetos.length; i++)
        {
            getAuxiliar(projetos[i], idUser)
        }
}
const getAuxiliar = (idProjeto, idUser) => {
    console.log("3")
    request.get("http://redmine:81/redmine/projects/"+idProjeto+"/memberships.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238" , 
        function (error, response, body) {
            if(error) {
                return error
            }
            const data = JSON.parse(body)
            console.log(data)
        })
}



module.exports = { getTickets }



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
