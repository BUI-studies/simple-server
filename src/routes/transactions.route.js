import express from 'express'
import transactionsController from '../controllers/transactions.controller.js'

const transactionsRoutes = express.Router()

transactionsRoutes.get('/:id', transactionsController.getAll)
transactionsRoutes.post('/', transactionsController.save)
transactionsRoutes.put('/:id', transactionsController.put)
transactionsRoutes.patch('/:id', transactionsController.patch)
transactionsRoutes.delete('/:id', transactionsController.del)

export default transactionsRoutes
