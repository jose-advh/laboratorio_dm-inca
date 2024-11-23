
const salarioMinimo = 1300000;
let descuentoImpuesto = 0;
let saldoActual = 0;
let prestamo = 0;

document.getElementById('fromUser').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const usuario = {
        identificacion: document.getElementById('identificacion').value,
        nombre: document.getElementById('nombre').value,
        salario: document.getElementById('salario').value,
        saldo: 0,
        coDeudor: document.getElementById('coDeudor').value === 'true',
        cuentaCorriente: document.getElementById('cuentaCorriente').value === 'true',
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        edad: 0
    }

    const fechaNacimiento = new Date(usuario.fechaNacimiento);
    const saldo = document.getElementById('saldo');

    const seccion = {
        formulario: document.getElementById('main__auth'),
        prestamos: document.getElementById('main__prestamos')
    }

    const prestamos = {
        botonTresMillones:  document.getElementById('tresMillones'),
        botonSeisMillones: document.getElementById('seisMillones'),
        botonMillonQuinientos: document.getElementById('millonQuinientos')
    }

    const modal = {
        abrir: document.getElementById('confirmarPrestamo'),
        confirmar: document.getElementById('modalConfirmar'),
        cancelar: modalCancelar = document.getElementById('modalCancelar')
    }

    const recibo = {
        abrir: document.getElementById('abrirRecibo'),
        cerrar: document.getElementById('reciboCerrar'),
        id: document.getElementById('reciboId'),
        nombre: document.getElementById('reciboNombre'),
        prestamo: document.getElementById('reciboPrestamo'),
        fecha: document.getElementById('reciboFecha')
    }

    function calcularEdad(fechaNacimiento) {
        const fechaActual = new Date();
        const añoActual = fechaActual.getFullYear();
        const añoNacimiento = fechaNacimiento.getFullYear();
        return añoActual - añoNacimiento;
    }

    usuario.edad = calcularEdad(fechaNacimiento);

    if (usuario.edad >= 18) {
        seccion.formulario.classList.add('ocultar')
        seccion.prestamos.classList.remove('ocultar')
        prestamos.botonTresMillones.innerText = 'No cumple los requisitos'
        prestamos.botonSeisMillones.innerText = 'No cumple los requisitos'

        switch(true) {
            case (usuario.salario >= 900000 && usuario.edad <= 25 && usuario.coDeudor):
                prestamos.botonTresMillones.classList.remove('card__button--block');
                prestamos.botonTresMillones.innerText = 'Solicitar Préstamo';
                prestamos.botonTresMillones.disabled = false;

                prestamos.botonTresMillones.addEventListener('click', () => {
                    modal.abrir.classList.remove('ocultar');
                    seccion.prestamos.classList.add('modal__abierto');

                    modal.confirmar.addEventListener('click', () => {
                        modal.abrir.classList.add('ocultar');
                        recibo.abrir.classList.remove('ocultar');

                        recibo.cerrar.addEventListener('click', () => {
                            recibo.abrir.classList.add('ocultar');
                            seccion.prestamos.classList.remove('modal__abierto');
                        });

                         prestamoTresMillones(usuario.salario, usuario.edad, usuario.coDeudor);
                         recibo.id.innerText = usuario.identificacion;
                         recibo.nombre.innerText = usuario.nombre;
                         recibo.prestamo.innerText = prestamo;
                         recibo.fecha.innerText = new Date();
                    });

                    modal.cancelar.addEventListener('click', () => {
                        modal.abrir.classList.add('ocultar');
                        seccion.prestamos.classList.remove('modal__abierto');
                    });
                });
                break;

            case (usuario.salario >= 1900000 && usuario.edad >= 26 && usuario.edad <= 40 && usuario.coDeudor && usuario.cuentaCorriente):
                prestamos.botonSeisMillones.classList.remove('card__button--block');
                prestamos.botonSeisMillones.innerText = 'Solicitar Préstamo';
                prestamos.botonSeisMillones.disabled = false;

                prestamos.botonSeisMillones.addEventListener('click', () => {
                    modal.abrir.classList.remove('ocultar');
                    seccion.prestamos.classList.add('modal__abierto');

                    modal.confirmar.addEventListener('click', () => {
                        modal.abrir.classList.add('ocultar');
                        recibo.abrir.classList.remove('ocultar');

                        recibo.cerrar.addEventListener('click', () => {
                            recibo.abrir.classList.add('ocultar');
                            seccion.prestamos.classList.remove('modal__abierto');
                        });
                        
                        prestamoSeisMillones(usuario.salario, usuario.edad, usuario.coDeudor, usuario.cuentaCorriente);
                        recibo.id.innerText = usuario.identificacion;
                        recibo.nombre.innerText = usuario.nombre;
                        recibo.prestamo.innerText = prestamo;
                        recibo.fecha.innerText = new Date();
                    });

                    modal.cancelar.addEventListener('click', () => {
                        modal.abrir.classList.add('ocultar');
                        seccion.prestamos.classList.remove('modal__abierto');
                    });
                });
                break;

            default: 

                prestamos.botonMillonQuinientos.classList.remove('card__button--block');
                prestamos.botonMillonQuinientos.innerText = 'Solicitar Préstamo';
                prestamos.botonMillonQuinientos.disabled = false;

                prestamos.botonMillonQuinientos.addEventListener('click', () => {
                    modal.abrir.classList.remove('ocultar');
                    seccion.prestamos.classList.add('modal__abierto');

                    modal.confirmar.addEventListener('click', () => {
                        modal.abrir.classList.add('ocultar');
                        recibo.abrir.classList.remove('ocultar');

                        recibo.cerrar.addEventListener('click', () => {
                            recibo.abrir.classList.add('ocultar');
                            seccion.prestamos.classList.remove('modal__abierto');
                        });
                        
                        prestamoMillonQuinientos();
                        recibo.id.innerText = usuario.identificacion;
                        recibo.nombre.innerText = usuario.nombre;
                        recibo.prestamo.innerText = prestamo;
                        recibo.fecha.innerText = new Date();
                    });

                    modal.cancelar.addEventListener('click', () => {
                        modal.abrir.classList.add('ocultar');
                        seccion.prestamos.classList.remove('modal__abierto');
                    });
                });

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
        prestamo = 3000000; 
        descuentoImpuesto = calcularDescuento(prestamo, 0.01, 0.05);
        saldoActual += (prestamo - descuentoImpuesto);
        saldo.innerText = saldoActual;
}

function prestamoSeisMillones(sueldoTrabajador, edad, codeudorFincaRaiz, cuentaCorriente) {
        prestamo = 6000000;
        descuentoImpuesto = calcularDescuento(prestamo, 0.02, 0.05);
        saldoActual += (prestamo - descuentoImpuesto);
        saldo.innerText = saldoActual;
}

function prestamoMillonQuinientos() {
    prestamo = 1500000;
    descuentoImpuesto = calcularDescuento(prestamo, 0.005, 0);
    saldoActual += (prestamo - descuentoImpuesto);
    saldo.innerText = saldoActual;
}

    // console.log(`La identificación del usuario es: ${usuario.identificacion}`);
    // console.log(`El nombre del usuario es: ${usuario.nombre}`); 
    // console.log(`El salario del usuario es: ${usuario.salario}`); 
    // console.log(`¿Es codeudor de finca raiz?: ${usuario.coDeudor}`);
    // console.log(`Fecha Nacimiento: ${usuario.fechaNacimiento}`);


