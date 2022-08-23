import express from 'express'
import categoryController from "../controllers/category.controller.js";

const categoryRoutes = express.Router()

categoryRoutes.get('/:userID', categoryController.getAll)
categoryRoutes.post('/', categoryController.save)
categoryRoutes.put('/:id', categoryController.put)
categoryRoutes.patch('/:id', categoryController.patch)
categoryRoutes.delete('/:id', categoryController.del)

export default categoryRoutes
