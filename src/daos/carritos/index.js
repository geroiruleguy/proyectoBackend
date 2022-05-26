let cartDAO

switch (process.env.db) {
  case 'json':
    const { default: carritosDaoArchivo } = await import('./carritosDaoArchivo.js')
    carritosDao = new carritosDaoArchivo('carritos')
    break
  case 'mongodb':
    const { default: carritosDaoMongoDB } = await import('./carritosDaoMongoDB.js')
    carritosDao = new carritosDaoMongoDB()
    break
  case 'firebase':
    const { default: carritosDaoFirebase } = await import('./carritosDaoFirebase.js')
    carritosDao = new carritosDaoFirebase()
    break
  default:
    const { default: carritosDaoMemoria } = await import('./carritosDaoMemoria.js')
    carritosDao = new carritosDaoMemoria()
    break
}

export { carritosDao }