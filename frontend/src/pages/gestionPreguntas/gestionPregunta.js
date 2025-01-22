import { getPreguntas, putPregunta } from "../../components/preguntaAPI"

document.addEventListener('DOMContentLoaded', function () {
    async function rellenarPreguntas() {
        const preguntas = await getPreguntas()
        console.log(preguntas.Prueba)

        const tabla = $('#questions').DataTable()
        tabla.clear().draw()
        preguntas.Prueba.forEach(pru => {
            if (pru.active == 1) {
                const row = tabla.row.add([
                    pru.question,
                    pru.answer,
                    pru.clue,
                    pru.answerSelect,
                    `<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#myModal${pru.id}"><i class="fas fa-edit"></i> Editar</button>` +
                    `<button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal${pru.id}" ><i class="fas fa-trash-alt"></i> Eliminar</button>`
                ]).draw()

                document.body.insertAdjacentHTML('beforeend', editarPreguntaModal(pru))
                editarPreguntaUI(preguntas.Prueba, pru.id)
                document.body.insertAdjacentHTML('beforeend', deletePreguntaModal(pru))
                eliminarPreguntaUI(preguntas.Prueba, pru.id)

                row.nodes().to$().data('questions', pru)

            } else {
                const row = tabla.row.add([
                    pru.question,
                    pru.answer,
                    pru.clue,
                    pru.answerSelect,
                    `<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#myModal${pru.id}"><i class="fas fa-edit"></i> Editar</button>` +
                    `<button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#activeModal${pru.id}" ><i class="fas fa-trash-alt"></i> Añadir</button>`
                ]).draw()

                document.body.insertAdjacentHTML('beforeend', editarPreguntaModal(pru))
                editarPreguntaUI(preguntas.Prueba, pru.id)
                document.body.insertAdjacentHTML('beforeend', anadirPreguntaModal(pru))
                anadirPreguntaUI(preguntas.Prueba, pru.id)

                row.nodes().to$().data('questions', pru)
            }
        })
    }

    function editarPreguntaModal(pru) {
        return `
            <div class="modal" id="myModal${pru.id}">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Editar Pregunta</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="question" class="form-label">Pregunta</label>
                                    <textarea id="question${pru.id}" name="question${pru.id}" class="form-control" rows="4">${pru.question}</textarea>
                                    <div class="invalid-feedback" id="mensajequestion"></div>
                                </div>
    
                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="answer" class="form-label">Respuesta</label>
                                    <textarea id="answer${pru.id}" name="answer${pru.id}" class="form-control" rows="4">${pru.answer}</textarea>
                                    <div class="invalid-feedback" id="mensajeanswer"></div>
                                </div>
    
                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="clue" class="form-label">Pista</label>
                                    <textarea id="clue${pru.id}" name="clue${pru.id}" class="form-control" rows="4">${pru.clue}</textarea>
                                    <div class="invalid-feedback" id="mensajeclue"></div>
                                </div>
    
                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <label for="answerSelect" class="form-label">Respuesta Select</label>
                                    <textarea id="answerSelect${pru.id}" name="answerSelect${pru.id}" class="form-control" rows="4">${pru.answerSelect}</textarea>
                                    <div class="invalid-feedback" id="mensajeanswerSelect"></div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="editarBtn${pru.id}">Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function deletePreguntaModal(pru) {
        return `
            <div class="modal" id="deleteModal${pru.id}">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
        
                        <div class="modal-header">
                            <h4 class="modal-title">Confirmar Eliminación</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
        
        
                        <div class="modal-body">
                            <p>¿Estás seguro de que deseas eliminar el Pregunta?</p>
                        </div>
        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmarEliminacion${pru.id}">Confirmar Eliminación</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    function anadirPreguntaModal(pru) {
        return `
                <div class="modal" id="activeModal${pru.id}">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Confirmar Activación</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                    
                            <div class="modal-body">
                                <p>¿Estás seguro de que deseas añadir el Pregunta?</p>
                            </div>
                    
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal" id="confirmarActivacion${pru.id}">Confirmar Activación</button>
                            </div>
                        </div>
                    </div>
                </div>       
            `
    }


    async function editarPreguntaUI(preguntas, id) {
        const Pregunta = preguntas.find(pr => pr.id == id);
        const modificarBtn = document.getElementById(`editarBtn${id}`)

        if (modificarBtn) {

            modificarBtn.addEventListener('click', async () => {
                try {

                    const modalElement = document.getElementById(`myModal${id}`)
                    const question = modalElement.querySelector(`#question${id}`).value
                    const answer = modalElement.querySelector(`#answer${id}`).value
                    const clue = modalElement.querySelector(`#clue${id}`).value
                    let answerSelect = modalElement.querySelector(`#answerSelect${id}`).value

                    if (answerSelect == '') {
                        answerSelect = null
                    }

                    const PreguntaObjeto = {
                        question: question,
                        answer: answer,
                        clue: clue,
                        answerSelect: answerSelect,
                        active: Pregunta.active
                    }
                    await putPregunta(id, PreguntaObjeto)

                    const modal = new bootstrap.Modal(modalElement)
                    modal.hide();
                    location.reload()
                } catch (error) {
                    console.error('Error al confirmar la modificación:', error)
                }
            });
        }
    }

    async function eliminarPreguntaUI(preguntas, id) {
        const Pregunta = preguntas.find(pr => pr.id == id);
        console.log(Pregunta)
        const confirmarEliminacion = document.getElementById(`confirmarEliminacion${id}`)

        if (confirmarEliminacion) {
            confirmarEliminacion.addEventListener('click', async () => {
                console.log(Pregunta.question)
                try {
                    const PreguntaObjeto = {
                        question: Pregunta.question,
                        answer: Pregunta.answer,
                        clue: Pregunta.clue,
                        answerSelect: Pregunta.answerSelect,
                        active: 0
                    }
                    console.log(PreguntaObjeto)
                    await putPregunta(id, PreguntaObjeto)

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

    async function anadirPreguntaUI(preguntas, id) {
        const Pregunta = preguntas.find(pr => pr.id == id);
        const confirmarEliminacion = document.getElementById(`confirmarActivacion${id}`)

        if (confirmarEliminacion) {
            confirmarEliminacion.addEventListener('click', async () => {
                try {
                    const PreguntaObjeto = {
                        question: Pregunta.question,
                        answer: Pregunta.answer,
                        clue: Pregunta.clue,
                        answerSelect: Pregunta.answerSelect,
                        active: 1
                    }
                    await putPregunta(id, PreguntaObjeto)

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

    rellenarPreguntas()
})