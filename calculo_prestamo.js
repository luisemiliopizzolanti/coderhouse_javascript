let int_montoASolicitar
let int_intereses = 10
let int_periodoMeses
let str_opcion
let bool_opcionCorrecta

alert("Bienvenido al simulador de Prestamos")
str_opcion = prompt("¿Desea simular un prestamo? \n 1 - Si \n 2 - No")
if (str_opcion === "1") {
    do {
        do {
            int_montoASolicitar = parseInt(prompt("Ingrese monto a solicitar"))
            if (int_montoASolicitar <= 0) {
                alert("No ingreso un monto valido, intente nuevamente")
                bool_opcionCorrecta = false
            } else {
                bool_opcionCorrecta = true
            }
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
        alert("El valor de la cuota es: " + calcularPrestamo(int_montoASolicitar, int_intereses, int_periodoMeses) / int_periodoMeses)
        str_opcion = prompt("¿Desea simular otro prestamo?  \n 1 - Si \n 2 - No")
    } while (str_opcion === "1")
}
alert("Gracias por usar el simulador de prestamos CoderHouse - Luis Emilio Pizzolanti")

function calcularPrestamo(pInt_montoSolicitado, pInt_tasaInteres, pInt_peridodoMeses) {
    //La funcion utilizada para caluclar el capital a devolver es la de interes compuesto
    //Capital final = C0 x (1+Ti) ^t  (CO es capital solicitado, Ti el interes anual y t el tiempo)
    return pInt_montoSolicitado * ((1 + (pInt_tasaInteres / 100)) ** pInt_peridodoMeses)
}