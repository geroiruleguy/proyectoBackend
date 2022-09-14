import { Router } from 'express'
import * as productsController from '../controllers/productsController.js'
import auth from '../middlewares/auth.js'

const productRouter = Router()

productRouter.post("/product", auth, productsController.createProduct);
productRouter.put("/product/:id", auth, productsController.updateProduct);
productRouter.delete("/product/:id", auth, productsController.deleteProductById)
productRouter.get("/product/:id", auth, productsController.listProductsById)
productRouter.get("/products", auth, productsController.listProducts)

export default productRouter