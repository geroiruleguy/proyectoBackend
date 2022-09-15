import  productRouter from './productRouter.js'
import  orderRouter  from './orderRouter.js'
import  userRouter from './usersRouter.js'
import  cartRouter from './cartRouter.js'
import  imageRouter from './imageRouter.js'

export const routes = (app) => {

app.use('/api/', imageRouter) 

app.use('/api/', userRouter) 

app.use('/api/', productRouter) 

app.use('/api/', cartRouter) 

app.use('/api/', orderRouter) //POST: crea una nueva orden (compra todo el contenido de un carrito y lo vacía, solo usuarios registrados)
                                    //GET: devuelve todas las ordenes de un usuario (solo usuarios registrados)

app.all('*', (req, res) => { res.status(404) })

}


