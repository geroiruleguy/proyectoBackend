import { Router } from 'express'
import { extraerArchivo } from '../middlewares/procesamientoDeArchivos.js'
import { uploadFileController } from '../controllers/uploadFileController.js'

export const uploadFileRouter = new Router()

uploadFileRouter.post('uploadfile', extraerArchivo, uploadFileController)



