import mongoose from "mongoose";

export function crearUsuario(datos) {
    if (!datos.username) throw new Error(`MISSING_ARGS: el campo 'username' es obligatorio`)
    if (!datos.password) throw new Error(`MISSING_ARGS: el campo 'password' es obligatorio`)
    if (!datos.direccion) throw new Error(`MISSING_ARGS: el campo 'direccion' es obligatorio`)
    if (!datos.edad) throw new Error(`MISSING_ARGS: el campo 'edad' es obligatorio`)
    if (!datos.telefono) throw new Error(`MISSING_ARGS: el campo 'telefono' es obligatorio`)
    if (!datos.foto) throw new Error(`MISSING_ARGS: el campo 'foto' es obligatorio`)

    return {
        username: datos.username,
        password: datos.password,
        direccion: datos.direccion,
        edad: datos.edad,
        telefono: datos.telefono,
        foto: datos.foto
    }
}



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    
    isAdmin: {
        type: Boolean,
        required: true, //si no se pone, no se puede crear un usuario sin ese campo
        default: false,

    }
},{
    timestamps: true, //crea dos campos, uno para cuando se creo el usuario y otro para cuando se actualizo
}); //crear un nuevo esquema de mongoose

const User = mongoose.model('User', userSchema); //crear un nuevo modelo de mongoose

export default User; //exportar el modelo para usarlo en otro archivo js que lo importe y lo use en otro componente