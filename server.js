const express = require('express')
import { productos} from './src/routes/productos';
import { carritos } from './src/routes/carritos';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', productos)
app.use('/api/carritos', cartsApi)

//Error
app.all('*', (req, res) =>{
    res.status(404).json
})



const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor ${error}`))