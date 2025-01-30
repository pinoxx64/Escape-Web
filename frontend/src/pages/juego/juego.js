import { getUsersCantWithId } from "../../components/userAPI.js"
import { getPreguntas } from "../../components/preguntaAPI.js"
import { postUserRol } from "../../components/userRolAPI.js"

document.addEventListener('DOMContentLoaded', async function () {
    const cantJug = sessionStorage.getItem('jugadores')
    const userId = sessionStorage.getItem('userId')
    sessionStorage.setItem('type', 'input')

    async function juego() {
        const jugadores = await getUsersCantWithId(userId, cantJug)
        const preguntasData = await getPreguntas()
        let preguntas = preguntasData.Prueba

        let llave = 0
        sessionStorage.setItem('llave', llave)

        console.log(preguntas)

        const randomIndex = Math.floor(Math.random() * preguntas.length)
        let preguntaActual = preguntas[randomIndex]
        preguntas.splice(randomIndex, 1)

        mostrarPregunta(preguntaActual)
        iniciarTemporizador(30 * 60, document.getElementById('timer'))
        eventoRespuesta(preguntaActual, preguntas)
        

    }

    function mostrarPregunta(pregunta) {
        const mainContent = document.querySelector('.main-content')
        mainContent.innerHTML = ''

        const questionElement = document.createElement('div')
        questionElement.classList.add('question')
        questionElement.innerHTML = `
            <h2>Pregunta</h2>
            <p>${pregunta.question}</p>
        `

        const answerElement = document.createElement('div')
        answerElement.classList.add('answer')
        const answer = pregunta.answer
        console.log(answer.length)

        answerElement.innerHTML = ``

        if (answer.indexOf(',') > 0) {
            sessionStorage.setItem('type', 'select')
            let comas = 0
            for (let i = 0; i < answer.length; i++) {
                if (answer[i] === ',') {
                    comas++
                }
            }
            if (comas > 0) {
                for (let j = 0; j < comas + 1; j++) {
                    answerElement.innerHTML += `
                        <div class="answer">
                            <select name="answerSelect${j}" id="answerSelect${j}" class="form-select mt-3">
                            </select>
                        </div>
                    `
                }
            }

            console.log(answerElement)
            mainContent.appendChild(questionElement)
            mainContent.appendChild(answerElement)

            const answerSelect = pregunta.answerSelect.split(',')
            console.log(answerSelect)
            if (pregunta.answerSelect != null) {
                console.log('entra')
                console.log(answerSelect.length)
                for (let j = 0; j < comas + 1; j++) {
                    const selectElement = document.getElementById(`answerSelect${j}`)
                    console.log(selectElement)
                    for (let i = 0; i < answerSelect.length; i++) {
                        selectElement.innerHTML += `
                            <option value="${answerSelect[i]}">${answerSelect[i]}</option>
                        `
                    }
                }
            }
            answerElement.innerHTML += `<button class="btn btn-primary mt-3" id="answerButton">Responder</button>`
        } else if (answer.indexOf(':') > 0) {
            sessionStorage.setItem('type', 'input')
            answerElement.innerHTML += `
                <div class="answer">
                    <label for="answer">Respuesta</label>
                    <input type="time" step="1" id="answer" class="form-control">
                    <button class="btn btn-primary mt-3" id="answerButton">Responder</button>
                </div>
            `
            console.log(answerElement)
            mainContent.appendChild(questionElement)
            mainContent.appendChild(answerElement)
        } else if (answer.indexOf('/') > 0) {
            sessionStorage.setItem('type', 'input')
            answerElement.innerHTML += `
            <div class="answer">
                <label for="answer">Respuesta</label>
                <input type="date" id="answer" class="form-control">
                <button class="btn btn-primary mt-3" id="answerButton">Responder</button>
            </div>
        `
        console.log(answerElement)
        mainContent.appendChild(questionElement)
        mainContent.appendChild(answerElement)
        } else {
            sessionStorage.setItem('type', 'input')
            answerElement.innerHTML += `
            <div class="answer">
                <label for="answer">Respuesta</label>
                <input type="text" id="answer" class="form-control">
                <button class="btn btn-primary mt-3" id="answerButton">Responder</button>
            </div>
        `
        console.log(answerElement)
        mainContent.appendChild(questionElement)
        mainContent.appendChild(answerElement)
        }


        const clueButtonElement = document.createElement('button')
        clueButtonElement.classList.add('btn', 'btn-secondary', 'mt-3')
        clueButtonElement.setAttribute('data-bs-toggle', 'modal')
        clueButtonElement.setAttribute('data-bs-target', '#clueModal')
        clueButtonElement.textContent = 'Pista'
        answerElement.appendChild(clueButtonElement);

        const clueModalElement = document.createElement('div')
        clueModalElement.classList.add('modal', 'fade', 'text-black')
        clueModalElement.id = 'clueModal'
        clueModalElement.setAttribute('tabindex', '-1')
        clueModalElement.setAttribute('aria-labelledby', 'clueModalLabel')
        clueModalElement.setAttribute('aria-hidden', 'true')
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
        `
        mainContent.appendChild(clueModalElement)

        const llave = sessionStorage.getItem('llave')
        const keyElement = document.createElement('div')
        keyElement.classList.add('key')
        keyElement.innerHTML = `
            <h2>Llaves</h2>
            <p>${llave}/5</p>
        `
        mainContent.appendChild(keyElement)
    }

    function iniciarTemporizador(duracion, display) {

        let timer = duracion
        setInterval(() => {
            let minutes = parseInt(timer / 60, 10)
            let seconds = parseInt(timer % 60, 10)

            display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

            if (--timer < 0) {
                window.location.href = "./../finJuego/finJuego.html"
            }
        }, 1000)
    }

    function eventoRespuesta(preguntaActual, preguntas) {
        document.getElementById('answerButton').addEventListener('click', () => {
            const type = sessionStorage.getItem('type')
            console.log(type)
            let respuestas = []

            if (type === 'select') {
                document.querySelectorAll('select').forEach(select => respuestas.push(select.value))
                console.log(respuestas)
            } else {
                console.log(document.getElementById('answer'))
                respuestas.push(document.getElementById('answer').value)
            }

            if (respuestas.toString() === preguntaActual.answer) {
                let llave = parseInt(sessionStorage.getItem('llave'), 10) + 1
                sessionStorage.setItem('llave', llave)

                if (llave === 1) {
                    const userRol = { userId: sessionStorage.getItem('userId'), rolId: 3 }
                    // await postUserRol(userRol, 3)
                }else if(llave === 5){
                    window.location.href = "./../finJuego/finJuego.html"
                }

                console.log('Respuesta correcta')

                if (llave < 5 && preguntas.length > 0) {
                    const randomIndex = Math.floor(Math.random() * preguntas.length)
                    let nuevaPregunta = preguntas[randomIndex]
                    preguntas.splice(randomIndex, 1)
                    mostrarPregunta(nuevaPregunta)
                    eventoRespuesta(nuevaPregunta, preguntas)
                }
            } else {
                if (sessionStorage.getItem('type') === 'input') {
                    document.getElementById('answer').style.borderColor = 'red'
                    console.log('Respuesta incorrecta')
                }else{
                    document.querySelectorAll('select').forEach(select => select.style.borderColor = 'red')
                }
            }
        })
    }

    function iniciarBots(cantidad) {
        
    }
    await juego()
})
