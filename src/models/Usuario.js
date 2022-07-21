
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