import express from 'express'
import usersController from '../controllers/users.controller.js'

const usersRoutes = express.Router()

usersRoutes.get('/', usersController.getAll)
usersRoutes.post('/', usersController.save)
usersRoutes.put('/:id', usersController.put)
usersRoutes.patch('/:id', usersController.patch)
usersRoutes.delete('/:id', usersController.del)

export default usersRoutes
