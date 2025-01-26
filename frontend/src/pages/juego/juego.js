import { getUsersCantWithId } from "../../components/userAPI.js";
import { getPreguntas } from "../../components/preguntaAPI.js";

document.addEventListener('DOMContentLoaded', function() {
    const cantJug = sessionStorage.getItem('jugadores');
    const userId = sessionStorage.getItem('userId');

    async function juego() {
        const jugadores = await getUsersCantWithId(userId, cantJug);
        const preguntas = await getPreguntas();

        console.log(preguntas);
        // Darle al jugador una pregunta
        const preguntaJugador = preguntas.Prueba[Math.floor(Math.random() * preguntas.Prueba.length)];

        console.log(preguntaJugador);
        // Mostrar la pregunta en la pantalla
        mostrarPregunta(preguntaJugador);

        // Empezar el temporizador de 30 minutos

        // Si el jugador responde correctamente primero, se le da una llave y se le pone el rol de almirante

        // Si el jugador es almirante mostrar un botón para que pueda dar preguntas en especifico a los demás jugadores

        // Si no ha contestado primero esperar de 5 a 8 minutos y colocarle el rol de almirante a otro jugador

        // Cuando termine la partida se asignaran los puntos a cada jugador: 1 por cada llave obtenida, 1 por convertirse en almirante y 2 si ganan la partida y 0 si pierden
    }

    function mostrarPregunta(pregunta) {
        const mainContent = document.querySelector('.main-content');

        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <h2>Pregunta</h2>
            <p>${pregunta.question}</p>
        `;

        const answerElement = document.createElement('div');
        answerElement.classList.add('answer');
        const answer = pregunta.answer;
        console.log(answer.length);

        answerElement.innerHTML = ``;

        if (answer.indexOf(',') > 0) {
            let comas = 0;
            for (let i = 0; i < answer.length; i++) {
                if (answer[i] === ',') {
                    comas++;
                }
            }
            if (comas > 0) {
                for (let j = 0; j < comas + 1; j++) {
                    answerElement.innerHTML += `
                        <div class="answer">
                            <select name="answerSelect${j}" id="answerSelect${j}" class="form-select mt-3">
                            </select>
                        </div>
                    `;
                }
            }

            const selectElements = document.querySelectorAll('.answer select');
            console.log(pregunta.answerSelect);
            const answerSelect = pregunta.answerSelect.split(',');
            console.log(answerSelect);
            if (pregunta.answerSelect != null) {
                console.log('entra');
                console.log(selectElements);
                console.log(answerSelect.length);
                for (let j = 0; j < comas+1; j++) {
                    for (let i = 0; i < answerSelect.length; i++) {
                        selectElements[j].innerHTML += `
                            <option value="${answerSelect[i]}">${answerSelect[i]}</option>
                        `;
                        console.log(answerSelect[i]);
                    }
                }
            }
            answerElement.innerHTML += `<button class="btn btn-primary mt-3" id="answerButton">Responder</button>`;
        } else if (answer.indexOf(':') > 0) {
            answerElement.innerHTML += `
                <div class="answer">
                    <label for="answer">Respuesta</label>
                    <input type="time" id="answer" class="form-control">
                    <button class="btn btn-primary mt-3" id="answerButton">Responder</button>
                </div>
            `;
        } else if (answer.indexOf('/') > 0) {
            answerElement.innerHTML += `
            <div class="answer">
                <label for="answer">Respuesta</label>
                <input type="date" id="answer" class="form-control">
                <button class="btn btn-primary mt-3" id="answerButton">Responder</button>
            </div>
        `;
        } else {
            answerElement.innerHTML += `
            <div class="answer">
                <label for="answer">Respuesta</label>
                <input type="text" id="answer" class="form-control">
                <button class="btn btn-primary mt-3" id="answerButton">Responder</button>
            </div>
        `;
        }

        mainContent.appendChild(questionElement);
        mainContent.appendChild(answerElement);
    }

    juego();
});