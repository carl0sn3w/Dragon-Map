document.addEventListener("DOMContentLoaded", function() {
    // Barra lateral
    const openBTN = document.getElementById("button-menu");
    const overlay = document.getElementById("overlay");
    const barraLateral = document.querySelector(".barralateral");
    if (openBTN && overlay && barraLateral) {
        openBTN.addEventListener("click", () => {
            barraLateral.classList.add("sidebar-active");
            overlay.style.display = "block";
        });
        overlay.addEventListener("click", () => {
            barraLateral.classList.remove("sidebar-active");
            overlay.style.display = "none";
        });
    }

    // Carrusel de imágenes (si existe)
    const tira = document.getElementById("tira");
    const imagenes = document.querySelectorAll(".Div-mh-tira img");
    if (tira && imagenes.length > 0) {
        const anchoImagen = imagenes[0].clientWidth;
        const totalOriginales = imagenes.length / 2 || imagenes.length;
        let posicion = 0;
        const velocidad = 1;
        function mover() {
            posicion += velocidad;
            if (posicion >= anchoImagen * totalOriginales) {
                posicion = 0;
            }
            tira.style.transform = `translateX(${-posicion}px)`;
            requestAnimationFrame(mover);
        }
        mover();
    }

    // Modal Personalizar
    const btnPersonalizar = document.getElementById("btn-personalizar");
    const modalPersonalizar = document.getElementById("modal-personalizar");
    const closeModal = document.getElementById("close-modal");
    if(btnPersonalizar && modalPersonalizar && closeModal) {
        btnPersonalizar.addEventListener("click", () => {
            modalPersonalizar.style.display = "block";
        });
        closeModal.addEventListener("click", () => {
            modalPersonalizar.style.display = "none";
        });
        window.addEventListener("click", (event) => {
            if (event.target === modalPersonalizar) {
                modalPersonalizar.style.display = "none";
            }
        });
    }
});

// Manejo de imagen de perfil
document.addEventListener("DOMContentLoaded", function() {
    const inputImagen = document.getElementById("input-imagen");
    const guardarImagenBtn = document.getElementById("guardar-imagen");
    const divPf = document.querySelector(".imagenperfil");
    const modalPersonalizar = document.getElementById("modal-personalizar");

    function applyProfileImage(src) {
        if (!src) return;
        const targets = document.querySelectorAll('.imagenperfil, .perfil');
        targets.forEach(el => {
            if (el.tagName.toLowerCase() === 'img') {
                el.src = src;
            } else {
                el.style.backgroundImage = `url('${src}')`;
            }
        });
    }

    // Cargar imagen guardada y aplicarla a todas las páginas que tengan el selector
    const savedImage = localStorage.getItem('imagenPerfil');
    if (savedImage) {
        applyProfileImage(savedImage);
    }
    // Guardar nueva imagen de perfil
    if (inputImagen && guardarImagenBtn) {
        guardarImagenBtn.addEventListener("click", () => {
            const archivo = inputImagen.files[0];
            if (archivo) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const src = e.target.result;
                    if (divPf) divPf.style.backgroundImage = `url('${src}')`;
                    localStorage.setItem('imagenPerfil', src);
                    applyProfileImage(src);
                    if (modalPersonalizar) modalPersonalizar.style.display = "none";
                };
                reader.readAsDataURL(archivo);
            }
        });
    }


    // Seleccionar imagen predefinida
    const btnsImagenPerfil = document.querySelectorAll('.btn-imagen-perfil');
    btnsImagenPerfil.forEach(btn => {
        btn.addEventListener('click', () => {
            const imgEl = btn.querySelector('img');
            const imgSrc = imgEl ? imgEl.getAttribute('src') : null;
            if (!imgSrc) return;
            if (divPf) divPf.style.backgroundImage = `url('${imgSrc}')`;
            localStorage.setItem('imagenPerfil', imgSrc);
            applyProfileImage(imgSrc);
            if (modalPersonalizar) {
                modalPersonalizar.style.display = "none";
            }
        });
    });
});

// Restablecer imagen de perfil
document.addEventListener("DOMContentLoaded", function() {
    const restablecerImagenBtn = document.getElementById("restablecer-imagen");
    const divPf = document.querySelector(".imagenperfil"); 
    if (restablecerImagenBtn) {
        restablecerImagenBtn.addEventListener("click", () => {
            const targets = document.querySelectorAll('.imagenperfil, .perfil');
            targets.forEach(el => {
                if (el.tagName.toLowerCase() === 'img') {
                    el.src = '';
                } else {
                    el.style.backgroundImage = '';
                }
            });
            if (divPf) divPf.style.backgroundImage = '';
            localStorage.removeItem('imagenPerfil');
            if (document.getElementById('modal-personalizar')) document.getElementById('modal-personalizar').style.display = 'none';
        });
    }
});

// Manejo de tema oscuro
document.addEventListener("DOMContentLoaded", function() {
    const toggleTemaBtn = document.getElementById("toggle-tema");
    const body = document.body;
    const savedTema = localStorage.getItem('temaOscuro');
    if (savedTema === 'true') {
        body.classList.add('tema-oscuro');
    }
    if (toggleTemaBtn) {
        toggleTemaBtn.addEventListener("click", () => {
            body.classList.toggle('tema-oscuro');
            const isOscuro = body.classList.contains('tema-oscuro');
            localStorage.setItem('temaOscuro', isOscuro);
        });
    }
});

