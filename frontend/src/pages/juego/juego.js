import { getUsersExcludingId } from "../../components/userAPI.js"

document.addEventListener('DOMContentLoaded', function() {
    const cantJug = sessionStorage.getItem('jugadores')
    const userId = sessionStorage.getItem('userId')
    const jugadores = getUsersExcludingId(userId, cantJug)

    
});