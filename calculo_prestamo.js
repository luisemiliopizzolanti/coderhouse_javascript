let int_montoASolicitar
let int_intereses = 10
let int_valorCuota
let int_periodoMeses
let str_opcion
let bool_opcionCorrecta
let arr_prestamosSimulados = []
let str_todosLosPrestamos = "Prestamos simulados: \n"

//alert("Bienvenido al simulador de Prestamos")

let formPrestamo = document.getElementById("prestamo")


formPrestamo.onsubmit = (event) => {
    event.preventDefault()
    const arr_datosPrestamo = []
    for (const input of event.target.children) {
        //console.log(input)
        if (input.id === "cuotas") {
            arr_datosPrestamo['cuotas'] = parseInt(input.value)
        }
        if (input.id === "monto") {
            arr_datosPrestamo['monto'] = parseInt(input.value)
        }
    }

    if (arr_datosPrestamo['monto'] <= 0) {
        alert("No ingreso un monto valido, intente nuevamente")
        bool_opcionCorrecta = false
    } else {
        bool_opcionCorrecta = true
    }
    if (arr_datosPrestamo['cuotas'] < 1 || arr_datosPrestamo['cuotas'] > 12) {
        alert("No ingreso un periodo valido, intente nuevamente")
        bool_opcionCorrecta = false
    } else {
        bool_opcionCorrecta = true
    }

    int_valorCuota = calcularPrestamo(arr_datosPrestamo['monto'], int_intereses, arr_datosPrestamo['cuotas']) / arr_datosPrestamo['cuotas']
    arr_datosPrestamo['valorCuota'] = int_valorCuota
    arr_prestamosSimulados.push(arr_datosPrestamo)
        // console.log(arr_prestamosSimulados)
    localStorage.setItem("prestamosSolicitados", JSON.stringify(arr_prestamosSimulados))
        //Muestra arrays vacios
    console.log(JSON.stringify(arr_prestamosSimulados))
        //mostrarPrestamos()
        //alert(int_valorCuota)
        // const historico = document.createElement('p')
        //historico.innerText = int_valorCuota


    //divPrestamos.append(historico)
}

function mostrarPrestamos() {
    let divPrestamos = document.getElementById('todosLosPrestamos')
    divPrestamos.innerHTML = ""
    let c, r, t
    let arr_prestamos
    t = document.createElement('table');
    json_prestamos = localStorage.getItem('prestamosSolicitados')

    arr_prestamos = JSON.parse(json_prestamos)

    arr_prestamos.forEach(prestamo => {
        r = t.insertRow(-1);
        c = r.insertCell();
        console.log(prestamo)
        c.innerHTML = prestamo["monto"];
        c = r.insertCell();
        c.innerHTML = prestamo["cuotas"];
        c = r.insertCell();
        c.innerHTML = prestamo["valorCuota"];



    });



    /* c.innerHTML = 123;
     c = r.insertCell(1);
     c.innerHTML = 456;*/
    divPrestamos.append(t)
        //divPrestamos.removeChild(divPrestamos.firstChild)
}

/*
        int_montoASolicitar = parseInt(prompt("Ingrese monto a solicitar"))
        
}


if (str_opcion === "1") {
    do {
        do {

        }
        while (!bool_opcionCorrecta)
        do {
            int_periodoMeses = parseInt(prompt("Ingrese la cantidad de cuotas (Min 1 - Max 12)"))
            if (int_periodoMeses < 1 || int_periodoMeses > 12) {
                alert("No ingreso un periodo valido, intente nuevamente")
                bool_opcionCorrecta = false
            } else {
                bool_opcionCorrecta = true
            }
        } while (!bool_opcionCorrecta)
        int_valorCuota = calcularPrestamo(int_montoASolicitar, int_intereses, int_periodoMeses) / int_periodoMeses
        alert("El valor de la cuota es: " + int_valorCuota)
        str_opcion = prompt("¿Desea simular otro prestamo?  \n 1 - Si \n 2 - No")
        arr_prestamosSimulados.push({ capital: int_montoASolicitar, cuota: int_valorCuota })
    } while (str_opcion === "1")
    arr_prestamosSimulados.forEach(function(element) {
        str_todosLosPrestamos = str_todosLosPrestamos + `Capital solicitado: ${element.capital} - Valor cuota: ${element.cuota} \n`
    });
    const historico = document.createElement('p')
    historico.innerText = str_todosLosPrestamos
    const divPrestamos = document.getElementById('todosLosPrestamos')
    divPrestamos.append(historico)

};
*/

function calcularPrestamo(pInt_montoSolicitado, pInt_tasaInteres, pInt_peridodoMeses) {
    //La funcion utilizada para caluclar el capital a devolver es la de interes compuesto
    //Capital final = C0 x (1+Ti) ^t  (CO es capital solicitado, Ti el interes anual y t el tiempo)
    return pInt_montoSolicitado * ((1 + (pInt_tasaInteres / 100)) ** pInt_peridodoMeses)
}