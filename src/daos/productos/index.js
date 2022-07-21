

let productosDao

switch (process.env.db) {
  case 'json':
    const { default: ProductosDaoArchivo } = await import('./productosDaoArchivo.js')
    productosDao = new ProductosDaoArchivo('productos')
    break
  case 'mongodb':
    const { default: ProductosDaoMongoDB } = await import('./productosDaoMongoDB.js')
    productosDao = new ProductosDaoMongoDB()
    break
  case 'firebase':
    const { default: ProductosDaoFirebase } = await import('./productosDaoFirebase.js')
    productosDao = new ProductosDaoFirebase()
    break
  default:
    const { default: ProductosDaoMemoria } = await import('./productosDaoMem.js')
    productosDao = new ProductosDaoMemoria()
    break
}

export { productosDao }