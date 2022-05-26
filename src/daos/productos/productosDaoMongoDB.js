import ContenedorMongoDB from '../../contenedores/contenedorMongoDB'

class ProductosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super('productos', {
      id: { type: Number, required: true },
      nombre: { type: String, required: true },
      descripcion: { type: String, required: true },
      img: { type: String, required: false },
      precio: { type: Number, required: true },
      stock: { type: Number, required: true },
    })
  }
}

export default ProductosDaoMongoDB