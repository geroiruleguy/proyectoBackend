let carritosDao

switch (process.env.db) {
  case 'json':
    const { default: CarritosDaoArchivo } = await import('./carritosDaoArchivo.js')
    carritosDao = new CarritosDaoArchivo('carritos')
    break
  case 'mongodb':
    const { default: CarritosDaoMongoDB } = await import('./carritosDaoMongoDB.js')
    carritosDao = new CarritosDaoMongoDB()
    break
  case 'firebase':
    const { default: CarritosDaoFirebase } = await import('./carritosDaoFirebase.js')
    carritosDao = new CarritosDaoFirebase()
    break
  default:
    const { default: CarritosDaoMemoria } = await import('./carritosDaoMemoria.js')
    carritosDao = new CarritosDaoMemoria()
    break
}

export { carritosDao }