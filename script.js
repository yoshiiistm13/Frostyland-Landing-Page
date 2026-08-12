//alert("Javascript Conectado")
// Abrir el modal cuando se hace clic en el botón
const btnVideo = document.querySelector('.hero__video-btn');
const modal = document.getElementById('videoModal');

btnVideo.addEventListener('click', () => {
    modal.showModal();
});

// Cerrar el modal al hacer clic fuera del contenido (en el fondo)
modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close();
    }
});

