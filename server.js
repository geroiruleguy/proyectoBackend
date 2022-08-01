import express from 'express';

import { productos } from './src/routes/productos.js';
import { carritos } from './src/routes/carritos.js';

//===========================================================================================================
//Conexión a base de datos\\
import mongoose from 'mongoose';

// const dbName = 'ecommerce-CH'
const username = 'GeronimoIruleguy'
const password = 'coderhouse'
const uri = `mongodb+srv://${username}:${password}@cluster0.simct.mongodb.net/?retryWrites=true&w=majority`


export const connection =  mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
) 
    .then( ()=> console.log('Base de datos conectada'))
    .catch(e => console.log(e));

//===========================================================================================================    

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', productos)
app.use('/api/carritos', carritos)

//=============================================================================================================
//Vista en chroome
app.use(express.static('public'))

//Error
app.all('*', (req, res) =>{
    res.status(404).json
})



const PORT = 3000
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor ${error}`))

export default app;