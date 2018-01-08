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
    //ticketService.getTickets(protectedApi, 'getTickets')
    protectedApi.post('/getTickets', ticketService.getTickets)

    const newTicketService = require('../api/ticket/newTicketService')
    protectedApi.post('/setTickets', newTicketService.setTickets)

    //protectedApi.route('/getTickets').get(ticketService.getTickets)
	protectedApi.use(auth)

    /*const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(protectedApi, '/billingCycles')

    const billingSummaryService = require('../api/billingSummary/billingSummaryService')
    protectedApi.route('/billingSummary').get(billingSummaryService.getSummary)
*/
}
