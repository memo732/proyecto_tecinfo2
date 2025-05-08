document.addEventListener('DOMContentLoaded', function() {
    const imagenes = document.querySelectorAll('.galeria img');

    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function() {
            const altTexto = this.alt;
            alert(`Has hecho clic en: ${altTexto}`);
            // Aquí puedes agregar más interactividad, como mostrar la imagen en un modal
        });
    });
});