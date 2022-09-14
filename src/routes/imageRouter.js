import { Router } from 'express'
import { extraerArchivo } from '../middlewares/images.js'
import { imageController } from '../controllers/imageController.js'

const imageRouter = new Router()

imageRouter.post('/images', extraerArchivo, imageController)

export default imageRouter



