import express from 'express';
import config from './config.js';
import { routes } from './src/routes/index.js'
import cors from 'cors'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config();


//===========================================================================================================
//Conexión a base de datos\\
import mongoose from 'mongoose';

// const dbName = 'ecommerce-CH'
const username = 'GeronimoIruleguy'
const password = 'coderhouse'
const mongo_uri = `mongodb+srv://${username}:${password}@cluster0.simct.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(mongo_uri, function(err) {
    if (err) {
        throw err 
    } else {
        console.log('Connectado a mongo');
    }
});

//===========================================================================================================    

const app = express()

if(config.NODE_ENV == 'development')app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


//===============================================================================================================
//Vista en chroome
app.use(express.static('public'))

//===============================================================================================================
//Multer
const upload = multer({ dest: 'uploads/' })

//===============================================================================================================
//Rutas
routes(app);

//===============================================================================================================
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