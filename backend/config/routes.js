const express = require('express')
const auth = require('./auth')

module.exports = function (server) {

    /*
     * Rotas abertas
     */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    /*
     * Rotas protegidas por Token JWT
     */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)
    
    const ticketService = require('../api/ticket/ticketService')
    protectedApi.post('/getTickets', ticketService.getTickets)
    protectedApi.post('/getProjetos', ticketService.getProjetos)
    protectedApi.post('/getTicketProject', ticketService.getTicketProject)
    protectedApi.get('/getUsers', ticketService.getUsers)

    const newTicketService = require('../api/ticket/newTicketService')
    protectedApi.post('/setTickets', newTicketService.setTickets)
    protectedApi.post('/getTipo', newTicketService.getTipo)
    

    const detailTicketService = require('../api/ticket/detailTicketService')
    protectedApi.post('/getDetail', detailTicketService.getDetail)

	protectedApi.use(auth)
}
