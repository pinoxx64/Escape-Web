import { getUserById } from "../../components/userAPI";

document.addEventListener("DOMContentLoaded", async () => {
    console.log(sessionStorage.getItem("userId"))
    const user = await getUserById(sessionStorage.getItem("userId"))
    document.getElementById("score").textContent = `Puntos: ${user.user.score}`

    document.getElementById("botonJuego").addEventListener("click", () => {
        const modal = new bootstrap.Modal(document.getElementById('buscarPartidaModal'))
        modal.show()
        sessionStorage.setItem("jugadores", 5 - Math.floor(Math.random() * 3))

        setTimeout(() => {
            modal.hide()
            window.location.href = "./../juego/juego.html"
        }, 4000)
    })
})