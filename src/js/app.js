let paso = 1;
const pasoInicial = 1
const pasoFinal = 3

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion(); //muestra la 1ra seccion
    tabs(); //cambia la seccion cuando se presionan los tabs
    botonesPaginador(); //muestra y oculta los botones
    paginaAnterior();
    paginaSiguiente();

    consultarAPI(); //API

    idCliente()
    nombreCliente();
    seleccionarFecha();
    seleccionarHora();

    mostrarResumen();
}

function mostrarSeccion(){
    //ocultar la seccion que tenga la clase mostrar
    const seccionAnterior = document.querySelector('.mostrar')
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar')
    }

    //seleccionar la seccion con el paso
    const pasoSelector = `#paso-${paso}`
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    //quitar la clase actual del tab an terior
    const tabAnterior = document.querySelector('.actual')
    if(tabAnterior) {
        tabAnterior.classList.remove('actual')
    }
    
    //resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"`)
    tab.classList.add('actual')
}

function botonesPaginador() {
    const paginadorAnterior = document.querySelector('#anterior')
    const paginadorSiguiente = document.querySelector('#siguiente')

    if(paso === 1){
        paginadorAnterior.classList.add('ocultar')
        paginadorSiguiente.classList.remove('ocultar')
    } else if (paso === 3) {
        paginadorAnterior.classList.remove('ocultar')
        paginadorSiguiente.classList.add('ocultar')
        mostrarResumen();
    } else {
        paginadorAnterior.classList.remove('ocultar')
        paginadorSiguiente.classList.remove('ocultar')
    }

    mostrarSeccion()
}

function tabs() {
    const botones = document.querySelectorAll('.tabs button')
    botones.forEach( boton => {
        boton.addEventListener('click', function(e){
            paso = parseInt(e.target.dataset.paso)
            mostrarSeccion();
            botonesPaginador();
        })
    } )
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior')
    paginaAnterior.addEventListener('click', function(){
        if(paso <= pasoInicial) return
        paso--;
        // console.log(paso)
        botonesPaginador()
    })
}

function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente')
    paginaSiguiente.addEventListener('click', function() {
        if(paso >= pasoFinal) return
        paso ++;

        botonesPaginador()
    })
}

async function consultarAPI() {

    try {
        const url = '/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios); //muestra los servicos desde la funcion
    } catch (error) {
        console.log(error)
    }
}

function mostrarServicios(servicios) {

    servicios.forEach( servicio => {
        const {id,nombre,precio} = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function() {
            seleccionarServicio(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);

    })
} 

function seleccionarServicio(servicio) {
    const {id} = servicio;
    const {servicios} = cita;

    //identifica al elemento al que se leda click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    // comprueba si un servicio ya fue agregado
    if (servicios.some( item => item.id === id)){
        //elimina
        cita.servicios = servicios.filter(item => item.id !== id);
        divServicio.classList.remove('seleccionado');
    } else {
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }
    // console.log(cita)
}

function idCliente() {
    cita.id = document.querySelector('#id').value
}

function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value
}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha')
    inputFecha.addEventListener('input', function(e) {
        
        const dia = new Date(e.target.value).getUTCDay();
        //controla que dias son las citas
        if ([6,0].includes(dia)){
            e.target.value = '';
            mostrarAlerta('Disculpe, Sabados y Domingo NO abrimos','error', '.formulario');
        } else {
            cita.fecha = e.target.value;
        }
    })
}

function seleccionarHora() {
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e){
        const horaCita = e.target.value;
        const hora = horaCita.split(':')[0];
        if(hora < 10 || hora > 18){
            e.target.value = '';
            mostrarAlerta("Cita seleccionada fuera de el horario", 'error','.formulario')
        } else {
            cita.hora = e.target.value
        }
    })
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {

    //previene que se genera mas de una alerta
    const alertaPervia = document.querySelector('.alerta');
    if (alertaPervia){
        alertaPervia.remove();
    };

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if (desaparece) {
            //elimina la alerta
        setTimeout(()=>{
            alerta.remove();
        }, 3000)
    }
}

function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen');

    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild)
    }

    if(Object.values(cita).includes('') || cita.servicios.length === 0){
        mostrarAlerta('Faltan datos de Servicios, Fecha u Hora','error','.contenido-resumen', false)
    
        return;
    }

    const { nombre, hora, fecha, servicios} = cita;

    const nombreCliente = document.createElement('P')
    nombreCliente.innerHTML = `<span>Nombre: </span> ${nombre}`;

    //Formatear la fecha
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    fechaUTC = new Date(Date.UTC(year,mes,dia));

    const opciones = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX', opciones);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha: </span> ${fechaFormateada}`;

    const horaCita = document.createElement('P')
    horaCita.innerHTML = `<span>Hora: </span> ${hora}`;

    const contenedorBoton = document.createElement('DIV');
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = ">>  Reservar Cita!  <<";
    contenedorBoton.classList.add('campo');
    contenedorBoton.appendChild(botonReservar);
    botonReservar.onclick = reservarCita;
    contenedorBoton.classList.add('campo');

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);

    servicios.forEach(servicio => {
        const {id, precio, nombre} = servicio;

        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio: </span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
        resumen.appendChild(contenedorBoton);
    })
}

async function reservarCita() {

    const {nombre,fecha,hora, servicios, id} = cita;

    const idServicio = servicios.map(servicio=>servicio.id);
    // console.log(idServicio);

    const datos = new FormData();

    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicio);

    // console.log([...datos]);
    // return;

    try {
        //peticion hacia la api
        const url = '/api/citas';
        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });
        const resultado = await respuesta.json();
        console.log(resultado.resultado);  
        
        if(resultado.resultado) {
            Swal.fire({
                title: "Listo!",
                text: "Tu cita fue creada correctamente!",
                icon: "success"
            }).then(()=>{
                setTimeout(()=>{
                    window.location.reload();
                }, 3000)
            })
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Hubo un error al guardar la cita...",
          });
    }
}