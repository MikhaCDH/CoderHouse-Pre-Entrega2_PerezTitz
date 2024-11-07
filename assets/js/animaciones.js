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


