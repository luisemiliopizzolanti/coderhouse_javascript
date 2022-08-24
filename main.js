let bool_Continuar = true
let str_Opcion
let int_valor1
let int_valor2
do {
    str_Opcion = prompt("Seleccione una operacion: \n 1 - Suma \n 2 - Resta \n 3 - Multiplicacion \n 4 - Divicion \n 5 - Salir")

    switch (str_Opcion) {
        case "1":
            pedirNumero("suma")
            alert("El resultado de la suma " + int_valor1 + " + " + int_valor2 + " = " + (int_valor1 + int_valor2))
            break;
        case "2":
            pedirNumero("resta")
            alert("El resultado de la resta " + int_valor1 + " - " + int_valor2 + " = " + (int_valor1 - int_valor2))
            break
        case "3":
            pedirNumero("multiplicacion")
            alert("El resultado de la multiplicacion " + int_valor1 + " x " + int_valor2 + " = " + (int_valor1 * int_valor2))
            break
        case "4":
            pedirNumero("divicion")
            alert("El resultado de la divicion " + int_valor1 + " / " + int_valor2 + " = " + (int_valor1 / int_valor2))
            break
        case "5":
            alert("Gracias por usar calculadora de coderJavascript Luis Emilio Pizzolanti")
            bool_Continuar = false
            break;
        default:
            alert("La opcion ingresada no es correcta, seleccione una opcion valida.")

    }
}
while (bool_Continuar)

function pedirNumero(str_mensaje) {
    int_valor1 = parseInt(prompt("Ingrese el primer numero de la " + str_mensaje))
    int_valor2 = parseInt(prompt("Ingrese el segundo numero de la " + str_mensaje))
}