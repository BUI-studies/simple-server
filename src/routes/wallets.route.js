import express from 'express'
import walletsController from '../controllers/wallets.controller.js'

const walletsRoutes = express.Router()

walletsRoutes.get('/', walletsController.getAll)
walletsRoutes.post('/', walletsController.save)
walletsRoutes.put('/:id', walletsController.put)
walletsRoutes.patch('/:id', walletsController.patch)
walletsRoutes.delete('/:id', walletsController.del)

export default walletsRoutes
