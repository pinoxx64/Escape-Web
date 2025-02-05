import { getUsersCantWithId } from "../../components/userAPI.js";
import { asigPregunta, getPreguntasActives, resultPregunta } from "../../components/preguntaAPI.js";
import { deleteUserRol, postUserRol, getUserRolByUserId } from "../../components/userRolAPI.js";

document.addEventListener('DOMContentLoaded', async function () {
    const cantJug = sessionStorage.getItem('jugadores');
    const userId = sessionStorage.getItem('userId');
    sessionStorage.setItem('type', 'input');

    async function juego() {
        const jugadores = await getUsersCantWithId(userId, cantJug);
        const preguntasData = await getPreguntasActives();
        console.log(preguntasData)
        let preguntas = preguntasData.PruebasActivas;

        let llave = 0;
        sessionStorage.setItem('llave', llave);

        console.log(preguntas);

        const randomIndex = Math.floor(Math.random() * preguntas.length);
        let preguntaActual = preguntas[randomIndex];
        preguntas.splice(randomIndex, 1);

        await mostrarPregunta(preguntaActual);
        iniciarBot(jugadores, preguntas);
        iniciarTemporizador(1800, document.getElementById('timer'));
        eventoRespuesta(preguntaActual, preguntas, jugadores);
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
            answerElement.setAttribute('id', 'selects')
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

    }

    function iniciarTemporizador(duracion, display) {
        let timer = duracion, minutos, segundos;
        setInterval(function () {
            minutos = parseInt(timer / 60, 10);
            segundos = parseInt(timer % 60, 10);

            minutos = minutos < 10 ? "0" + minutos : minutos;
            segundos = segundos < 10 ? "0" + segundos : segundos;

            display.textContent = minutos + ":" + segundos;

            if (--timer < 0) {
                sessionStorage.setItem('ganar', false)
                window.location.href = "./../finJuego/finJuego.html";
            }
        }, 1000);
    }

    async function eventoRespuesta(preguntaActual, preguntas, jugadores) {
        document.getElementById('answerButton').addEventListener('click', async () => {
            const type = sessionStorage.getItem('type');
            console.log(type);
            let respuestas = [];

            if (type === 'select') {
                const selectsContainer = document.getElementById('selects');
                if (selectsContainer) {
                    selectsContainer.querySelectorAll('select').forEach(select => respuestas.push(select.value));
                }
                console.log(respuestas);
            } else {
                console.log(document.getElementById('answer'));
                respuestas.push(document.getElementById('answer').value);
            }

            const answer = {
                answer: respuestas.toString()
            };

            if (await resultPregunta(preguntaActual.id, answer)) {
                let llave = parseInt(sessionStorage.getItem('llave'), 10) + 1;
                sessionStorage.setItem('llave', llave);
                const userRol = { userId: sessionStorage.getItem('userId'), rolId: 3 };
                console.log(userRol)
                if (llave === 1 ) { //poner aqui que si ya esta ocupado el rol de almirante no lo asigne
                    await postUserRol(userRol, 3);
                } else if (llave === 5) {
                    await deleteUserRol(userRol.userId, 3);
                    console.log(jugadores.user.length)
                    let idJugadores = [userId]
                    for (let i = 0; i < jugadores.user.length; i++) {
                        idJugadores.push(jugadores.user[i].id)
                    }
                    sessionStorage.setItem("jugadoresEnPartida", idJugadores)
                    sessionStorage.setItem("ganar", true)
                    window.location.href = "./../finJuego/finJuego.html";
                }

                console.log('Respuesta correcta');

                if (llave < 5 && preguntas.length > 0) {
                    const preguntasArray = {
                        preguntas: preguntas
                    };
                    const preguntasCambiadas = await asigPregunta(preguntasArray);
                    console.log(preguntasCambiadas);
                    console.log(preguntasCambiadas.NuevaPrueba);
                    await mostrarPregunta(preguntasCambiadas.NuevaPrueba, jugadores);
                    eventoRespuesta(preguntasCambiadas.NuevaPrueba, preguntasCambiadas.Prueba, jugadores);
                    mostrarJugadoresAlmirante(preguntasCambiadas.Prueba, jugadores)
                }
            } else {
                if (sessionStorage.getItem('type') === 'input') {
                    document.getElementById('answer').style.borderColor = 'red';
                    console.log('Respuesta incorrecta');
                } else {
                    const selectsContainer = document.getElementById('selects');
                    if (selectsContainer) {
                        selectsContainer.querySelectorAll('select').forEach(select => select.style.borderColor = 'red');
                    }
                }
            }
        });
    }

    async function mostrarJugadoresAlmirante(preguntas, jugadores) {
        const mainContent = document.querySelector('.main-content');

        const userRol = await getUserRolByUserId(userId)
        let cont = false
        let num = 0
        do {
            console.log(userRol.user[num].rolId)
            if (userRol.user[num].rolId == 3) {
                cont = true
            }
            num++
        } while (cont == false || num > userRol.user.length);
        if (cont) {
            const usersElement = document.createElement('div');
            usersElement.classList.add('users');
            usersElement.style.position = 'absolute';
            usersElement.style.right = '10px';
            usersElement.style.top = '50px';
            usersElement.style.textAlign = 'left';
            console.log(preguntas)

            jugadores.user.forEach(jugador => {
                const userDiv = document.createElement('div');
                userDiv.classList.add('user');
                userDiv.innerHTML = `
                    <p>${jugador.name}</p>
                    <select class="form-select mt-1">
                        ${preguntas.length < jugadores.user.length ? '<option value="ninguna">Ninguna</option>' : ''}
                        ${preguntas.map(pregun => `<option value="${pregun.id}">${pregun.id}</option>`).join('')}
                    </select>
                `;
                usersElement.appendChild(userDiv);
            });

            mainContent.appendChild(usersElement);
        }
    }

    async function iniciarBot(jugadores, preguntas) {
        jugadores.user.forEach(jugador => {
            if (jugador.rolId !== 3) {
                const randomTime = Math.floor(Math.random() * 3 + 4) * 60000;
                setTimeout(async () => {
                    const selectElement = document.querySelector(`.user select`);
                    if (selectElement) {
                        const preguntaId = selectElement.value;
                        const pregunta = preguntas.find(p => p.id == preguntaId);
                        if (pregunta) {
                            const answer = {
                                answer: pregunta.answer
                            };
                            if (await resultPregunta(pregunta.id, answer)) {
                                let llave = parseInt(sessionStorage.getItem('llave'), 10) + 1;
                                sessionStorage.setItem('llave', llave);
                                console.log('Bot ha resuelto una pregunta correctamente');

                                if (llave === 1) {
                                    const userRol = { userId: jugador.id, rolId: 3 };
                                    await postUserRol(userRol, 3);
                                } else if (llave === 5) {
                                    await deleteUserRol(userRol.userId, 3);
                                    let idJugadores = [userId];
                                    for (let i = 0; i < jugadores.user.length; i++) {
                                        idJugadores.push(jugadores.user[i].id);
                                    }
                                    sessionStorage.setItem("jugadoresEnPartida", idJugadores);
                                    sessionStorage.setItem("ganar", true);
                                    window.location.href = "./../finJuego/finJuego.html";
                                }

                                if (llave < 5 && preguntas.length > 0) {
                                    const preguntasArray = {
                                        preguntas: preguntas
                                    };
                                    const preguntasCambiadas = await asigPregunta(preguntasArray);
                                    console.log(preguntasCambiadas);
                                    console.log(preguntasCambiadas.NuevaPrueba);
                                    await mostrarPregunta(preguntasCambiadas.NuevaPrueba, jugadores);
                                    eventoRespuesta(preguntasCambiadas.NuevaPrueba, preguntasCambiadas.Prueba, jugadores);
                                    mostrarJugadoresAlmirante(preguntasCambiadas.Prueba, jugadores);
                                }
                            }
                        }
                    }
                }, randomTime);
            }
        });
    }

    await juego();
});