let int_montoASolicitar
let int_intereses = 10
let int_valorCuota
let int_maxPeriodoMeses
let str_opcion, str_entidad
let bool_opcionCorrecta
let arr_prestamosSimulados = []
let str_todosLosPrestamos = "Prestamos simulados: \n"
let formPrestamo = document.getElementById("prestamo")
let btn_borrarHistorial = document.getElementById("borrarHistorial")
let combo_bancos = document.getElementById("entidades")
const arr_datosPrestamo = { cuotas: 0, monto: 0, valorCuota: 0, entidad: "", interes: 0 }
let arr_bancos

function espera(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

combo_bancos.onclick = (event) => {
    cargarDatosBancos(parseInt(event.target.value))
}

async function buscarBancos() {
    let carga = document.getElementById("carga")
    carga.innerHTML = "Cargando financieras..."
    const bancos = await fetch('entidades_financieras.json')
    arr_bancos = await bancos.json()
        //Para ponerle emocion jajaja
    await espera(3000)

    arr_bancos.forEach(banco => {
        let opcion = document.createElement('option');
        opcion.value = banco.id;
        opcion.innerHTML = banco.nombre;
        combo_bancos.appendChild(opcion);
    })
    carga.innerHTML = ""
    cargarDatosBancos(0)

}

function cargarDatosBancos(int_pocicion) {
    int_intereses = arr_bancos[int_pocicion].tasa
    int_maxPeriodoMeses = arr_bancos[int_pocicion].max_cuotas
    str_entidad = arr_bancos[int_pocicion].nombre
    let labetCuotas = document.getElementById("lblCuotas")
    labetCuotas.innerHTML = `Cantidad de cuotas: 1 - ${int_maxPeriodoMeses}. TEA:${int_intereses}%`
}

window.onload = (event) => {
    mostrarPrestamos()
    buscarBancos()
}



btn_borrarHistorial.onclick = (event) => {

    Swal.fire({
        title: 'Desea borrar el historial?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((respuesta) => {
        if (respuesta.isConfirmed) {
            localStorage.setItem("prestamosSolicitados", "")
            arr_prestamosSimulados = [];
            mostrarPrestamos();
            Swal.fire('Borrado', '', 'success')
        } else if (respuesta.isDenied) {
            Swal.fire('No se han borrado', '', 'info')
        }
    })
}

formPrestamo.onsubmit = (event) => {
    event.preventDefault()
    for (const input of event.target.children) {
        //console.log(input)
        if (input.id === "cuotas") {
            arr_datosPrestamo.cuotas = parseInt(input.value)
        }
        if (input.id === "monto") {
            arr_datosPrestamo.monto = parseInt(input.value)
        }
    }

    if (arr_datosPrestamo.monto <= 0) {
        Swal.fire('No ingreso un monto valido, intente nuevamente')
        bool_opcionCorrecta = false
    } else {
        bool_opcionCorrecta = true
    }
    if (arr_datosPrestamo.cuotas < 1 || arr_datosPrestamo.cuotas > int_maxPeriodoMeses) {
        Swal.fire('No ingreso un periodo valido, intente nuevamente')
        bool_opcionCorrecta = false
    } else {
        bool_opcionCorrecta = true
    }

    if (bool_opcionCorrecta) {
        int_valorCuota = calcularPrestamo(arr_datosPrestamo.monto, int_intereses, arr_datosPrestamo.cuotas) / arr_datosPrestamo.cuotas
        arr_datosPrestamo.valorCuota = int_valorCuota
        arr_datosPrestamo.entidad = str_entidad
        arr_datosPrestamo.interes = int_intereses
        arr_prestamosSimulados.push(arr_datosPrestamo)
        localStorage.setItem("prestamosSolicitados", JSON.stringify(arr_prestamosSimulados))
    }

    mostrarPrestamos()

}

function mostrarPrestamos() {
    let divPrestamos = document.getElementById('todosLosPrestamos')
    divPrestamos.innerHTML = ""
    let c, r, t
    let arr_prestamos
    t = document.createElement('table');
    t.setAttribute("border", "2");
    r = t.insertRow(-1);
    c = r.insertCell();
    c.innerHTML = "Monto Solicitado";
    c = r.insertCell();
    c.innerHTML = "Cantidad de Cuotas";
    c = r.insertCell();
    c.innerHTML = "Valor Cuota";
    c = r.insertCell();
    c.innerHTML = "Entidad Financiera";
    c = r.insertCell();
    c.innerHTML = "TEA";
    json_prestamos = localStorage.getItem('prestamosSolicitados')
    if (json_prestamos === "") {
        divPrestamos.innerHTML = "<p>No hay historial de prestamos</p>"
    } else {
        arr_prestamosSimulados = JSON.parse(json_prestamos)
        console.log(arr_prestamosSimulados)
        arr_prestamosSimulados.forEach(prestamo => {
            r = t.insertRow(-1);
            c = r.insertCell();
            c.innerHTML = prestamo.monto;
            c = r.insertCell();
            c.innerHTML = prestamo.cuotas;
            c = r.insertCell();
            c.innerHTML = `$${prestamo.valorCuota.toFixed(2)}`;
            c = r.insertCell();
            c.innerHTML = prestamo.entidad;
            c = r.insertCell();
            c.innerHTML = `${prestamo.interes}%`;

        });
        divPrestamos.append(t)
    }
}


function calcularPrestamo(pInt_montoSolicitado, pInt_tasaInteres, pInt_peridodoMeses) {
    //La funcion utilizada para caluclar el capital a devolver es la de interes compuesto
    //Capital final = C0 x (1+Ti) ^t  (CO es capital solicitado, Ti el interes anual y t el tiempo)
    return pInt_montoSolicitado * ((1 + (pInt_tasaInteres / 100)) ** pInt_peridodoMeses)
}
