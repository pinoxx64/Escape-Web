import { getUsersCantWithId } from "../../components/userAPI.js";
import { asigPregunta, getPreguntas, resultPregunta } from "../../components/preguntaAPI.js";
import { deleteUserRol, postUserRol, getUserRolByUserId} from "../../components/userRolAPI.js";

document.addEventListener('DOMContentLoaded', async function () {
    const cantJug = sessionStorage.getItem('jugadores');
    const userId = sessionStorage.getItem('userId');
    sessionStorage.setItem('type', 'input');

    async function juego() {
        const jugadores = await getUsersCantWithId(userId, cantJug);
        const preguntasData = await getPreguntas();
        let preguntas = preguntasData.Prueba;

        let llave = 0;
        sessionStorage.setItem('llave', llave);

        console.log(preguntas);

        const randomIndex = Math.floor(Math.random() * preguntas.length);
        let preguntaActual = preguntas[randomIndex];
        preguntas.splice(randomIndex, 1);

        await mostrarPregunta(preguntaActual);
        iniciarTemporizador(30 * 60, document.getElementById('timer'));
        eventoRespuesta(preguntaActual, preguntas);
    }

    async function mostrarPregunta(pregunta) {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = '';

        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        console.log(pregunta)
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
            sessionStorage.setItem('type', 'select');
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

            console.log(answerElement);
            mainContent.appendChild(questionElement);
            mainContent.appendChild(answerElement);

            const answerSelect = pregunta.answerSelect.split(',');
            console.log(answerSelect);
            if (pregunta.answerSelect != null) {
                console.log('entra');
                console.log(answerSelect.length);
                for (let j = 0; j < comas + 1; j++) {
                    const selectElement = document.getElementById(`answerSelect${j}`);
                    console.log(selectElement);
                    for (let i = 0; i < answerSelect.length; i++) {
                        selectElement.innerHTML += `
                            <option value="${answerSelect[i]}">${answerSelect[i]}</option>
                        `;
                    }
                }
            }
            answerElement.innerHTML += `<button class="btn btn-primary mt-3" id="answerButton">Responder</button>`;
        } else if (answer.indexOf(':') > 0) {
            sessionStorage.setItem('type', 'input');
            answerElement.innerHTML += `
                <div class="answer">
                    <label for="answer">Respuesta</label>
                    <input type="time" step="1" id="answer" class="form-control">
                    <button class="btn btn-primary mt-3" id="answerButton">Responder</button>
                </div>
            `;
            console.log(answerElement);
            mainContent.appendChild(questionElement);
            mainContent.appendChild(answerElement);
        } else if (answer.indexOf('/') > 0) {
            sessionStorage.setItem('type', 'input');
            answerElement.innerHTML += `
            <div class="answer">
                <label for="answer">Respuesta</label>
                <input type="date" id="answer" class="form-control">
                <button class="btn btn-primary mt-3" id="answerButton">Responder</button>
            </div>
        `;
            console.log(answerElement);
            mainContent.appendChild(questionElement);
            mainContent.appendChild(answerElement);
        } else {
            sessionStorage.setItem('type', 'input');
            answerElement.innerHTML += `
            <div class="answer">
                <label for="answer">Respuesta</label>
                <input type="text" id="answer" class="form-control">
                <button class="btn btn-primary mt-3" id="answerButton">Responder</button>
            </div>
        `;
            console.log(answerElement);
            mainContent.appendChild(questionElement);
            mainContent.appendChild(answerElement);
        }

        const clueButtonElement = document.createElement('button');
        clueButtonElement.classList.add('btn', 'btn-secondary', 'mt-3');
        clueButtonElement.setAttribute('data-bs-toggle', 'modal');
        clueButtonElement.setAttribute('data-bs-target', '#clueModal');
        clueButtonElement.textContent = 'Pista';
        answerElement.appendChild(clueButtonElement);

        const clueModalElement = document.createElement('div');
        clueModalElement.classList.add('modal', 'fade', 'text-black');
        clueModalElement.id = 'clueModal';
        clueModalElement.setAttribute('tabindex', '-1');
        clueModalElement.setAttribute('aria-labelledby', 'clueModalLabel');
        clueModalElement.setAttribute('aria-hidden', 'true');
        clueModalElement.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="clueModalLabel">Pista</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${pregunta.clue}
                    </div>
                </div>
            </div>
        `;
        mainContent.appendChild(clueModalElement);

        const llave = sessionStorage.getItem('llave');
        const keyElement = document.createElement('div');
        keyElement.classList.add('key');
        keyElement.innerHTML = `
            <h2>Llaves</h2>
            <p>${llave}/5</p>
        `;
        mainContent.appendChild(keyElement);
        
        const userRol = await getUserRolByUserId(userId)
        let cont = false
        let num = 0
        do {
            console.log(userRol.user[num].rolId )
            if (userRol.user[num].rolId == 3) {
                cont = true
            }
            num++
        } while (cont == false);
        if (cont) {
            // Aqui agregar para que añada la parte correspondiente al almirante
        }
    }

    function iniciarTemporizador(duracion, display) {
        let timer = duracion, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                window.location.href = "./../finJuego/finJuego.html";
            }
        }, 1000);
    }

    async function eventoRespuesta(preguntaActual, preguntas) {
        document.getElementById('answerButton').addEventListener('click', async () => {
            const type = sessionStorage.getItem('type');
            console.log(type);
            let respuestas = [];

            if (type === 'select') {
                document.querySelectorAll('select').forEach(select => respuestas.push(select.value));
                console.log(respuestas);
            } else {
                console.log(document.getElementById('answer'));
                respuestas.push(document.getElementById('answer').value);
            }
            
            const answer = {
                answer: respuestas.toString()
            }

            if (await resultPregunta(preguntaActual.id, answer)) {
                let llave = parseInt(sessionStorage.getItem('llave'), 10) + 1
                sessionStorage.setItem('llave', llave)
                const userRol = { userId: sessionStorage.getItem('userId'), rolId: 3 }
                if (llave === 1) {
                    await postUserRol(userRol, 3);
                } else if (llave === 5) {
                    await deleteUserRol(userRol, 3)
                    window.location.href = "./../finJuego/finJuego.html";
                }

                console.log('Respuesta correcta');

                if (llave < 5 && preguntas.length > 0) {
                    
                    const preguntasArray = {
                        preguntas: preguntas
                    }
                    const preguntasCambiadas = await asigPregunta(preguntasArray)
                    console.log(preguntasCambiadas)
                    console.log(preguntasCambiadas.NuevaPrueba)
                    await mostrarPregunta(preguntasCambiadas.NuevaPrueba);
                    eventoRespuesta(preguntasCambiadas.NuevaPrueba, preguntasCambiadas.Prueba);
                }
            } else {
                if (sessionStorage.getItem('type') === 'input') {
                    document.getElementById('answer').style.borderColor = 'red';
                    console.log('Respuesta incorrecta');
                } else {
                    document.querySelectorAll('select').forEach(select => select.style.borderColor = 'red');
                }
            }
        });
    }

    function iniciarBot(){
        //Cronometro hasta que vea si el usuario acierta la pregunta antes de X minutos
        //Si el jugador no es el primero darle un rol a un bot
        //Cada X minutos los bots resolveran problemas

    }

    await juego();
});