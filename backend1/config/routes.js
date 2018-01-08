import { compareSync } from '../../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bcrypt';
import { open } from 'fs';

const express = require('express')
const auth  = require('./auth')

module.exports = function(server) {

    /*
        Rotas abertas
    */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../src/authService')
    openApi.post('/login', AuthService.login)
    open.post('/signup', AuthService.signup)
    open.post('/validateToken', AuthService.validateToken)

    /*
        Rotas protegidas por Token JWT
    */
    const protectedApi = express.Router();
    server.use('api', protectedApi)

    protectedApi.use(auth)


    /*
    const billingCycleService = requise('caminho')
    billingCycleService.register(protectedApi, '/billingCycle')
    */
    //API Routes
    const router = express.Router()
    server.use('/api', router)

    // rotas da API
    const login = require('../src/login.be')
}