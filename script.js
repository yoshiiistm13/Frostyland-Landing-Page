document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.querySelector(".header__toggle");
    const navMenu = document.querySelector(".header__nav");

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener("click", function() {
            // Si la clase "is-open" no está, la agrega. Si ya está, la quita.
            navMenu.classList.toggle("show");
        });
    }

    const openVideoBtn = document.querySelector("#openVideoModal");
    const videoModal = document.querySelector("#videoModal");
    const closeVideoBtn = document.querySelector("#closeVideoModal");
    const youtubeIframe = document.querySelector("#youtubeIframe");

    if (openVideoBtn && videoModal && closeVideoBtn && youtubeIframe) {
        openVideoBtn.addEventListener("click", function(event) {
            event.preventDefault();
            videoModal.showModal();
            youtubeIframe.src = youtubeIframe.dataset.src;
            closeVideoBtn.focus();
        });

        closeVideoBtn.addEventListener("click", function() {
            videoModal.close();
        });

        videoModal.addEventListener("click", function(event) {
            if (event.target === videoModal) {
                videoModal.close();
            }
        });

        videoModal.addEventListener("keydown", function(event) {
            if (event.key === "Escape") {
                event.preventDefault();
                videoModal.close();
            }
        });

        videoModal.addEventListener("close", function() {
            youtubeIframe.removeAttribute("src");
        });
    }
});