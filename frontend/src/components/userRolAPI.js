import { constantes } from "./constantes.js"

export const getUserRol = async () => {
    const rutaUserRol = constantes.urlApi + constantes.userRol

    try {
        const respuesta = await fetch(rutaUserRol, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la lista de userRol. Código de estado: ${respuesta.status}`)
        }

        const userRol = await respuesta.json()
        return userRol

    } catch (error) {
        console.error('Error en la función getUser:', error.message)
        throw error
    }
}

export const getUserRolByUserId = async (userId) => {
    const rutaUserRol = constantes.urlApi + constantes.userRol + constantes.user

    try {
        const respuesta = await fetch(rutaUserRol + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la lista de userRol. Código de estado: ${respuesta.status}`)
        }

        const userRol = await respuesta.json()
        return userRol

    } catch (error) {
        console.error('Error en la función getUser:', error.message)
        throw error
    }
}

export const getUserRolByRolId = async (rolId) => {
    
}

export const postUserRol = async (userRol) => {
    const rutaUsuario = constantes.urlApi + constantes.userRol
    
    try {
        const respuesta = await fetch(rutaUsuario, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRol),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir el usuario rol. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función postUsuarioRol:', error.message);
        throw error;
    }
}

export const deleteUserRol = async (userId, rolId) => {
    const rutaUsuario = constantes.urlApi + constantes.userRol

    try {
        const respuesta = await fetch(rutaUsuario + userId + '/' + rolId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al eliminar el rol del usuario. Código de estado: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error en la función deleteUsuarioRol:', error.message)
        throw error
    }
}