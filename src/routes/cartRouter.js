import {Router} from "express";
import * as cartController from "../controllers/cartController.js";
import authorization from '../middlewares/auth.js'

const cartRouter = Router();

cartRouter.get("/cart/:id/products", authorization, cartController.listCartProductsById);
cartRouter.post("/cart", authorization, cartController.createCart);
cartRouter.put("/cart/:id", authorization, cartController.addProductsToCart);
cartRouter.delete("/cart/:id", authorization, cartController.deleteCart);
cartRouter.delete("/cart/:id/productos/:id_prod", authorization, cartController.deleteProduct);
cartRouter.delete("/cart/:id/clear", authorization, cartController.clearCart);

export default cartRouter;