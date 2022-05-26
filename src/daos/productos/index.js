let productosDao

switch (process.env.db) {
  case 'json':
    const { default: productosDaoArchivo } = await import('./productosDaoArchivo.js')
    productosDao = new productosDaoArchivo('productos')
    break
  case 'mongodb':
    const { default: productosDaoMongoDB } = await import('./productosDaoMongoDB.js')
    productosDao = new productosDaoMongoDB()
    break
  case 'firebase':
    const { default: productosDaoFirebase } = await import('./productosDaoFirebase.js')
    productosDao = new productosDaoFirebase()
    break
  default:
    const { default: productosDaoMemoria } = await import('./productosDaoMemoria.js')
    productosDao = new productosDaoMemoria()
    break
}

export { productosDao }