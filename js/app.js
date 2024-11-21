// Perfil Usuario

const usuario = {
    nombre: '',
    salario: 0,
    codeudor: false,
    fechaNacimiento: '',
    edad: 0
}

// 

const salarioMinimo = 1300000;
let descuentoImpuesto;
let saldoActual;
let prestamo;


// TO-DO: Solicitar Identificación, fecha de nacimiento, dirección y télefono

document.getElementById('fromUser').addEventListener('submit', function(event) {
    event.preventDefault(); 
    usuario.nombre = document.getElementById('nombreUsuario').value; 
    usuario.salario = document.getElementById('salarioActual').value;
    usuario.codeudor = document.getElementById('coDeudor').value === 'true';
    usuario.fechaNacimiento = document.getElementById('fechaNacimiento').value;
 
    console.log(`El nombre del usuario es: ${usuario.nombre}`); 
    console.log(`El salario del usuario es: ${usuario.salario}`); 
    console.log(`¿Es codeudor de finca raiz?: ${usuario.codeudor}`);
    console.log(`Fecha Nacimiento: ${usuario.fechaNacimiento}`);

    const fechaNacimiento = new Date(usuario.fechaNacimiento);

    function calcularEdad(fechaNacimiento) {
        const fechaActual = new Date();
        const añoActual = fechaActual.getFullYear();
        const añoNacimiento = fechaNacimiento.getFullYear();
        usuario.edad = añoActual - añoNacimiento;

        return usuario.edad;
    }
    
    calcularEdad(fechaNacimiento);

    if (usuario.edad >= 18) {
        document.getElementById('main__auth').classList.add('ocultar')
        document.getElementById('main__prestamos').classList.remove('ocultar')
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
        saldoActual = prestamo - descuentoImpuesto;

        console.log(`El prestamo se realizó con éxito, su saldo actual es de: ${saldoActual.toFixed(2)} ¡Gracias por confiar en nosotros!`);
    } else {
        console.log('Usted no cumple con los requisitos para solicitar este prestamo.');
    }
}

prestamoTresMillones(900000, 24, true);


