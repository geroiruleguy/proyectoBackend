import contenedorMongoDB from '../../contenedores/contenedorMongoDB'

class carritosDaoMongoDB extends contenedorMongoDB {
  constructor() {
    super('carritos', {
      id: { type: Number, required: true },
      productos: { type: Array, required: false },
    })
  }
}

export default carritosDaoMongoDB