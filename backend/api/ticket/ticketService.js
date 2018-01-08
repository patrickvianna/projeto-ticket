const _ = require('lodash')
/*const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const env = require('../../.env')*/
const http = require('http')
const request = require('request')


const getTickets = (req, res, next) => {
    const idUser = req.body.id || ''

    request.get("http://redmine:81/redmine/projects.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238" , 
    function (error, response, body) {
        if(error) {
            res.status(500).send(error)
        }

        const data = JSON.parse(body)
        let projetos = new Array()
        for(let i = 0 ; i < data.projects.length; i++)
        {
            projetos.push(data.projects[i])
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
        }        
        //console.log(projetos)   
        res.send(projetos)

    })
}

module.exports = { getTickets }
