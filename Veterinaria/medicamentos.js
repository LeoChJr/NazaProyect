// medicamentos.js

document.addEventListener("DOMContentLoaded", function() {
    // Aquí puedes agregar interacciones con los botones "Comprar"
    const buyButtons = document.querySelectorAll('.btn-buy');

    buyButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Evita que se recargue la página
            alert('¡Producto añadido al carrito!');
        });
    });
});