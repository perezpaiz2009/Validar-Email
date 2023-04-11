//Se ejecuta hasta que todo el codigo haya sido descargado 
document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: ''
    }

    //Seleccionar elemtos de interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    const labelcc = document.querySelector('#habilitarcc');
    const inputcc = document.querySelector('#cc');



    //Asignar eventos para validar formulario input, input
    inputEmail.addEventListener('blur', validar);

    inputAsunto.addEventListener('blur', validar);

    inputMensaje.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);


    btnReset.addEventListener('click', function (e) {
        e.preventDefault();

        //reiniciando objeto
        resetFormulario();
    });

    labelcc.addEventListener('click', function (e) {
        e.preventDefault();

        if (inputcc.classList.contains('hidden')) {
            inputcc.classList.remove('hidden');
            inputcc.addEventListener('blur', validar);

        } else {

            inputcc.classList.add('hidden');
            limpiarAlerta();
        }

    });

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {

            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            resetFormulario();

            //Creando Alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm',
                'uppercase');
            alertaExito.textContent = 'Mensaje enviado con exito';

            formulario.appendChild(alertaExito);

            setTimeout(() => {

                alertaExito.remove();
            }, 3000);
        }, 3000);




    }


    function validar(e) {

        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio `, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if ((e.target.id === 'email' || e.target.id === 'cc') && !validarEmail(e.target.value)) {
            mostrarAlerta('El Email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //asignando valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //Comprobar el objeto EMail
        comprobarEmail();

    }

    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia);

        //Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        //renderizar error en formulario
        referencia.appendChild(error);


    }

    function limpiarAlerta(referencia) {
        //Comprueba si existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {

        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;

    }


    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;

        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;

    }

    function resetFormulario() {
        //limpiando objeto
        email.asunto = '';
        email.email = '';
        email.cc = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }

});