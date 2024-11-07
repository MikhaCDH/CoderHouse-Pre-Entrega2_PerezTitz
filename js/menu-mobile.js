function updateStyles() {
    const menu = document.getElementById('menu');
    const menuToggle = document.querySelector('.menu-toggle'); // Cambiado para seleccionar por clase
    const isMenuVisible = menu.style.transform === "translateX(0px)";

    menuToggle.onmouseover = function() {
        menuToggle.style.backgroundColor = isMenuVisible ? '#2D562D' : '#CEE860';
        menuToggle.querySelectorAll('span').forEach(span => {
            span.style.backgroundColor = isMenuVisible ? '#CEE860' : '#2D562D';
        });
    };

    menuToggle.onmouseout = function() {
        menuToggle.style.backgroundColor = isMenuVisible ? '#CEE860' : '#2D562D';
        menuToggle.querySelectorAll('span').forEach(span => {
            span.style.backgroundColor = isMenuVisible ? '#2D562D' : '#CEE860';
        });
    };
}

let isButtonActive = true;

document.querySelector('.menu-toggle').addEventListener('click', function() {
    if (!isButtonActive) return;

    isButtonActive = false;

    if (window.innerWidth <= 799) {
        var menu = document.getElementById('menu');
        var menuItems = document.querySelectorAll('#menu-list li');
        if (menu.style.transform === "translateX(0px)") {
            for (let i = menuItems.length - 1; i >= 0; i--) {
                this.classList.remove('active');
                setTimeout(() => {
                    menuItems[i].style.transform = 'translateX(100%) translateY(0px)';
                    menuItems[i].style.opacity = '0';
                    if (i === 0) {
                        menu.style.transform = 'translateX(100%)';
                        
                        setTimeout(() => {
                            menu.style.display = 'none';
                            isButtonActive = true;  // Reactivar el botón una vez que el menú se oculta completamente
                        }, 500);
                    }
                }, 100 * (menuItems.length - i));
            }
        } else {
            this.classList.add('active');
            menu.style.display = 'block';
            setTimeout(() => {
                menu.style.transform = 'translateX(0px)';
                applyAnimationsToMenuItems();
                setTimeout(() => {
                    isButtonActive = true;  // Reactivar el botón después de que todas las animaciones hayan terminado
                }, 100 * menuItems.length);
            }, 10);
        }
    }
    updateStyles();
});

function resetMenu() {
    var menuList = document.getElementById('menu-list');
    
    menuList.innerHTML = `
        <li><a href="#about-us">About Us</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="https://calendly.com/arboltecno">Remote IT SUPPORT</a></li>
    `;

    // Añadir el estilo después de que los elementos están en el DOM
    setTimeout(() => {
        applyAnimationsToMenuItems();
        addLinkEventHandlers(); // Añadir manejadores de eventos a los enlaces
    }, 10);

}

function addLinkEventHandlers() {
    document.querySelectorAll('#menu-list a').forEach(link => {
        // Excluir el botón de SERVICIOS y el botón de Volver
        if (link.parentElement.id !== 'services-btn' && !link.onclick) {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Prevenir la redirección inmediata
                const href = link.getAttribute('href'); // Obtener el href del atributo
                closeMenuThenRedirect(href); // Cerrar menú y luego redirigir o desplazar
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const resolutionBreakpoints = [799, 490]; // Puntos de quiebre de resolución
    let lastResolution = window.innerWidth; // Guardar la resolución al cargar la página

    window.addEventListener('resize', function() {
        const currentResolution = window.innerWidth;

        // Verificar si la resolución ha cruzado alguno de los puntos de quiebre
        for (let breakpoint of resolutionBreakpoints) {
            if (
                (lastResolution > breakpoint && currentResolution <= breakpoint) || // Si la resolución disminuyó y cruzó el punto
                (lastResolution < breakpoint && currentResolution >= breakpoint)    // Si la resolución aumentó y cruzó el punto
            ) {
                location.reload(); // Recargar la página si se cruza un punto de quiebre
                break; // Salir del bucle para evitar múltiples recargas
            }
        }

        lastResolution = currentResolution; // Actualizar la última resolución después del cambio
    });
});

function closeMenuThenRedirect(href) {
    const menu = document.getElementById('menu');
    const menuToggle = document.querySelector('.menu-toggle');

    const isMenuOpen = menu.style.transform === "translateX(0px)";

    if (isMenuOpen) {
        // Iniciar cierre del menú
        menuToggle.click(); // Utiliza el evento click que ya maneja el cierre
        setTimeout(() => {
            if (href.startsWith('#')) {
                scrollToSectionByHref(href); // Desplazar suavemente si es un ancla
            } else {
                window.location.href = href; // Redirigir después de que el menú se haya cerrado
            }
        }, 600); // Asegúrate de que el tiempo de espera sea suficiente para completar las animaciones
    } else {
        if (href.startsWith('#')) {
            scrollToSectionByHref(href); // Desplazar suavemente si es un ancla
        } else {
            window.location.href = href; // Si el menú ya está cerrado, redirigir inmediatamente
        }
    }
}

function scrollToSectionByHref(href) {
    const targetSection = document.querySelector(href);

    if (targetSection) {
        const position = targetSection.getBoundingClientRect().top + window.scrollY;
        const marginTop = margins[href] || 0; // Usar margen definido o 0 si no está definido
        window.scrollTo({
            top: position - marginTop,
            behavior: 'smooth'
        });
    }
}

function applyAnimationsToMenuItems() {
    var menuItems = document.querySelectorAll('#menu-list li');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0'; // Establecer opacidad inicial
        item.style.transform = 'translateX(100%) translateY(0px)';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0px) translateY(0px)';
        }, 100 * (index + 1));
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 799) {
        resetMenu();
    }
});