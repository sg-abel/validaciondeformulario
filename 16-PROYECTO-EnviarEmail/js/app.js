//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//variables campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //dominio para validar el email


eventListeners();
function eventListeners() {
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // campos del formulario
    email.addEventListener('blur', validarFormulario);//blur sirve para una validacion en tiempo real
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Enviar Formulario
    formulario.addEventListener('submit', enviarEmail);

    // Reiniciar Formulario
    btnReset.addEventListener('click', resetFormulario);
}

// funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('curso-not-allowed', 'opacity-50');
}

//valida el formulario
function validarFormulario(e) {
    if(e.target.value.length > 0 ) {

        //Eliminar errores...
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');//quita la clase red-500
        e.target.classList.add('border', 'border-green-500');//agrega la clase green-500

    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }


    // Validar unicamente el email
    if(e.target.type === 'email') {

        if( re.test( e.target.value ) ) {
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('Email no valido');
        }
    }

   if(email.value !== '' && asunto.value !== '' && mensaje.value !== '' ) {
      btnEnviar.disabled = false;
      btnEnviar.classList.remove('opacity-50');
      btnEnviar.classList.remove('cursor-not-allowed');
   }

    if( re.test( email.value ) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('curso-not-allowed');
        btnEnviar.classList.remove('opacity-50');
    }
}

//error de campos
function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0 ) {
        formulario.appendChild(mensajeError);
    }
}

//envia el email

function enviarEmail(e) {
    e.preventDefault();

    //mostrar el spiner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Después de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout( () => {
        spinner.style.display = 'none';

        //mensaje de envio correcto
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        //insera el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();//eliminar el mensaje de exito

            resetFormulario(e); 
        }, 5000);
    }, 3000 ); //cada segundo es igual a 1000
}

// funcion que recetea el formulario
function resetFormulario(e){
    formulario.reset(); //recetea el formulario despues de enviar
    e.preventDefault();

    iniciarApp();
}


