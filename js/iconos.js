document.addEventListener('DOMContentLoaded', function() {
    // Función para aplicar estilos de foco
    const applyFocusStyles = () => {
        const buttonInicio2 = document.querySelectorAll('.boton-inicio-2 button, .botones-footer');

        buttonInicio2.forEach(button => {
            button.addEventListener('focus', function() {
                button.style.backgroundColor = '#EEECD5';
                const span = button.querySelector('span');
                if (span) {
                    span.style.color = '#0f392f';
                }
                const pathElement = button.querySelector('svg path');
                if (pathElement) {
                    pathElement.setAttribute('fill', '#0f392f');
                }
            });

            button.addEventListener('blur', function() {
                button.style.backgroundColor = '';
                const span = button.querySelector('span');
                if (span) {
                    span.style.color = '';
                }
                const pathElement = button.querySelector('svg path');
                if (pathElement) {
                    pathElement.setAttribute('fill', '#FFF');
                }
            });
        });
    };

    // Función para eliminar estilos de foco
    const removeFocusStyles = () => {
        const buttonInicio2 = document.querySelectorAll('.boton-inicio-2 button, .botones-footer');

        buttonInicio2.forEach(button => {
            button.style.backgroundColor = '';
            const span = button.querySelector('span');
            if (span) {
                span.style.color = '';
            }
            const pathElement = button.querySelector('svg path');
            if (pathElement) {
                pathElement.setAttribute('fill', '#FFF');
            }
            button.removeEventListener('focus', function() {});
            button.removeEventListener('blur', function() {});
        });
    };

    // Selecciona todos los botones que contienen la imagen SVG
    const buttons = document.querySelectorAll('.boton-inicio-2 button, .botones-footer');

    buttons.forEach(button => {
        const img = button.querySelector('img[src="./assets/images/icono-whatsapp.svg"], [src="./assets/images/icono-instagram.svg"]',);
        
        if (img) {
            const imgURL = img.src;

            fetch(imgURL)
                .then(response => response.text())
                .then(data => {
                    // Convierte el SVG a un documento
                    const parser = new DOMParser();
                    const svgDoc = parser.parseFromString(data, 'image/svg+xml');
                    const svgElement = svgDoc.querySelector('svg');

                    // Selecciona el elemento path y añade la clase para la transición
                    const pathElement = svgElement.querySelector('path');
                    pathElement.style.transition = 'fill .3s';

                    // Reemplaza la imagen con el contenido del SVG
                    img.replaceWith(svgElement);

                    // Añadir eventos de mouseover y mouseout
                    button.addEventListener('mouseover', function() {
                        pathElement.setAttribute('fill', '#0f392f');
                    });

                    button.addEventListener('mouseout', function() {
                        const mediaQuery = window.matchMedia('(max-width: 799px)');
                        if (!mediaQuery.matches || !button.matches(':focus')) {
                            pathElement.setAttribute('fill', '#FFF');
                        }
                    });

                    // Añadir eventos de focus y blur para max-width: 799px
                    button.addEventListener('focus', function() {
                        const mediaQuery = window.matchMedia('(max-width: 799px)');
                        if (mediaQuery.matches) {
                            pathElement.setAttribute('fill', '#0f392f');
                        }
                    });

                    button.addEventListener('blur', function() {
                        const mediaQuery = window.matchMedia('(max-width: 799px)');
                        if (mediaQuery.matches) {
                            pathElement.setAttribute('fill', '#FFF');
                        }
                    });
                })
        }
    });

    // Verifica si la resolución es menor o igual a 799px
    const mediaQuery = window.matchMedia('(max-width: 799px)');

    if (mediaQuery.matches) {
        applyFocusStyles();
    }

    // Escucha cambios en el tamaño de la ventana
    mediaQuery.addEventListener('change', (e) => {
        if (e.matches) {
            applyFocusStyles();
        }
    });
});
