import { getUserById } from "../../components/userAPI";

document.addEventListener("DOMContentLoaded", async () => {
    console.log(sessionStorage.getItem("userId"))
    const user = await getUserById(sessionStorage.getItem("userId"))
    document.getElementById("score").textContent = `Puntos: ${user.user.score}`
})