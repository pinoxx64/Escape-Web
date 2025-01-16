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

export const postUserRol = async (user) => {
    
}

export const deleteUserRol = async (userId, rolId) => {
    
}