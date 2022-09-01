import mongoose from 'mongoose'
import conectDB from '../persistencia/config.js'

await mongoose.connect(conectDB.mongodb.cnxStr, conectDB.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async listar(id) {
        try {
            const allItems = await this.readFile(id)
            return allItems
          } catch (error) {
            await this.writeFile([id])
            const allItems = await this.readFile(id)
            return allItems
          }
    }

    async listarAll() {
        try {
            const allItems = await this.readFile()
            return allItems
          } catch (error) {
            await this.writeFile([])
            const allItems = await this.readFile()
            return allItems
          }
    }

    async guardar(nuevoElem) {
        try {
            const allItems = await this.readFile()
            allItems.push(nuevoElem)
            await this.writeFile(allItems)
          } catch (error) {
            console.log(`ERROR: ${error}`)
          }
    }

    async actualizar(nuevoElem) {
        const objs = await this.listarAll()
        const index = objs.findIndex(o => o.id == nuevoElem.id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        } else {
            objs[index] = nuevoElem
            try {
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Error al actualizar: ${error}`)
            }
        }
    }

    async borrar(id) {
        const objs = await this.listarAll()
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }

        const deleted = objs.splice(index, 1)[0]
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
        return deleted
    }

    async borrarAll() {
    // version fea e ineficiente pero entendible para empezar
        try {
            const docs = await this.listarAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.borrar(id))
            const resultados = await Promise.allSettled(promesas)
            const errores = resultados.filter(r => r.status == 'rejected')
            if (errores.length > 0) {
                throw new Error('no se borró todo. volver a intentarlo')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}

export default ContenedorMongoDb