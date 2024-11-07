document.querySelectorAll('.outpage').forEach(item => {
    item.addEventListener('click', function(event) {
        // Prevenir la redirección inmediata
        event.preventDefault();
        
        // Definir el tiempo de espera antes de redirigir
        const delay = 20000; // 2000 milisegundos = 2 segundos
        
        // Redirigir después del delay
        setTimeout(() => {
            window.location.href = item.href;
        }, delay);
    });
});


// Desplazamiento
function getMargins() {
    if (window.matchMedia("(max-width: 490px)").matches) {
        return {
            '#about-us': 250, // Margen superior para la sección About Us
            '#services': 50    // Margen superior para la sección Services
        };
    } else if (window.matchMedia("(max-width: 798px)").matches) {
        return {
            '#about-us': 70, // Margen superior para la sección About Us
            '#services': 70    // Margen superior para la sección Services
        };
    } else if (window.matchMedia("(max-width: 799px)").matches) {
        return {
            '#about-us': 110, // Margen superior para la sección About Us
            '#services': 50    // Margen superior para la sección Services
        };
    }  else { //(Resoluciones de mas de 799)
        return {
            '#about-us': 50,  // Margen superior para la sección About Us 
            '#services': 80    // Margen superior para la sección Services
        };
    }
}

let margins = getMargins();

// Actualizar márgenes cuando cambia el tamaño de la ventana
window.addEventListener('resize', function() {
    margins = getMargins();
});

// Seleccionar todos los enlaces internos que apuntan a secciones
const internalLinks = document.querySelectorAll('a[href^="#"]');

// Función para desplazarse a la sección con un margen superior personalizado
function scrollToSection(event) {
    event.preventDefault(); // Evitar comportamiento por defecto del enlace
    const href = this.getAttribute('href');
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

// Añadir el evento click a cada enlace interno
internalLinks.forEach(function(link) {
    link.addEventListener('click', scrollToSection);
});


// Header Slide Down
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const background = document.querySelector('.background-header');

    header.classList.add('slide-down');
    background.classList.add('slide-down');

    function updateStyles() {
    }

    updateStyles();
});

//Animacion de letras (H1) en el logo principal
document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.getElementById('h1-logo');
    const text = h1.textContent;
    h1.textContent = '';

    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '.2';
        span.classList.add('letter');
        if (char === ' ') {
            span.style.marginRight = '.2em';
        }
        h1.appendChild(span);
    });

    const letters = document.querySelectorAll('.letter');
    const totalDuration = 1000;
    let timeouts = [];
    let animationInProgress = false;

    function handleAnimation(add) {
        if (animationInProgress) return;
        animationInProgress = true;

        letters.forEach((letter, index) => {
            const delay = (totalDuration / letters.length) * index;
            const timeout = setTimeout(() => {
                letter.style.opacity = add ? '1' : '.2';
                letter.classList.toggle('jump', add);
                
                if (index === letters.length - 1) {
                    setTimeout(() => {
                        animationInProgress = false;
                    }, delay);
                }
            }, delay);
            timeouts.push(timeout);
        });
    }

    function clearAnimation() {
        timeouts.forEach(clearTimeout);
        timeouts = [];
        animationInProgress = false;
    }

    h1.addEventListener('mouseenter', () => {
        clearAnimation();
        handleAnimation(true);
    });

    h1.addEventListener('mouseleave', () => {
        clearAnimation();
        handleAnimation(false);
    });
});

// Boton Formulario - Sube y Baja / Desaparicion de animaciones
const whatsappButton = document.getElementById('form-button');
const notificationDot = document.getElementById('notification-dot');
let animationInterval;

function startJumpAnimation() {
    animationInterval = setInterval(jumpAnimation, 3000);
}

function jumpAnimation() {
    if (whatsappButton.dataset.isAnimating === "true") return;

    whatsappButton.dataset.isAnimating = "true";
    whatsappButton.style.transition = 'transform 0.3s ease-in-out';
    whatsappButton.style.transform = 'translateY(-10px)';

    setTimeout(() => {
        whatsappButton.style.transform = 'translateY(10px)';

        setTimeout(() => {
            whatsappButton.style.transform = 'translateY(-5px)';

            setTimeout(() => {
                whatsappButton.style.transform = 'translateY(0)';
                whatsappButton.dataset.isAnimating = "false";
            }, 300);

        }, 300);

    }, 300);
}

// Iniciar animación
startJumpAnimation();

// Detener animación y ocultar el punto rojo al hacer clic
whatsappButton.addEventListener('click', () => {
    clearInterval(animationInterval); // Detener la animación
    notificationDot.style.display = 'none'; // Ocultar el punto rojo
});

// Modal del formulario
document.getElementById("form-button").onclick = function() {
    document.getElementById("formModal").style.display = "block";
};
document.getElementById("closeButton").onclick = function() {
    document.getElementById("formModal").style.display = "none";
};
window.onclick = function(event) {
    if (event.target == document.getElementById("formModal")) {
        document.getElementById("formModal").style.display = "none";
    }
};