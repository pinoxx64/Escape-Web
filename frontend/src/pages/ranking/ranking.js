import { getUserOrderByScore } from "../../components/userAPI.js";
document.addEventListener("DOMContentLoaded", async () => {
    const ranking = await getUserOrderByScore()
    console.log(ranking)
    const rankingContainer = document.getElementById("ranking-container")
    ranking.user.forEach((user) => {
        const userDiv = document.createElement("div")
        userDiv.innerHTML = `Nombre: ${user.name}, Puntuacion: ${user.score}`
        rankingContainer.appendChild(userDiv)
    })
})  