// Animacion botones al pasar mouse o presionar
document.addEventListener('DOMContentLoaded', function () {
    var menuItems = document.querySelectorAll('.menu ul li');

    menuItems.forEach(function (item) {
        function startAnimation() {
            if (!item.classList.contains('shine-animation')) {
                item.classList.add('shine-animation');

                setTimeout(function () {
                    item.classList.remove('shine-animation');
                }, 1500);
            }
        }

        var isMobile = window.matchMedia("(max-width: 799px)").matches;

        if (isMobile) {
            item.addEventListener('click', startAnimation);
        } else {
            item.addEventListener('mouseenter', startAnimation);
        }
    });
});

// Colores Raimbow
document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los elementos con la clase 'rainbow'
    const rainbowElements = document.querySelectorAll('.rainbow');

    // Array de colores cálidos y de amor
    const warmColors = [
        '#FF0000', // Rojo
        '#FF69B4', // Rosa vibrante
        '#FF1493', // Rosa profundo
        '#FF7F50', // Coral
        '#FF4500', // Naranja fuerte
        '#FFA07A', // Salmón claro
        '#FFD700', // Oro
        '#FFB6C1', // Rosa claro
        '#FF6347', // Tomate
        '#FF8C00'  // Naranja oscuro
    ];

    // Función para seleccionar un color aleatorio de la lista
    function getRandomWarmColor() {
        const randomIndex = Math.floor(Math.random() * warmColors.length);
        return warmColors[randomIndex];
    }

    // Función para aplicar el cambio constante de color a los elementos
    function applyRainbowEffect() {
        rainbowElements.forEach(element => {
            setInterval(() => {
                element.style.color = getRandomWarmColor();
            }, 500); // Cambia el color cada 500 ms (ajusta este tiempo si quieres más rápido/lento)
        });
    }

    // Verifica si hay al menos un elemento con la clase 'rainbow' y aplica el efecto
    if (rainbowElements.length > 0) {
        applyRainbowEffect();
    }
});

// Animacion Corazones
let heartInterval;

function createHeart() {
    const heart = document.createElement('img');
    heart.src = 'images/backgrounds/heart.png'; // Asegúrate de que esta ruta sea correcta
    heart.className = 'heart';

    // Posición horizontal aleatoria entre 0 y 95% del ancho de la ventana
    if (window.matchMedia('(max-width: 425px)').matches) {
        heart.style.left = Math.random() * 82 + '%';
    } else if (window.matchMedia('(max-width: 799px)').matches) {
        heart.style.left = Math.random() * 90 + '%';
    } else {
        heart.style.left = Math.random() * 95 + 'vw';
    }    

    // Duración de animación aleatoria entre 3 y 6 segundos
    const duration = Math.random() * 3 + 3;
    heart.style.animationDuration = duration + 's';

    // Añade el corazón al cuerpo del documento
    document.body.appendChild(heart);

    // Elimina el corazón después de que termine la animación para optimizar
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

function startHearts() {
    // Evita múltiples intervalos
    if (!heartInterval) {
        heartInterval = setInterval(createHeart, 250);
    }
}

function stopHearts() {
    clearInterval(heartInterval);
    heartInterval = null;
}

// Inicia los corazones si la página está visible al cargar
if (document.visibilityState === 'visible') {
    startHearts();
}

// Escucha los cambios de visibilidad de la página
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        startHearts();
    } else {
        stopHearts();
    }
});
