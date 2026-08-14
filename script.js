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

document.addEventListener("DOMContentLoaded", () => {
    const barsSection = document.querySelector(".data-bars");

    if (!barsSection) return;

    const animateProgressBars = (entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = barsSection.querySelectorAll(".data-bars__item");

                items.forEach(item => {
                    const progressBar = item.querySelector("progress");
                    const numberSpan = item.querySelector("span:not(:first-child)");

                    if (!progressBar || !numberSpan) return;

                    const textValue = numberSpan.textContent.trim();
                    const targetValue = parseFloat(textValue.replace(/[^0-9.]/g, ''));
                    const maxLimit = parseFloat(progressBar.getAttribute("max")) || 100;

                    let currentValue = 0;
                    const duration = 800; // Estándar ágil: 0.8 segundos
                    const startTime = performance.now();

                    const updateBar = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Easing "Ease Out Cubic": Estándar UI/UX para un inicio rápido y frenado orgánico
                        const easeOutCubic = 1 - Math.pow(1 - progress, 3);

                        currentValue = easeOutCubic * targetValue;

                        if (currentValue > maxLimit) {
                            currentValue = maxLimit;
                        }

                        progressBar.value = currentValue;

                        if (progress < 1) {
                            requestAnimationFrame(updateBar);
                        } else {
                            progressBar.value = targetValue;
                        }
                    };

                    requestAnimationFrame(updateBar);
                });

                observerInstance.unobserve(entry.target);
            }
        });
    };

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2
    };

    const observer = new IntersectionObserver(animateProgressBars, observerOptions);
    observer.observe(barsSection);
});


document.addEventListener("DOMContentLoaded", function () {
    const productCards = document.querySelectorAll(".product-card");

    if (productCards.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se activará solo cuando el 50% de la sección esté a la vista del usuario
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Sube este número (ej. 0.4 o 0.5) para exigir que baje más en la página
    });

    productCards.forEach(card => observer.observe(card));
});


document.addEventListener("DOMContentLoaded", function () {
    let hasScrolled = false;

    function triggerConfettiOnFirstScroll() {
        if (!hasScrolled) {
            hasScrolled = true;

            // Lanzamiento de confeti con los colores de tu logotipo
            confetti({
                particleCount: 120,
                spread: 100,
                origin: { y: 0.4 }, // Ajusta la altura de la explosión en pantalla
                colors: ['#38bdf8', '#ec4899', '#facc15'] // Azul claro, rosa y amarillo
            });

            // Se ejecuta solo una vez en el primer scroll
            window.removeEventListener("scroll", triggerConfettiOnFirstScroll);
        }
    }

    window.addEventListener("scroll", triggerConfettiOnFirstScroll);
});