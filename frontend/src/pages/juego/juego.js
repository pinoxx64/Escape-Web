import { getUsersCantWithId } from "../../components/userAPI.js"
import { getPreguntas } from "../../components/preguntaAPI.js"

document.addEventListener('DOMContentLoaded', function() {
    const cantJug = sessionStorage.getItem('jugadores')
    const userId = sessionStorage.getItem('userId')

    async function juego() {
        const jugadores = await getUsersCantWithId(userId, cantJug)
        const preguntas = await getPreguntas()

        console.log(preguntas)
        //Darle al jugador una pregunta
        const numAle = Math.floor(Math.random() * preguntas.Prueba.length)
        const preguntaJugador = preguntas.Prueba[numAle]
        
        console.log(preguntaJugador)
        //Mostrar la pregunta en la pantalla, el tiempo restante, las llaves conseguidas y un boton para dar un pista (reducira el tiempo 3 minutos)
        mostrarPregunta(preguntaJugador)

        //Empezar el temporizador de 30 minutos

        //Si el jugador responde correctamente primero, se le da una llave y se le pone el rol de almirante

        //Si el jugador es almirante mostrar un botón para que pueda dar preguntas en especifico a los demás jugadores

        //Si no ha contestado primero esperar de 5 a 8 minutos y colocarle el rol de almirante a otro jugador

        //Cuando termine la partida se asignaran los puntos a cada jugador: 1 por cada llave obtenida, 1 por convertirse en almirante y 2 si ganan la partida y 0 si pierden

    }

    function mostrarPregunta(pregunta) {
        const mainContent = document.querySelector('.main-content');

        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <h2>Pregunta</h2>
            <p>${pregunta.question}</p>
        `;

        const clueButtonElement = document.createElement('button');
        clueButtonElement.classList.add('btn', 'btn-primary', 'mt-3');
        clueButtonElement.setAttribute('data-bs-toggle', 'modal');
        clueButtonElement.setAttribute('data-bs-target', '#clueModal');
        clueButtonElement.textContent = 'Mostrar Pista';

        const clueModalElement = document.createElement('div');
        const clueModal = `
                <div class="modal" id="clueModal">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Pista</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                    
                            <div class="modal-body">
                                <p>${pregunta.clue}</p>
                            </div>
                        </div>
                    </div>
                </div>       
            `
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer');
        const answer = pregunta.answer;
        console.log(answer.length)

        answerElement.innerHTML = `
        <div class="answer">
            <label for="answer">Respuesta</label>
            <input type="text" id="answer" class="form-control">
            <button class="btn btn-primary mt-3" id="answerButton">Responder</button>
        </div>
    `

        if (answer.indexOf(',') > 0) { //Select
            let comas = 0
            for (let i = 0; i < answer.length; i++) {
                if (answer[i] === ',') {
                answerElement.innerHTML += `` //Poner un select con las opciones de answerSelect 
                }
            }


        }else if (answer.indexOf(':') > 0) { //Horas
            
        }else if (answer.indexOf('/') > 0) { //Fecha

        }
        // ver e imprimir cuantas llaves tienen

        mainContent.appendChild(questionElement);
        mainContent.appendChild(clueButtonElement);
        mainContent.appendChild(clueModalElement);
        mainContent.appendChild(answerElement);

        document.body.insertAdjacentHTML('beforeend', clueModal);
    }

    juego()
    
});