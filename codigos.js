// Función para filtrar productos por nombre
function filtrarProductos() {
    const buscadorInput = document.getElementById('buscador-input');
    const productos = document.querySelectorAll('.producto');
    const textoBusqueda = buscadorInput.value.toLowerCase();
  
    productos.forEach(producto => {
      const nombreProducto = producto.querySelector('h3').textContent.toLowerCase();
      producto.style.display = nombreProducto.includes(textoBusqueda) ? 'block' : 'none';
    });
  }
  
  // Inicializar el buscador cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    const buscadorInput = document.getElementById('buscador-input');
    
    // Escuchar eventos de teclado en el input
    buscadorInput.addEventListener('keyup', filtrarProductos);
    
    // Opcional: Si quieres que el botón de lupa también active la búsqueda
    const botonBusqueda = document.querySelector('.buscador button');
    if (botonBusqueda) {
      botonBusqueda.addEventListener('click', filtrarProductos);
    }
  });

  function volverInicio() {
    window.location.href = 'index.html';
  }
  
  function irPago(boton) {
    const producto = boton.closest('.producto');
    const precioTexto = producto.querySelector('.precio').innerText.replace('$', '').replace('.', '');
    const precio = parseFloat(precioTexto);

    localStorage.setItem('precioPago', precio);
  
    window.location.href = 'metodos_pago.html';
  }

  function tipoPago(elemento) {
    document.querySelectorAll('.metodo').forEach(div => {
      div.classList.remove('seleccionado');
    });
  
    elemento.classList.add('seleccionado');
    const metodoSeleccionado = elemento.querySelector('h3').innerText;
    console.log('Método de pago seleccionado:', metodoSeleccionado);

    const metodoSeleccion = document.getElementById('metodoSeleccionado');
    metodoSeleccion.innerText = `Método de pago: ${metodoSeleccionado}`;

    const totalPagar = document.getElementById('totalPagar');
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Obtener los valores de localStorage
    const precio = localStorage.getItem('precioPago');

    // Asignar los valores a los elementos con ID
    document.getElementById('totalPagar').textContent = `Total a pagar: $${precio}`;
});


function procesarPago() {
  // Obtener el método de pago seleccionado
  const metodoSeleccionado = document.getElementById('metodoSeleccionado').innerText.replace('Método de pago: ', '');

  // Obtener el total a pagar
  const totalPagar = document.getElementById('totalPagar').innerText.replace('Total a pagar: $', '').replace('.', '');
  const total = parseFloat(totalPagar);

  // Verificar que se haya seleccionado un método de pago y que haya un total
  if (metodoSeleccionado === 'Método de pago: ' || isNaN(total)) {
      alert('Por favor, seleccione un método de pago y asegúrese de que el total sea válido.');
      return;
  }

  // Simular proceso de pago
  alert(`Pago realizado con éxito.\nMétodo de pago: ${metodoSeleccionado}\nTotal a pagar: $${total}`);

  // Aquí podrías redirigir a una página de confirmación si lo prefieres:
  // window.location.href = 'pago_confirmado.html';

  // Limpiar los datos del pago después de simular el pago (opcional)
  localStorage.removeItem('precioPago');
  localStorage.removeItem('metodoPago');
}

function toggleMenu() {
  const menu = document.querySelector('nav ul');
  menu.classList.toggle('active');
  console.log('Botón clickeado');
}