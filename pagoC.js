function irPagoC(boton) {
    const total = document.getElementById('totalPagarC').innerText.replace('Total: $', '');
    localStorage.setItem('precioPago', `${total}`);
    window.location.href = 'metodos_pago.html';
}


function irPago(boton){
    const card = boton.closest('.offer-card');
    const precioTexto = card.querySelector('.new-price').innerText.replace('$', '');

    localStorage.setItem('precioPago', precioTexto);
    window.location.href = 'metodos_pago.html';
}