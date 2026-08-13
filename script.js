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