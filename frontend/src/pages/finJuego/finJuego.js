import { getUserById, putUser } from "../../components/userAPI"

document.addEventListener('DOMContentLoaded', async function () {
    const jugadores = sessionStorage.getItem('jugadoresEnPartida').split(',')
    const ganar = sessionStorage.getItem('ganar')

    const mainContent = document.querySelector('main')
    mainContent.innerHTML = ''

    const messageElement = document.createElement('div')
    messageElement.style.fontSize = '48px'
    messageElement.style.textAlign = 'center'
    messageElement.style.marginTop = '20%'
    console.log(jugadores)

    if (ganar === "true") {
        messageElement.textContent = '¡Habéis escapado!'

        for (const jugador of jugadores) {
            const jug = await getUserById(jugador)
            console.log(jug)
            const jugadorInfo = {
                name : jug.user.name,
                email : jug.user.email,
                active : jug.user.active,
                score : jug.user.score+2
            }
            await putUser(jug.user.id, jugadorInfo)
            console.log('Puntos subidos')
        }
    } else {
        messageElement.textContent = 'No lo lograsteis'
    }

    mainContent.appendChild(messageElement)

    setTimeout(() => {
        window.location.href = './../inicio/inicio.html'
    }, 4000)
})