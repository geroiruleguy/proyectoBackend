import fs from 'fs';


class Contenedor {
    
    constructor(route) {
    this.route = route;
    }

    async writeFile(input) {
        fs.promises.writeFile(this.route, JSON.stringify(input));
    }

//Controler Productos


    async getAll() {
        try {
          const data = await fs.promises.readFile(this.route, 'utf-8');
          return data ? JSON.parse(data) : [];
        } catch (error) {
          console.error(error);
        }
      }

      async getById(id) {
        try {
          const data = await this.getAll();
          return data.find((i) => i.id == id);
        } catch (error) {
          console.error(error);
        }
      }
    
      async save(title, description, thumbnail, price) {
        try {
          let data = await this.getAll();
          data.push({
            id: !data.length ? 1 : parseInt(data[data.length - 1].id) + 1,
            nombre: title || "Escuadra",
            descripcion: description || "Descripción del producto Escuadra",
            url: thumbnail || "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
            precio: price || 123.45,
            stock: 10,
          });
          await this.writeFile(data);
        } catch (err) {
          console.error(err);
        }
      }
      
      
    async deleteById(id) {
        try {
          const data = await this.getAll();
          const index = data.findIndex((i) => i.id == id);
          if (index > -1) {
            const newData = data.slice(0, index).concat(data.slice(index + 1));
            await this.writeFile(newData);
            return true;
          }
          return false;
        } catch (error) {
          console.error(error);
        }
      }

    async actualizarProducto(id, title, description, thumbnail, price, stock) {
        try {
          const data = await this.getAll();
          const index = data.findIndex((obj) => obj.id == id);
          if (index > -1) {
            data[index] = {
              id: id,
              nombre: title || data[index].title,
              descripcion: description || data[index].description,
              url: thumbnail || data[index].thumbnail,
              precio: price || data[index].price,
              stock: stock || data[index].stock
            };
            await this.writeFile(data);
            return true;
          } else {
            return false;
          }
        } catch (err) {
          console.error(err);
        }
      }

  
    
//Controller Carritos
    
    async agregarNuevoCarrito() {
        try {
          const data = await this.getAll();
          const id = !data.length ? 1 : parseInt(data[data.length - 1].id) + 1;
          data.push({
            id: id,
            productos: [],
          });
          await this.writeFile(data);
          return id;
        } catch (err) {
          console.error(err);
        }
      }
    
    async carritoVacio(id){
        try {
          const listaCarritos = await this.getAll()
          const carrito = await this.getById(id)
          if(!carrito) return "No existe el carrito que buscas"
          const index = listaCarritos.findIndex(c => c.id == id)
          listaCarritos[index].productos = []
          await this.writeFile(listaCarritos)
          return true
        } catch (error) {
          console.error(error)
        }
      }
    
    async productosEnCarrito(id) {
        try {
        //   const listaCarritos = await this.getAll();
          const carrito = await this.getById(id);
          return carrito ? carrito.productos : undefined;
        } catch (error) {
          console.error(error);
        }
      }
    
    async agregarAlCarrito(id, idProd) {
        try {
          const listaCarritos = await this.getAll();
          const carrito = await this.getById(id);
          const agregarProducto = await productos.getById(idProd);
    
          if (carrito && agregarProducto) {
            listaCarritos[carrito.id - 1].productos.push(agregarProducto);
            await this.writeFile(listaCarritos);
            return true;
          } else if (!carrito) {
            return 'Ups! No encontramos el carrito que buscas...';
          } else if (!agregarProducto) {
            return 'Ups! No existe ese producto...';
          }
        } catch (error) {
          console.error(error);
        }
      }
    
        
    async borrarProductosEnCarrito(id, idProd) {
        try {
          const listaCarritos = await this.getAll();
          const carrito = await this.getById(id)
          if(!carrito) return "No existe el carrito que buscas"
          const indiceProducto = carrito.productos.findIndex(p=> p.id == idProd)
          const indiceCarrito = listaCarritos.findIndex(c=> c.id == id)
          if (indiceProducto > -1) {
            listaCarritos[indiceCarrito].productos = carrito.productos.slice(0, indiceProducto).concat(carrito.productos.slice(indiceProducto + 1));
            await this.writeFile(listaCarritos);
            return true;
          } else if(indiceProducto == -1){
            return "Producto no encontrado"
          }
        } catch (error) {
          console.error(error)
        }
      }  
    
      
      
}

export const listaProductos = new Contenedor('../../db/productos.json');

export const listaCarritos = new Contenedor('../../db/carritos.json');
