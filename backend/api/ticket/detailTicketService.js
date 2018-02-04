const _ = require('lodash')
/*const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const env = require('../../.env')*/
const http = require('http')
const request = require('request')


const getDetail = (req, res, next) => {
    const rota = req.body.rota
    
    request.get(`http://redmine:81/redmine/issues/${rota}.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238` , 
        function (error, response, body) {
            if(error) {
                return error
            }
            const data = JSON.parse(body)
            res.send(data)
        })
}

module.exports = { getDetail }