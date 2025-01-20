import { getUsersWithUserRol, putUser } from "../../components/userAPI.js"
import { deleteUserRol, postUserRol } from "../../components/userRolAPI.js"

document.addEventListener("DOMContentLoaded", function () {
    async function rellenarUsers() {
        const userWithUserRols = await getUsersWithUserRol()
        console.log(userWithUserRols)
        const Users = userWithUserRols.user.original

        //crearUserUI()
        const tabla = $('#Users').DataTable()
        tabla.clear().draw()
        Users.user.forEach(usu => {
            if (usu.active == 1) {
                const row = tabla.row.add([
                    usu.name,
                    usu.email,
                    usu.score,
                    `<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#myModal${usu.id}"><i class="fas fa-edit"></i> Editar</button>` +
                    `<button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal${usu.id}" ><i class="fas fa-trash-alt"></i> Eliminar</button>` +
                    `<button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#rolModal${usu.id}" ><i class="fas fa-trash-alt"></i> Roles</button>`
                ]).draw()

                document.body.insertAdjacentHTML('beforeend', editarUserModal(usu))
                editarUserUI(userWithUserRols, usu.id)
                document.body.insertAdjacentHTML('beforeend', deleteUserModal(usu))
                eliminarUserUI(userWithUserRols, usu.id)
                document.body.insertAdjacentHTML('beforeend', editarRolModal(usu))
                editarRolesUI(userWithUserRols, usu.id)

                row.nodes().to$().data('Users', usu)

                
                const user = userWithUserRols.userRol.filter(u => u.userId == usu.id);  
                const meterEditor = document.getElementById(`editor${usu.id}`)
                const meterAdmin = document.getElementById(`admin${usu.id}`)

                console.log(user)
                for (let i = 0; i < user.length; i++) {
                    if (user[i].userId == usu.id && user[i].rolId == 4) {
                        meterEditor.checked = true
                    }

                    if (user[i].userId == usu.id && user[i].rolId == 1) {
                        meterAdmin.checked = true
                    }
                }

            } else {
                const row = tabla.row.add([
                    usu.name,
                    usu.email,
                    usu.score,
                    `<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#myModal${usu.id}"><i class="fas fa-edit"></i> Editar</button>` +
                    `<button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#activeModal${usu.id}" ><i class="fas fa-trash-alt"></i> Añadir</button>`
                ]).draw()

                document.body.insertAdjacentHTML('beforeend', editarUserModal(usu))
                editarUserUI(userWithUserRols, usu.id)
                document.body.insertAdjacentHTML('beforeend', anadirUserModal(usu))
                anadirUserUI(userWithUserRols, usu.id)

                row.nodes().to$().data('Users', usu)
            }
        })
    }

    function editarUserModal(usu) {
        return `
        <div class="modal" id="myModal${usu.id}">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Editar User ${usu.name}</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                        <div class="col-sm-12 col-md-6 col-lg-6">
                            <label for="name" class="form-label">Nombre</label>
                            <input type="text" id="name${usu.id}" name="name${usu.id}" class="form-control" value=${usu.name}>
                            <div class="invalid-feedback" id="mensajename"></div>
                        </div>

                        <div class="col-sm-12 col-md-6 col-lg-6">
                            <label for="email" class="form-label">Gmail</label>
                            <input type="text" id="email${usu.id}" name="email${usu.id}" class="form-control" value=${usu.email}>
                            <div class="invalid-feedback" id="mensajeemail"></div>
                        </div>
    
                        <div class="col-sm-12 col-md-6 col-lg-6">
                            <label for="password" class="form-label">Contraseña</label>
                            <div class="input-group">
                                <input type="password" id="password${usu.id}" name="password${usu.id}" class="form-control" >
                            <div class="invalid-feedback" id="mensajepassword"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="editarBtn${usu.id}">Editar User</button>
                </div>
            </div>                
        </div>
    </div>
    `
    }

    function editarRolModal(usu) {
        return `
                <div class="modal" id="rolModal${usu.id}">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Editar rol de ${usu.name}</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body" id="roles${usu.id}">
                                <label>
                                    <input type="checkbox" id="editor${usu.id}"> Editor
                                </label><br>

                                <label>
                                    <input type="checkbox" id="admin${usu.id}"> Administrador
                                </label><br>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="editarRolBtn${usu.id}">Editar roles</button>
                        </div>
                        </div>
                    </div>                
                </div>
            </div>
            `
    }

    function deleteUserModal(usu) {
        return `
        <div class="modal" id="deleteModal${usu.id}">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
    
                    <div class="modal-header">
                        <h4 class="modal-title">Confirmar Eliminación</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
    
    
                    <div class="modal-body">
                        <p>¿Estás seguro de que deseas eliminar el User ${usu.name}?</p>
                    </div>
    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmarEliminacion${usu.id}">Confirmar Eliminación</button>
                    </div>
                </div>
            </div>
        </div>
    `
    }

    function anadirUserModal(usu) {
        return `
            <div class="modal" id="activeModal${usu.id}">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Confirmar Activación</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                
                        <div class="modal-body">
                            <p>¿Estás seguro de que deseas añadir el User ${usu.name}?</p>
                        </div>
                
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmarActivacion${usu.id}">Confirmar Activación</button>
                        </div>
                    </div>
                </div>
            </div>       
        `
    }

    async function editarUserUI(userWithUserRols, id) {
        const user = userWithUserRols.user.original.user.find(u => u.id == id);
        const modificarBtn = document.getElementById(`editarBtn${id}`)

        if (modificarBtn) {

            modificarBtn.addEventListener('click', async () => {
                try {

                    const modalElement = document.getElementById(`myModal${id}`)
                    const nameUsu = modalElement.querySelector(`#name${id}`).value
                    const emailUsu = modalElement.querySelector(`#email${id}`).value
                    const passwordUsu = modalElement.querySelector(`#password${id}`).value

                    const UserObjeto = {
                        name: nameUsu,
                        email: emailUsu,
                        password: passwordUsu,
                        score: user.score,
                        active: user.active
                    }
                    await putUser(id, UserObjeto)

                    const modal = new bootstrap.Modal(modalElement)
                    modal.hide();
                    location.reload()
                } catch (error) {
                    console.error('Error al confirmar la modificación:', error)
                }
            });
        }
    }

    async function eliminarUserUI(userWithUserRols, id) {
        const user = userWithUserRols.user.original.user.find(u => u.id == id);
        const confirmarEliminacion = document.getElementById(`confirmarEliminacion${id}`)

        if (confirmarEliminacion) {
            confirmarEliminacion.addEventListener('click', async () => {
                try {
                    const UserObjeto = {
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        score: user.score,
                        active: false
                    }
                    console.log(UserObjeto)
                    await putUser(id, UserObjeto)

                    const modalElement = document.getElementById(`deleteModal${id}`);
                    const modal = new bootstrap.Modal(modalElement);
                    modal.hide();
                    location.reload()


                } catch (error) {
                    console.error('Error al confirmar la eliminación:', error);
                }
            });
        }
    }

    async function anadirUserUI(userWithUserRols, id) {
        const user = userWithUserRols.user.original.user.find(u => u.id == id);
        const confirmarEliminacion = document.getElementById(`confirmarActivacion${id}`)

        if (confirmarEliminacion) {
            confirmarEliminacion.addEventListener('click', async () => {
                try {
                    const UserObjeto = {
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        score: user.score,
                        active: true
                    }
                    await putUser(id, UserObjeto)

                    const modalElement = document.getElementById(`activeModal${id}`);
                    const modal = new bootstrap.Modal(modalElement);
                    modal.hide();
                    location.reload()


                } catch (error) {
                    console.error('Error al confirmar la eliminación:', error);
                }
            });
        }
    }

    async function editarRolesUI(userWithUserRols, id) {
        const userRol = userWithUserRols.userRol.filter(u => u.userId == id);
        const modificarRolBtn = document.getElementById(`editarRolBtn${id}`)

        if (modificarRolBtn) {

            modificarRolBtn.addEventListener('click', async () => {
                try {

                    const modalElement = document.getElementById(`rolModal${id}`)
                    const checkedEdit = document.getElementById(`editor${id}`)
                    const checkedAdmin = document.getElementById(`admin${id}`)

                    console.log(userRol.find((rol) => rol.rolId == 1))
                    if (userRol.find((rol) => rol.rolId == 1) && checkedAdmin.checked == false) {
                        //decir de eliminar rol admin
                        await deleteUserRol(id, 1)
                    } else if (userRol.find((rol) => rol.rolId == 1) == undefined && checkedAdmin.checked == true) {
                        //decir de añadir rol admin
                        const rolObjeto = {
                            userId: id,
                            rolId: 1
                        }
                        await postUserRol(rolObjeto)
                    }

                    if (userRol.find((rol) => rol.rolId == 4) && checkedEdit.checked == false) {
                        //decir de eliminar rol admin
                        await deleteUserRol(id, 4)
                    } else if (userRol.find((rol) => rol.rolId == 4) == undefined && checkedEdit.checked == true) {
                        //decir de añadir rol admin
                        const rolObjeto = {
                            userId: id,
                            rolId: 4
                        }
                        await postUserRol(rolObjeto)
                    }

                    const modal = new bootstrap.Modal(modalElement)
                    modal.hide();
                    location.reload()
                } catch (error) {
                    console.error('Error al confirmar la modificación:', error)
                }
            });
        }
    }

    // async function crearUserUI() {
    //     const anadirBtn = document.getElementById(`anadirBtn`)
    //     if (anadirBtn) {

    //         anadirBtn.addEventListener('click', async () => {
    //             try {

    //                 const modalElement = document.getElementById(`anadirModal`)
    //                 const name = modalElement.querySelector(`#name`).value
    //                 const email = modalElement.querySelector(`#email`).value
    //                 const idCasa = modalElement.querySelector(`#casa`).value
    //                 const password = modalElement.querySelector(`#password`).value
    //                 const foto = modalElement.querySelector(`#foto`).value

    //                 console.log(foto)

    //                 const User = {
    //                     name: name,
    //                     email: email,
    //                     password: password,
    //                     idCasa: idCasa,
    //                     nivel: 1,
    //                     exp: 0,
    //                     foto: foto,
    //                     activo: 0
    //                 }

    //                 await postUser(User)

    //                 const idUserNuevo = await getBuscarUserPoremail(email)

    //                 const rolUsu = {
    //                     idRol: 4,
    //                     idUser: idUserNuevo
    //                 }

    //                 await postUserRol(rolUsu)

    //                 const modal = new bootstrap.Modal(modalElement)
    //                 modal.hide();
    //                 location.reload()
    //             } catch (error) {
    //                 console.error('Error al confirmar la modificación:', error)
    //             }
    //         });
    //     }
    // }
    rellenarUsers()
})