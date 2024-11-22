const usuario = {
    identificacion: 0,
    nombre: '',
    salario: 0,
    saldo: 0,
    coDeudor: false,
    cuentaCorriente: false,
    fechaNacimiento: '',
    edad: 0
}

const salarioMinimo = 1300000;
let descuentoImpuesto = 0;
let saldoActual = 0;
let prestamo = 0;



// TO-DO: Solicitar Identificación, fecha de nacimiento, dirección y télefono

document.getElementById('fromUser').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    usuario.identificacion = document.getElementById('identificacion').value;
    usuario.nombre = document.getElementById('nombre').value; 
    usuario.salario = document.getElementById('salario').value;
    usuario.coDeudor = document.getElementById('coDeudor').value === 'true';
    usuario.cuentaCorriente = document.getElementById('cuentaCorriente').value === 'true';
    usuario.fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const fechaNacimiento = new Date(usuario.fechaNacimiento);
    const botonTresMillones =  document.getElementById('tresMillones');
    const botonSeisMillones = document.getElementById('seisMillones')
    const seccionFormulario = document.getElementById('main__auth');
    const seccionPrestamos = document.getElementById('main__prestamos');
    const saldo = document.getElementById('saldo');

    console.log(`La identificación del usuario es: ${usuario.identificacion}`);
    console.log(`El nombre del usuario es: ${usuario.nombre}`); 
    console.log(`El salario del usuario es: ${usuario.salario}`); 
    console.log(`¿Es codeudor de finca raiz?: ${usuario.coDeudor}`);
    console.log(`Fecha Nacimiento: ${usuario.fechaNacimiento}`);

    function calcularEdad(fechaNacimiento) {
        const fechaActual = new Date();
        const añoActual = fechaActual.getFullYear();
        const añoNacimiento = fechaNacimiento.getFullYear();
        return añoActual - añoNacimiento;
    }
    usuario.edad = calcularEdad(fechaNacimiento);

    if (usuario.edad >= 18) {
        seccionFormulario.classList.add('ocultar')
        seccionPrestamos.classList.remove('ocultar')
        botonTresMillones.innerText = 'No cumple los requisitos'
        botonSeisMillones.innerText = 'No cumple los requisitos'

        switch(true) {
            case (usuario.salario >= 900000 && usuario.edad >= 18 && usuario.edad <= 25 && usuario.coDeudor):
                botonTresMillones.classList.remove('card__button--block');
                botonTresMillones.innerText = 'Solicitar Préstamo';
                botonTresMillones.disabled = false;

                botonTresMillones.addEventListener('click', function(event) {
                    prestamoTresMillones(usuario.salario, usuario.edad, usuario.coDeudor);
                });

                break;

            case (usuario.salario >= 1900000 && usuario.edad >= 26 && usuario.edad <= 40 && usuario.coDeudor && usuario.cuentaCorriente):
                botonSeisMillones.classList.remove('card__button--block');
                botonSeisMillones.innerText = 'Solicitar Préstamo';
                break;

            default: 

        }

    } else {
        alert('Para realizar prestamos debe ser mayor de edad.')
    }
});



// Prestamos 

function calcularDescuento(prestamo, porcentajePrestamo, porcentajeSalario) {
    return (prestamo * porcentajePrestamo) + (salarioMinimo * porcentajeSalario);
}

function prestamoTresMillones(sueldoTrabajador, edad, codeudorFincaRaiz) {
    if (sueldoTrabajador >= 900000 && edad >= 18 && edad <= 25 && codeudorFincaRaiz) {
        prestamo = 3000000; 
        descuentoImpuesto = calcularDescuento(prestamo, 0.01, 0.05);
        saldoActual += (prestamo - descuentoImpuesto);
        saldo.innerText = saldoActual;
        console.log(`El prestamo se realizó con éxito, su saldo actual es de: ${saldoActual.toFixed(2)} ¡Gracias por confiar en nosotros!`);
    } else {
        console.log('Usted no cumple con los requisitos para solicitar este prestamo.');
    }
}



function prestamoSeisMillones(sueldoTrabajador, edad, codeudorFincaRaiz, cuentaCorriente) {
    if (sueldoTrabajador >= 1900000 && edad >= 26 && edad <= 40 && codeudorFincaRaiz && cuentaCorriente) {
        prestamo = 6000000;
        descuentoImpuesto = calcularDescuento(prestamo, 0.02, 0.05);
        saldoActual = (prestamo - descuentoImpuesto);

        console.log(`El prestamo se realizó con éxito, su saldo actual es de: ${saldoActual.toFixed(2)} ¡Gracias por confiar en nosotros!`);
    } else {
        console.log('Usted no cumple con los requisitos para solicitar este prestamo.');
    }
}


