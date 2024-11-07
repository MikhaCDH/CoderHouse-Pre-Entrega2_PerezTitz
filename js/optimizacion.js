//Funcion Recarga Cache
function reloadWithCacheBypass() {
    const version = new Date().getTime(); // Generar un valor unico basado en el tiempo
    let resourcesLoaded = 0;
    let totalResources = 0;

    // Obtener todas las hojas de estilo y scripts, excluyendo el script del widget de Freshservice
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    const scripts = document.querySelectorAll('script[src]:not([src*="freshwidget"])');

    totalResources = stylesheets.length + scripts.length;

    const resourceLoaded = () => {
        resourcesLoaded++;
        // Verificar si todos los recursos estan cargados
        if (resourcesLoaded === totalResources) {
            applyNewResources();
            // Re-inicializar el widget de Freshservice despues de recargar todos los scripts
            initializeFreshWidget();
        }
    };

    const applyNewResources = () => {
        // Aplicar hojas de estilo
        stylesheets.forEach(sheet => {
            const newSheet = document.createElement('link');
            newSheet.rel = 'stylesheet';
            newSheet.href = `${sheet.getAttribute('href').split('?')[0]}?v=${version}`;
            sheet.parentNode.replaceChild(newSheet, sheet);
        });

        // Aplicar scripts
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.src = `${script.getAttribute('src').split('?')[0]}?v=${version}`;
            script.parentNode.replaceChild(newScript, script);
        });
    };

    // Pre-cargar y verificar hojas de estilo
    stylesheets.forEach(sheet => {
        const preLoadLink = document.createElement('link');
        preLoadLink.rel = 'stylesheet';
        preLoadLink.href = `${sheet.getAttribute('href').split('?')[0]}?v=${version}`;
        preLoadLink.onload = resourceLoaded;
        preLoadLink.onerror = resourceLoaded; // Manejo de errores
        document.head.appendChild(preLoadLink);
    });

    // Pre-cargar y verificar scripts
    scripts.forEach(script => {
        const preLoadScript = document.createElement('script');
        preLoadScript.src = `${script.getAttribute('src').split('?')[0]}?v=${version}`;
        preLoadScript.onload = resourceLoaded;
        preLoadScript.onerror = resourceLoaded; // Manejo de errores
        document.head.appendChild(preLoadScript);
    });
}

// Lazy Imagenes
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = Array.from(document.querySelectorAll("img.lazy")); // Usar Array.from para mayor compatibilidad

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    // Usar data-src si está disponible, de lo contrario usar src
                    lazyImage.src = lazyImage.dataset.src || lazyImage.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        let active = false;

        const lazyLoad = function() {
            if (!active) {
                active = true;

                setTimeout(function() {
                    lazyImages.forEach(function(lazyImage) {
                        const rect = lazyImage.getBoundingClientRect();
                        if (rect.top <= window.innerHeight && rect.bottom >= 0 && getComputedStyle(lazyImage).display !== "none") {
                            // Usar data-src si está disponible, de lo contrario usar src
                            lazyImage.src = lazyImage.dataset.src || lazyImage.src;
                            lazyImage.classList.remove("lazy");
                        }
                    });

                    active = false;
                }, 200);
            }
        };

        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
    }
});

window.onload = reloadWithCacheBypass;