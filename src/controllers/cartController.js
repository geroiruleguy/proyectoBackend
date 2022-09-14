import Cart from '../models/cart.js'
import mongoose from 'mongoose'

const date = new Date()

export const createCart = async (req,res) => {
  
  const body = req.body;
  const userId = req.user;
  const products = body.products;
  if (!products) {
    return res.status(400).json({
      success: false,
      error: "Ingresa un producto",
    });
  }

  await Cart.findOne({ user: userId }).populate({
    path: "user",
    model: "User",
  }).then((cart) => {
   
    if(!cart) {
      const cart = new Cart({ 
        user: userId,
        products,
      });
      cart
        .save()
        .then(() => {
          return res
            .status(201)
            .json({ success: true, id: cart._id });
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ err });
        });
    }
    else { 
      return res
        .status(401)
        .json({  message: "Ya existe el cart" });
    }
    }).catch((err) => {
      
      return res
      .status(402)
      .json({ error: err });
    })
} 


export async function addProductsToCart(req, res) {
  const body = req.body;
  const productId = body.product_id;
 
  if (!productId) {
    return res.status(404).json({
      success: false,
      error: "Ingrese un producto para agregar",
    });
  }
  await Cart.findOne({ _id: req.params.id })
    .populate({ path: "products.product", model: "Product" })
    .then((cart) => {
      const Producto = {
         _id: new mongoose.Types.ObjectId(),
         product: productId,
         qty: body.qty,
      };

      if(cart.products.find((obj) => obj.product.id === body.product_id)) {
       
        cart.products.map((obj) => {
            if (obj.product.id === body.product_id) {
              obj.qty = obj.qty + body.qty
            }
            return obj;
          });
          cart
            .save()
            .then(() => {
              return res.status(200).json({
                success: true,
                id: cart._id,
              });
            })

            .catch((err) => {
              return res
                .status(404)
                .json({ err });
            });
      }
      else {
        cart.products.push(Producto);
        cart
          .save()
          .then(() => {
            return res.status(200).json({
              success: true,
              id: cart._id,
            });
          })

          .catch((err) => {
            return res
              .status(404)
              .json({ err });
          });
      }

      
    });
}



export async function listCartProductsById(req, res) {

  await Cart.findOne({ _id: req.params.id })
    .populate({ path: "products.product", model: "Product" })
    .then((cart) => {

      if (!req.params.id) {
        return res
          .status(404)
          .json({ 
            success: false, 
            error: "No existe id del cart" 
          });
      }
      return res.status(200).json(cart);
    });
}
  

export async function deleteProduct(req, res) {
  
  await Cart.findById({ _id: req.params.id })
    .then((cart) => {
      const cartUpdate = cart.products.filter(
        (products) => products._id != req.params.id_prod
      );
      Cart.findByIdAndUpdate(
        { _id: req.params.id },
        { products: cartUpdate }
      )
        .then(() => {
          return res
            .status(200)
            .json({ success: true });
        })
        .catch(() => {
          return res
            .status(402)
            .json({ error: true });
        }); 
      
    })
    .catch((error) => {
      return res
        .status(400)
        .json({ error: error });
    }); 
}


export async function deleteCart (req, res) {
  
  const body = req.body
  
  await Cart.findOneAndRemove({ _id: req.params.id })
    .then((cart) => {
      
      if (!cart) {
        return res.status(400).json({
          success: false,
          error: "No existe un cart",
        });
      }
      return res
        .status(200)
        .json({ success: true });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ err });
    });
}

export async function clearCart(req, res) {
  
  await Cart.findById({ _id: req.params.id })
    .then((cart) => {
      
      const cartUpdate = []
      
      Cart.findByIdAndUpdate(
        { _id: req.params.id },
        { products: cartUpdate }
      )
        .then(() => {
          return res
            .status(200)
            .json({ success: true });
        })
        .catch(() => {
          return res
            .status(402)
            .json({ error: true });
        }); 
      
    })
    .catch((error) => {
     
      return res
        .status(400)
        .json({ error: error });
    }); 
}


