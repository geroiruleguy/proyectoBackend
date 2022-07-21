import express from 'express';

import { productos } from './src/routes/productos.js';
import { carritos } from './src/routes/carritos.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', productos)
app.use('/api/carritos', carritos)

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