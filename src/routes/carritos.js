import { listaCarritos } from '../controllers/controllers.js';
import { Router } from 'express';


export const carritos = Router();

//Crear carrito devolviendo su id

carritos.post('/', async (req, res) => {
    const nuevoCarrito = await listaCarritos.agregarNuevoCarrito();
    res.json(`Carrito ${nuevoCarrito}`);
  });

//Vaciar un carrito y eliminarlo

carritos.delete('/:id', async(req, res)=>{
    const id = req.params.id
    try {
      const vaciarCarrito = await listaCarritos.carritoVacio(id)
      vaciarCarrito === true ? res.status(200).json : res.status(404).json;
    } catch (error) {
      console.error(error)
    }
  });
  

//Listar todos los productos guardados en el carrito  

carritos.get('/:id/productos', async (req, res) => {
    const id = req.params.id;
    try {
      const productosEnCarrito = await listaCarritos.productosEnCarrito(id);
      productosEnCarrito ? res.json(productosEnCarrito) : res.status(404).json;
    } catch (error) {
      console.error(error);
    }
  });

//Incorporar productos al carrito por su id de producto  

carritos.post('/:id/productos', async (req, res) => {
    const id = req.params.id;
    const id_prod = req.body.id_prod;
    const nuevoCarrito = await listaCarritos.agregarAlCarrito(id, id_prod);
    nuevoCarrito === true ? res.status(200).json : res.status(404).json;
  });


//Eliminar un producto del carrito por su id de carrito y de producto

carritos.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod
    try {
      const productosEnCarrito = await listaCarritos.borrarProductosEnCarrito(id, id_prod);
      productosEnCarrito === true ? res.status(200).json : res.status(404).json;
    } catch (error) {
      console.error(error);
    }
  });
  
