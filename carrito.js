document.addEventListener('DOMContentLoaded', () => {
  // Detectar si estamos en la tienda (productos)
  if (document.querySelector('.btnAdd')) {
    const botones = document.querySelectorAll('.btnAdd');

    botones.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const producto = e.target.closest('.producto');
        const nombre = producto.querySelector('.nombre').innerText;
        const precioTexto = producto.querySelector('.precio').innerText
          .replace('$', '')
          .replace(/\./g, '');
        const precio = parseFloat(precioTexto);
        const imagen = producto.querySelector('img').getAttribute('src');

        const nuevoProducto = { nombre, precio, imagen };

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(nuevoProducto);
        localStorage.setItem('carrito', JSON.stringify(carrito));

        window.location.href = 'carrito.html';
      });
    });
  }

  // Detectar si estamos en el carrito
  if (document.querySelector('.carrito')) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.querySelector('.carrito');
    let total = 0;

    // Mostrar productos y añadir botón Eliminar
    carrito.forEach((producto, index) => {
      const item = document.createElement('div');
      item.classList.add('item');

      item.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="detalle">
          <h3>${producto.nombre}</h3>
          <p>$${producto.precio}</p>
        </div>
        <button class="eliminar" data-index="${index}">Eliminar</button>
      `;

      contenedor.insertBefore(item, contenedor.querySelector('.total'));
      total += producto.precio;
    });

    // Actualizar total
    const totalElemento = document.getElementById('totalPagarC');
    totalElemento.textContent = `Total: $${total}`;

    // Funcionalidad de eliminar sin recargar
    contenedor.addEventListener('click', e => {
      if (!e.target.classList.contains('eliminar')) return;

      const index = parseInt(e.target.getAttribute('data-index'), 10);
      // Eliminar del array y de localStorage
      carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));

      // Eliminar del DOM
      const itemDOM = e.target.closest('.item');
      itemDOM.remove();

      // Recalcular y actualizar total
      total = carrito.reduce((sum, p) => sum + p.precio, 0);
      totalElemento.textContent = `Total: $${total}`;

      // Reasignar nuevos data-index a los botones restantes
      contenedor.querySelectorAll('.eliminar').forEach((btn, i) => {
        btn.setAttribute('data-index', i);
      });
    });
  }
});

// Ir a pagar desde el carrito
function irPagoC() {
  const total = document.getElementById('totalPagarC').innerText.replace('Total: $', '');
  localStorage.setItem('precioPago', `$${total}`);
  window.location.href = 'metodos_pago.html';
}

// Volver al inicio
function volverInicio() {
  window.location.href = 'index.html';
}
