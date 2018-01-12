const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const env = require('../.env')
const http = require('https')

const emailRegex = /\S+@\S+\.\S_/
const passwordRegex = /((?=.*\d)(?=.*[a-z]).{6,12})/

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({errors})
}

const login = (req, res, next) => {
    
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function(err, decoded) {
        return res.status(200).send({valid: !err})
    })
}

const signup = (req, res, next) => {
    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.email || ''
    const confirmPassword = req.body.confirm_Password ||  ''

    if(!email.match(email)) {
        return res.status(400).send({ errors: ['O email informado está inválido'] })
    }

    if(!password.match(passwordRegex)) {
        return res.status(400).send({ errors: [
            "Senha precisa ter letras e números"
        ]})
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if(!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não confrerm'] })
    }
}

module.exports = { login, signup, validateToken }




