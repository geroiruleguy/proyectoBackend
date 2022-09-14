 import Product from '../models/product.js'

 const date = new Date()

 export async function listProducts (req, res) {
    await Product.find({})
      .then((products) => {
        if (!products.length) {
          return res
            .status(404)
            .json({ success: false, error: "Ha ocurrido un error! No se encontraron productos" });
        }
        return res.status(200).json(products);
      })
      .catch((err) => {
        return res.status(400).json({ success: false, error: err });
      });
  }
 
 
 export async function listProductsById (req, res) {
    await Product.findOne({ _id: req.params.id })
      .then((producto) => {
        if (!req.params.id) {
          return res.status(404).json({ success: false, error: "Ha ocurrido un error! Ingrese un producto",
          });
        }
        return res.status(200).json(producto);
      })
      .catch((err) => {
        return res.json({ success: false, error: err });
      });
  }
 

 export function createProduct(req, res) {
    console.log("1.1")
  const body = req.body
  
  if (!body) {
      return res.status(400).json({ success: false, error: "Ha ocurrido un error! Ingresa un producto para ser creado", });
    } 
  console.log('1')  
    const product = new Product(body)
    if (!product) {
      return res.status(400).json({ success: false, error: "Ha ocurrido un error! Hay campos vacíos" })
    }
    console.log('2')
    product
      .save()
      .then(() => {
        console.log('3')
        return res.status(201).json({ success: true, id: product.id })
      }) 
      .catch((error) => {
        console.log('4')
        return res.status(400).json({ error })
      });
  }


  export async function updateProduct (req, res) {
    
    const body = req.body;
  
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "Ha ocurrido un error! Ingrese un producto",
      });
    }
    if (!body.role) {
      return res.json({ success: false, error: "Ha ocurrido un error! Petición denegada"
      });
    }
    Product.findOne({ _id: req.params.id }).then((product) => {
        
        (product.id = body.id)
        (product.name = body.name),
        (product.description = body.description),
        (product.price = body.price),
        (product.image = body.image),

        product
          .save()
          .then(() => {
            return res.status(200).json({ success: true, id: product._id });
          })
          .catch((error) => {
            return res.status(404).json({ error });
        });
    })
  }

 
  export async function deleteProductById (req, res) {
    
    const body = req.body;
    
    await Product.findOneAndDelete({ _id: req.params.id })
      .then(([product]) => {
        if (!body) {
          return res.status(400).json({ success: false, error: "Ha ocurrido un error! No existe un producto" });
        }
        return res.json({ success: true });
      })
      .catch((err) => {
        return res.json({ success: false, error: err });
      });
  }
