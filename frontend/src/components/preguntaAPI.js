import { constantes } from "./constantes.js"

export const getPreguntas = async () => {
    const rutaPrueba = constantes.urlApi + constantes.prueba

    try {
        const respuesta = await fetch(rutaPrueba, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener la lista de Pruebas. Código de estado: ${respuesta.status}`)
        }

        const pruebas = await respuesta.json()
        return pruebas

    } catch (error) {
        console.error('Error en la función getPrueba:', error.message)
        throw error
    }
}

export const getPreguntaById = async (pruebaId) => {
    const rutaPrueba = constantes.urlApi + constantes.prueba

    try {
        const respuesta = await fetch(rutaPrueba + pruebaId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            throw new Error(`Error al obtener el Prueba. Código de estado: ${respuesta.status}`)
        }

        const prueba = await respuesta.json()
        return prueba
    } catch (error) {
        console.error('Error en la función getPruebaById:', error.message)
        throw error
    }
}

export const postPregunta = async (prueba) => {
    const rutaPrueba = constantes.urlApi + constantes.prueba

    try {
        const respuesta = await fetch(rutaPrueba, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(prueba),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir el Prueba. Código de estado: ${respuesta.status}`)
        }

        const resultado = await respuesta.json()
        console.log(resultado)
        return resultado
    } catch (error) {
        console.error('Error en la función register:', error.message)
        throw error
    }
}

export const putPregunta = async (pruebaId, prueba) => {
    const rutaPrueba = constantes.urlApi + constantes.prueba
    try {
        const respuesta = await fetch(rutaPrueba + pruebaId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(prueba),
        })

        if (!respuesta.ok) {
            throw new Error(`Error al editar el Prueba. Código de estado: ${respuesta.status}`)
        }

        const resultado = await respuesta.json()
        return resultado
    } catch (error) {
        console.error('Error en la función putPrueba:', error.message)
        throw error
    }
}

export const resultPregunta = async (pruebaId, answer) => {
    const rutaPrueba = constantes.urlApi + constantes.prueba
    try {
        const respuesta = await fetch(rutaPrueba + 'answer/' + pruebaId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answer),
        })

        if (!respuesta.ok) {
            throw new Error(`Error al comprobar el Prueba. Código de estado: ${respuesta.status}`)
        }

        const resultado = await respuesta.json()
        return resultado
    } catch (error) {
        console.error('Error en la función resultPregunta:', error.message)
        throw error
    }
}

export const asigPregunta = async (pruebas) => {
    const rutaPrueba = constantes.urlApi + constantes.prueba

    try {
        const respuesta = await fetch(rutaPrueba + 'asig/nuevo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pruebas),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al asignar el Prueba. Código de estado: ${respuesta.status}`)
        }

        const resultado = await respuesta.json()
        console.log(resultado)
        return resultado
    } catch (error) {
        console.error('Error en la función asigPregunta:', error.message)
        throw error
    }
}