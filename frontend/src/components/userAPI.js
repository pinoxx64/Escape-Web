import { constantes } from "./constantes.js"

export const getUser = async () => {
    const rutaUser = constantes.urlApi + constantes.user

    try {
        const respuesta = await fetch(rutaUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la lista de users. Código de estado: ${respuesta.status}`)
        }

        const users = await respuesta.json()
        return users

    } catch (error) {
        console.error('Error en la función getUser:', error.message)
        throw error
    }
}

export const getUserById = async (userId) => {
    const rutaUser = constantes.urlApi + constantes.user

    try {
        const respuesta = await fetch(rutaUser + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener el User. Código de estado: ${respuesta.status}`)
        }

        const User = await respuesta.json()
        return User
    } catch (error) {
        console.error('Error en la función getUserById:', error.message)
        throw error
    }
}

export const getUserByEmail = async (email) => {
    const rutaUser = constantes.urlApi + constantes.user

    try {
        const respuesta = await fetch(rutaUser + 'email/' + email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener el User. Código de estado: ${respuesta.status}`)
        }

        const User = await respuesta.json()
        return User
    } catch (error) {
        console.error('Error en la función getUserByEmail:', error.message)
        throw error
    } 
}

// export const postUser = async () => {
    
// }


export const register = async (user) => {
    const rutaUser = constantes.urlApi + constantes.registro

    try {
        const respuesta = await fetch(rutaUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                //'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(user),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir el User. Código de estado: ${respuesta.status}`)
        }

        const resultado = await respuesta.json()
        console.log(resultado)
        return resultado
    } catch (error) {
        console.error('Error en la función register:', error.message)
        throw error
    }
}

export const putUser = async (userId, user) => {
    const rutaUser = constantes.urlApi + constantes.user
    try {
        const respuesta = await fetch(rutaUser + userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(user),
        })

        if (!respuesta.ok) {
            throw new Error(`Error al editar el user. Código de estado: ${respuesta.status}`)
        }

        const resultado = await respuesta.json()
        return resultado
    } catch (error) {
        console.error('Error en la función putuser:', error.message)
        throw error
    }
}

export const getIfEmailExist = async (email) => {
    const rutaUser = constantes.urlApi + constantes.user

    try {
        const respuesta = await fetch(rutaUser + 'emailExist/' + email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener el User. Código de estado: ${respuesta.status}`)
        }

        const User = await respuesta.json()
        return User
    } catch (error) {
        console.error('Error en la función getUserByEmail:', error.message)
        throw error
    } 
}

export const getUserOrderByScore = async () => {
    const rutaUser = constantes.urlApi + 'userScore'

    try {
        const respuesta = await fetch(rutaUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la lista de users. Código de estado: ${respuesta.status}`)
        }

        const users = await respuesta.json()
        return users

    } catch (error) {
        console.error('Error en la función getUser:', error.message)
        throw error
    }
}

export const getUsersWithUserRol= async () => {
    const rutaUser = constantes.urlApi + 'userUserRol'

    try {
        const respuesta = await fetch(rutaUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la lista de users. Código de estado: ${respuesta.status}`)
        }

        const users = await respuesta.json()
        return users

    } catch (error) {
        console.error('Error en la función getUser:', error.message)
        throw error
    }
}

export const getUsersExcludingId = async (id, num) => {
    const rutaUser = constantes.urlApi + constantes.user + 'userExclude/' + id + '/' + num

    try {
        const respuesta = await fetch(rutaUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la lista de users. Código de estado: ${respuesta.status}`)
        }

        const users = await respuesta.json()
        return users

    } catch (error) {
        console.error('Error en la función getUser:', error.message)
        throw error
    }
}