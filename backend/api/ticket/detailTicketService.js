const _ = require('lodash')
const http = require('http')
const request = require('request')
const web = require('../../config/web.config')

const getDetail = (req, res, next) => {
    const rota = req.body.rota
    
    request.get(`${web.url}issues/${rota}${web.key}` , 
        function (error, response, body) {
            if(error) {
                return error
            }
            const data = JSON.parse(body)
            res.send(data)
        })
}

module.exports = { getDetail }