const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const area = document.querySelector('.formulario__area');

// expresiones regulares para validar
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    asunto: /^[a-zA-ZÀ-ÿ\s]{5,50}$/,
    mensaje: /^[a-zA-ZÀ-ÿ\s-.-,-;-:]{5,150}$/,
}

// objeto para validar si los inputs están vacíos
const campos = {
    nombre: false,
    correo: false,
    asunto: false,
    mensaje: false,
}

// agregar validación a cada input
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, e.target.name);
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, e.target.name);
            break;
        case "asunto":
            validarCampo(expresiones.asunto, e.target, e.target.name);
            break;
        case "mensaje":
            validarCampo(expresiones.mensaje, e.target, e.target.name);
            break;
    }
}

// validar inputs
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos[campo] = false;
    }
}

// asignar eventos para los inputs
inputs.forEach(input => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
    // text area
    area.addEventListener("keyup", validarFormulario);
    area.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    // si los campos del objeto está como true
    if (campos.nombre && campos.asunto && campos.correo && campos.mensaje) {
        // resetear formulario
        formulario.reset();
        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
        setTimeout(() => {
            document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
        }, 3000);

        document.querySelectorAll(".formulario__grupo-correcto").forEach((icono) => {
            icono.classList.remove("formulario__grupo-correcto");
        });
    } else {
        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
        setTimeout(() => {
            document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
        }, 5000);
    }
});