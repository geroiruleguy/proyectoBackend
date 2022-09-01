import express  from 'express';
import { Router } from 'express';
import { listaProductos } from '../controllers/controllers.js';
// import { productosDao } from '../daos/productos/index.js';


const app = express()

export const productosRouter = Router();

//Configuración del acceso

const admin = false



//Listar todos los productos
productosRouter.get('/', async (req, res) =>{
    try {
        const data = await listaProductos.getAll();
        res.json(data);
      } catch (err) {
        console.error(err);
      }
});

//Listar todos los productos disponibles ó un producto por su id 

productosRouter.get('/:id', async (req, res) => {
    try {
      const producto = await listaProductos.getById(req.params.id);
      producto ? res.json(producto) : res.status(404).json;
    } catch (err) {
      console.error(err);
    }
  });

//Incorporar productos al listado (disponible solo para admins)
productosRouter.post('/', async (req, res) => {
    const nombre = req.body.title;
    const descripcion = req.body.descripcion;
    const url = req.body.thumbnail;
    const precio = req.body.price;
    if (admin) {
      try {
        listaProductos.save(nombre, descripcion, url, precio);
        res.status(200).json;
      } catch (err) {
        console.error(err);
      }
    } else {
        res.status(403).json;
    }
  });


//Actualizar un producto por su id

productosRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const nombre = req.body.title;
  const descripcion = req.body.description;
  const url = req.body.thumbnail;
  const precio = req.body.price;
  const stock = req.body.stock;

  if (admin) {
    try {
      const actualizarProducto = await listaProductos.actualizarProducto(id, nombre, descripcion, url, precio, stock);
      actualizarProducto ? res.status(200).json : res.status(404).json;
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(403).json;
  }
});

//Eliminar un producto por su id

productosRouter.delete('/:id', async (req, res) => {
  if (admin) {
    try {
      const productoEliminado = await listaProductos.deleteById(req.params.id);
      productoEliminado ? res.status(200).json : res.status(404).json;
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(403).json;
  }
});
  
//Error
app.all('*', (req, res) =>{
    res.status(404).json
})

app.listen(8080);