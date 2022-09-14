import { Router } from 'express'
import * as userController from '../controllers/userController.js'
import auth from "../middlewares/auth.js";

const userRouter = Router()

userRouter.post('/user/register', userController.register) 
userRouter.post("/user/login", userController.login) 


export default userRouter;