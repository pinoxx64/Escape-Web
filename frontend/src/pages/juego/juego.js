import { getUsersCantWithId } from "../../components/userAPI.js"
import { getPreguntas } from "../../components/preguntaAPI.js"

document.addEventListener('DOMContentLoaded', function() {
    const cantJug = sessionStorage.getItem('jugadores')
    const userId = sessionStorage.getItem('userId')

    async function juego() {
        const jugadores = await getUsersCantWithId(userId, cantJug)
        const preguntas = await getPreguntas()

        //Darle a cada jugador una pregunta

        //Mostrar la pregunta en la pantalla, el tiempo restante, las llaves conseguidas y un boton para dar un pista (reducira el tiempo 3 minutos)

        //Empezar el temporizador de 30 minutos

        //Si el jugador responde correctamente primero, se le da una llave y se le pone el rol de almirante

        //Si el jugador es almirante mostrar un botón para que pueda dar preguntas en especifico a los demás jugadores

        //Si no ha contestado primero esperar de 5 a 8 minutos y colocarle el rol de almirante a otro jugador

        //Cuando termine la partida se asignaran los puntos a cada jugador: 1 por cada llave obtenida, 1 por convertirse en almirante y 2 si ganan la partida y 0 si pierden

    }

    
});