import express from 'express';

import { productosRouter } from './src/routers/productosRouter.js';
import { carritosRouter } from './src/routers/carritosRouter.js';
import { usuariosRouter } from './src/routers/usuariosRouter.js'
import { uploadFileRouter } from './src/routers/uploadFileRouter.js'
import { authRouter } from './src/routers/authRouter.js';

//===========================================================================================================
//Conexión a base de datos\\
import mongoose from 'mongoose';

// const dbName = 'ecommerce-CH'
const username = 'GeronimoIruleguy'
const password = 'coderhouse'
const mongo_uri = `mongodb+srv://${username}:${password}@cluster0.simct.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(mongo_uri, function(err) {
    if (err) {
        throw err; //throw es para que el programa se detenga en este punto y no siga ejecutando el codigo 
    } else {
        console.log('Connectado a mongo');
    }
});

//===========================================================================================================    

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//===============================================================================================================
//Rutas
app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)
app.use('/api/usuarios', usuariosRouter)
app.use('/api/uploads', uploadFileRouter)
app.use('/api', authRouter)
app.all('*', (req, res) => { res.status(404) })


//===============================================================================================================
//Vista en chroome
app.use(express.static('public'))


//Error
app.all('*', (req, res) =>{
    res.status(404).json
})


//=============================================================================================================
const PORT = 3000
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor ${error}`))

export default app;