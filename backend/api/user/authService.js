const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../../.env')
const http = require('http')
const request = require('request')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({errors})
}

const login = (req, res, next) => {

    let login = req.body.login || ''
    let senha = req.body.senha || ''
    let user = ''
    let id = ''
    let name = ''
    let loginO = ''
    let senhaO = ''
    let token = ''

    let entrei = false
    request.get("http://redmine:81/redmine/users.json?key=683ad157ea69a8e9d8b5db20782b92fd1267e238&name=" + login ,
    function (error, response, body) {
        try {
          const data = JSON.parse(body);

          for(var i = 0; i < data.users.length; i++)
          {
              user = data.users[i]
              id = data.users[i].id
              name = data.users[i].firstname
              loginO = data.users[i].login
              senhaO = data.users[i].custom_fields[0].value
              console.log("1: " + login +  "   2:  " + loginO)
              console.log("1: " + senha +  "   2:  " + senhaO)
              console.log("1: " + name )
              if(login == loginO && senha == senhaO)
              {
                  token = jwt.sign(user, env.authSecret, {
                      expiresIn: "30 minutes"
                  })
                  entrei = true
                  break;
              }
          }
          if(entrei) {
              console.log('E IGUAL')
              res.status(200).send({ id, name, token })
          }else {
              console.log("1: " + login +  "   2:  " + loginO)
              console.log("1: " + senha +  "   2:  " + senhaO)
              console.log('nao E IGUAL')
              res.status(500).send("Usuário ou senha incorretos")
              return;
          }
      }
      catch(e) {
          console.log('Erro de conexão');
          return;
      }
    })
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
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''

    if(!email.match(emailRegex)) {
        return res.status(400).send({errors: ['O e-mail informado está inválido']})
    }

    if(!password.match(passwordRegex)) {
        return res.status(400).send({errors: [
            "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-12."
        ]})
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if(!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({errors: ['Senhas não conferem.']})
    }

    User.findOne({email}, (err, user) => {
        if(err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            return res.status(400).send({errors: ['Usuário já cadastrado.']})
        } else {
            const newUser = new User({ name, email, password: passwordHash })
            newUser.save(err => {
                if(err) {
                    return sendErrorsFromDB(res, err)
                } else {
                    login(req, res, next)
                }
            })
        }        
    })
}

module.exports = { login, signup, validateToken }