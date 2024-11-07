// Definimos la clase Nodo para la lista circular
class Nodo {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

// Definimos la clase ListaCircular
class ListaCircular {
    constructor() {
        this.head = null;
    }

    // Método para insertar un nodo en la lista
    insertar(data) {
        let nuevoNodo = new Nodo(data);
        if (!this.head) {
            this.head = nuevoNodo;
            nuevoNodo.next = nuevoNodo;
            nuevoNodo.prev = nuevoNodo;
        } else {
            let tail = this.head.prev;
            tail.next = nuevoNodo;
            nuevoNodo.prev = tail;
            nuevoNodo.next = this.head;
            this.head.prev = nuevoNodo;
        }
    }

    // Avanzar al siguiente nodo
    avanzar() {
        this.head = this.head.next;
    }

    // Retroceder al nodo anterior
    retroceder() {
        this.head = this.head.prev;
    }

    // Obtener el dato actual
    obtenerActual() {
        return this.head.data;
    }
}

// Función para inicializar el carrusel
function initCarousel() {
    // Obtenemos todos los elementos hijos del carrusel
    let items = document.querySelectorAll('#carrusel > div');

    // Inicializamos la lista circular con los elementos del carrusel
    let listaElementos = new ListaCircular();

    // Limpiamos event listeners previos si existen
    document.getElementById('nextBtn').replaceWith(document.getElementById('nextBtn').cloneNode(true));
    document.getElementById('prevBtn').replaceWith(document.getElementById('prevBtn').cloneNode(true));

    // Removemos clases y estilos previos de los items
    items.forEach((item) => {
        item.classList.remove('active');
        item.style.display = '';
        let img = item.querySelector('img');
        if (img) {
            img.style.display = '';
        }
    });

    items.forEach((item) => {
        listaElementos.insertar(item);
    });

    let currentItem = listaElementos.obtenerActual();
    let isAnimating = false;

    // Función para mostrar el elemento actual en el carrusel con animación
    function mostrarElemento(direccion) {
        if (isAnimating) return;
        isAnimating = true;

        let elementoAnterior = currentItem;

        if (direccion === 'next') {
            listaElementos.avanzar();
        } else if (direccion === 'prev') {
            listaElementos.retroceder();
        }

        currentItem = listaElementos.obtenerActual();

        // Verificamos el tamaño de la pantalla
        if (window.matchMedia("(max-width: 1030px)").matches) {
            // Ocultamos los elementos que no están activos
            animateOut(elementoAnterior, direccion);
            animateIn(currentItem, direccion);
        } else {
            // En resoluciones mayores, simplemente cambiamos la clase 'active'
            elementoAnterior.classList.remove('active');
            currentItem.classList.add('active');
            isAnimating = false;
        }

        let activeServiceText = currentItem.querySelector('.services-text').innerText.trim();
        updateServicesInfoBox(activeServiceText);
    }

    // Función para animar la salida de un elemento
    function animateOut(element, direction) {
        let animation = element.animate([
            { transform: 'translateX(0%)', opacity: 1 },
            { transform: `translateX(${direction === 'next' ? '-200%' : '200%'})`, opacity: 0 }
        ], {
            duration: 500,
            easing: 'ease-in-out'
        });

        animation.onfinish = () => {
            element.classList.remove('active');
            element.style.display = 'none'; // Ocultamos el elemento después de la animación
            // Restauramos el display de la imagen
            let img = element.querySelector('img');
            if (img) {
                img.style.display = '';
            }
        };
    }

    // Función para animar la entrada de un elemento
    function animateIn(element, direction) {
        element.style.display = 'flex'; // Aseguramos que el elemento sea visible
        element.classList.add('active');

        // Establecemos display: inline a la imagen dentro del elemento
        let img = element.querySelector('img');
        if (img) {
            img.style.display = 'inline';
        }

        let animation = element.animate([
            { transform: `translateX(${direction === 'next' ? '100%' : '-100%'})`, opacity: 0 },
            { transform: 'translateX(0%)', opacity: 1 }
        ], {
            duration: 500,
            easing: 'ease-in-out'
        });

        animation.onfinish = () => {
            isAnimating = false;
        };
    }

    // Agregamos eventos a los botones de navegación
    document.getElementById('nextBtn').addEventListener('click', () => {
        mostrarElemento('next');
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        mostrarElemento('prev');
    });

    // Inicializamos el estado inicial del carrusel
    if (window.matchMedia("(max-width: 1030px)").matches) {
        // Ocultamos todos los elementos inicialmente
        items.forEach((item) => {
            item.style.display = 'none';
            let img = item.querySelector('img');
            if (img) {
                img.style.display = '';
            }
        });
        currentItem.style.display = 'flex';

        // Establecemos display: inline a la imagen dentro del elemento actual
        let img = currentItem.querySelector('img');
        if (img) {
            img.style.display = 'inline';
        }
    }

    currentItem.classList.add('active');
}

// Inicializamos el carrusel al cargar la página
initCarousel();

// Escuchamos cambios en el tamaño de la ventana
window.addEventListener('resize', () => {
    initCarousel();
});