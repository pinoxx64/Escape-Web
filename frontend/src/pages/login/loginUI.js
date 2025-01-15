import { constantes } from "../../components/constantes.js"

document.addEventListener('DOMContentLoaded', () => {
  console.log("El DOM ha sido completamente cargado")

  const form = document.querySelector('.login-form')
  console.log("Formulario de login seleccionado:", form)

  if (!form) {
    console.error("No se encontró el formulario de login. Revisa el selector.")
    return
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault() 
    console.log("Evento submit capturado.")

    const email = form.querySelector('input[type="email"]').value
    const password = form.querySelector('input[type="password"]').value

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Por favor, ingresa un correo electrónico válido.')
      return
    }

    if (!password) {
      alert('Por favor, ingresa tu contraseña.')
      return
    }

    console.log("Datos capturados - Correo:", email, "Contraseña:", password)

    const rutaLogIn = constantes.urlApi + constantes.login
    console.log("Ruta para login:", rutaLogIn)

    try {
      const response = await fetch(rutaLogIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gmail: email,
          password: password
        }),
      })

      console.log("Respuesta recibida del servidor:", response)

      console.log("Datos parseados desde la respuesta:", response)

      if (response.ok && response.success) {
        console.log("Inicio de sesión exitoso. ID del usuario:", response.id)

        sessionStorage.setItem('userId', response.response.id)
        sessionStorage.setItem('token', response.response.token) 

        console.log("Datos guardados en sessionStorage. Redirigiendo...")
        window.location.href = '../inicio/inicio.html' 
      } else {
        console.warn("Inicio de sesión fallido. Mensaje del servidor:", response.message)
        alert(response.message || 'Error al iniciar sesión')
      }
    } catch (error) {
      console.error("Error en la solicitud fetch:", error)
      alert('Hubo un problema con la solicitud. Intenta de nuevo más tarde.')
    }
  })
})
