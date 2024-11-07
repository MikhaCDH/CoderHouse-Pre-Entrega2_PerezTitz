function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

function scrollToCenter(el) {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offsetTop = rect.top + scrollTop;
    const elementHeight = rect.height;
    const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

    const scrollToPosition =
        offsetTop - windowHeight / 2 + elementHeight / 2;
    window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
}

const servicesIntro = `
    <p>At árbol, we offer a comprehensive range of IT services designed to optimize your company's productivity and sustainability:</p>
    <ul>
`;


const messages = {
    about: `
        <div class="boton-mensaje-contenido">
            <p>At árbol, we strongly believe in the synergy between technology and sustainability. Our motto, "Connecting People, Protecting the Planet," embodies our commitment to providing IT solutions that not only optimize your company’s productivity but also respect and protect the environment. Every solution we offer is designed to be efficient, effective, and responsible, helping your business grow while reducing its ecological impact.</p>
            <p><em>Greentech for a better world.</em> Our mission is to build a lasting bridge between technology and nature. With our IT solutions, we aim not only to innovate but also to deliver technology that aligns with business needs and sustainability principles, contributing to a better world.</p>
            <p><em>Sustainability through technology.</em> We envision a future where businesses thrive while positively contributing to the environment. At árbol, we work to ensure that the technology we implement promotes long-term ecological balance, making our solutions both sustainable and productive.</p>
        </div>
    `,
    services: {
        'User Support': `
            <li>User Support: Complete user support for operating systems like Windows, software management, and technical troubleshooting.</li>
        `,
        'Hardware Maintenance': `
            <li>Hardware Maintenance: Maintenance and optimization of hardware to ensure the efficient operation of all equipment.</li>
        `,
        'Server Management': `
            <li>Server Management: Full server administration and optimization, including updates, security, advanced configuration, and performance enhancement.</li>
        `,
        'Network Infrastructure': `
            <li>Network Infrastructure: Management and improvement of network infrastructure to ensure robust and efficient connectivity.</li>
        `,
        'IT Consulting': `
            <li>IT Consulting: Technological consulting and planning to implement sustainable solutions tailored to each company's specific needs, helping integrate new technologies and plan upgrades.</li>
        `,
    },
};

function updateServicesInfoBox(serviceName) {
    let serviceMessage = messages.services[serviceName];

    if (!serviceMessage) {
        console.error(`No se encontró un mensaje para el servicio: ${serviceName}`);
        return;
    }

    // Construir el mensaje completo
    let fullMessage = servicesIntro + serviceMessage + '</ul>';

    if (window.innerWidth > 490) {
        const infoBox = document.querySelector('#services .info-container.large-screen');

        if (infoBox && infoBox.style.display === 'block') {
            infoBox.innerHTML = fullMessage;
        }
    } else {
        // Para pantallas pequeñas
        const infoBoxes = document.querySelectorAll('#services .info-container');

        infoBoxes.forEach((infoBox) => {
            if (infoBox.style.display === 'inline-block') {
                infoBox.innerHTML = fullMessage;
            }
        });
    }
}



function toggleInfoBox(event, type, button) {
    event.preventDefault();

    // Determinar el contenedor correcto según el tipo
    const infoBox =
        type === 'about'
            ? document.querySelector(
                  '#about-us .info-container.info-verde.large-screen'
              )
            : document.querySelector('#services .info-container.large-screen');

    // Seleccionar la clase main-services
    const mainServices = document.querySelector('.main-services');

    let message;

    if (type === 'services') {
        if (window.innerWidth > 1030) {
            // Para pantallas mayores a 1030px, mostrar todos los mensajes de servicios
            let allServicesMessages = '';
            for (let key in messages.services) {
                allServicesMessages += messages.services[key];
            }
            message = servicesIntro + allServicesMessages + '</ul>';
        } else {
            // Para pantallas menores o iguales a 1030px, mostrar solo el mensaje del servicio activo
            let activeServiceText = '';
            let activeService;

            // Buscar el servicio actualmente visible
            const services = document.querySelectorAll('#carrusel div');
            services.forEach((service) => {
                const style = window.getComputedStyle(service);
                if (style.display !== 'none') {
                    activeServiceText = service
                        .querySelector('.services-text')
                        .innerText.trim();
                }
            });

            if (!activeServiceText) {
                // Si no se encuentra un servicio activo, usar el primero
                activeServiceText = Object.keys(messages.services)[0];
            }

            // Obtener el mensaje del servicio
            let serviceMessage = messages.services[activeServiceText];

            // Construir el mensaje completo
            message = servicesIntro + serviceMessage + '</ul>';
        }
    } else {
        message = messages[type];
    }

    if (window.innerWidth > 490) {
        if (infoBox.style.display === 'block') {
            // Ocultar la caja de información
            infoBox.style.opacity = 0;
            setTimeout(() => {
                infoBox.style.display = 'none';
                // Restablecer el margen
                if (mainServices) {
                    mainServices.style.marginBottom = '0'; // O el valor original que quieras
                }
            }, 300);
        } else {
            // Mostrar la caja de información y actualizar el contenido
            if (mainServices) {
                // Aplicar margen según el ancho de la pantalla
                if (window.innerWidth <= 1030) {
                    mainServices.style.marginBottom = '150px';
                } else if (window.innerWidth <= 1366) {
                    mainServices.style.marginBottom = '350px';
                } else {
                    mainServices.style.marginBottom = '170px';
                }
            }
            infoBox.style.opacity = 0;
            setTimeout(() => {
                infoBox.innerHTML = message;
                infoBox.style.display = 'block';
                setTimeout(() => {
                    infoBox.style.opacity = 1;
                    scrollToCenter(infoBox);
                }, 100);
            }, 300);
        }
    } else {
        // Manejo para pantallas pequeñas
        const parentDiv = button.parentNode;
        const infoBox = parentDiv.querySelector('.info-container');

        if (infoBox.style.display === 'inline-block') {
            infoBox.style.opacity = 0;
            setTimeout(() => {
                infoBox.style.display = 'none';
                if (mainServices) {
                    mainServices.style.marginBottom = '0'; // O el valor original que quieras
                }
            }, 300);
        } else {
            if (mainServices) {
                // Aplicar margen según el ancho de la pantalla
                if (window.innerWidth <= 1030) {
                    mainServices.style.marginBottom = '150px';
                } else if (window.innerWidth <= 1366) {
                    mainServices.style.marginBottom = '350px';
                } else {
                    mainServices.style.marginBottom = '170px';
                }
            }
            infoBox.style.opacity = 0;
            setTimeout(() => {
                infoBox.innerHTML = message;
                infoBox.style.display = 'inline-block';
                setTimeout(() => {
                    infoBox.style.opacity = 1;
                    scrollToCenter(infoBox);
                }, 100);
            }, 300);
        }
    }
}
