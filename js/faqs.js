document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll("#menu-list a");

    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const section = link.getAttribute("href");

            // Redirige a la página con el ancla
            window.location.href = `/index.html${section}`;
        });
    });
});

function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const faqElement = element.parentElement;

    // Toggle la clase 'show' en el párrafo
    answer.classList.toggle("show");

    // Obtener todos los elementos .faq
    const allFaqs = document.querySelectorAll('.faq');
    // Encontrar el índice del elemento actual
    const index = Array.prototype.indexOf.call(allFaqs, faqElement);

    // Si es el segundo elemento (índice 1 porque comienza desde 0)
    if (index === 1) {
        if (answer.classList.contains("show")) {
            // Agregar clase adicional para estilos específicos
            answer.classList.add("large");
        } else {
            // Remover la clase adicional cuando se oculta
            answer.classList.remove("large");
        }
    }   
    // Actualizar el margen inferior de .main
    updateMainMargin();
}

function updateMainMargin() {
    const expandedAnswers = document.querySelectorAll('.faq p.show');
    let totalMargin = 0;

    // Determinar el ancho actual de la ventana
    const screenWidth = window.innerWidth;

    // Definir los márgenes según el tamaño de la pantalla
    let normalMargin, largeMargin;

    if (screenWidth <= 360) {
        // Pantallas pequeñas
        normalMargin = 110;
        largeMargin = 300;
    } else if (screenWidth <= 650) {
        // Pantallas medianas
        normalMargin = 65;
        largeMargin = 50;
    } else if (screenWidth <= 850) {
        // Pantallas medianas
        normalMargin = 35;
        largeMargin = 50;
    } else if (screenWidth <= 1150) {
        // Pantallas medianas
        normalMargin = 25;
        largeMargin = 30;
    } else if (screenWidth <= 1366) {
        // Pantallas medianas
        normalMargin = 100;
        largeMargin = 100;
    } else {
        // Pantallas grandes (más de 1366px)
        normalMargin = 100;
        largeMargin = 300;
    }

    expandedAnswers.forEach(answer => {
        if (answer.classList.contains('large')) {
            totalMargin += largeMargin;
        } else {
            totalMargin += normalMargin;
        }
    });

    // Aplicar el margen calculado a .main
    const mainElement = document.querySelector('.main');
    mainElement.style.marginBottom = `${totalMargin}px`;
}

window.addEventListener('resize', adjustFooterPosition);
window.addEventListener('load', adjustFooterPosition);

function adjustFooterPosition() {
    const footer = document.querySelector('footer');
    const contentHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;

    if (contentHeight <= viewportHeight) {
        footer.style.position = 'absolute';
        footer.style.bottom = '0';
        footer.style.width = '100%';
    } else {
        footer.style.position = 'relative';
    }
}
