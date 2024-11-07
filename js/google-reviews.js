const reviews = [
    {
        rating: 5.0,
        text: "Excelente atención y predisposición. Cuando di por terminada una computadora all in one, me dieron una mano y la restauraron, agregaron disco sólido y limpiaron el cooler, quedando tan rápida como cuando la compré.",
        author: "Sebastian Scebba"
    },
    {
        rating: 5.0,
        text: "Excelente calidad de atención!! Me asesoraron para comprar un equipo con una mirada profesional y responsable, con criterio. Y luego la asistencia técnica fue impecable, los recomiendo al 100%.",
        author: "Vanesa Miranda"
    },
    {
        rating: 5.0,
        text: "Compromiso, atención al detalle y excelente predisposición, todo lo que se puede pedir! Absolutamente recomendable.",
        author: "Francisco Manes"
    },
    {
        rating: 5.0,
        text: "Excelente servicio, excelente producto. El trato y cada explicación, las opciones, el presupuesto y sobretodo el resultado final. Me quedo una computadora nueva...hermosa para trabajar y estudiar. Gracias y Los vuelvo a elegir seguro.",
        author: "monica isabel Sandobal"
    },
    {
        rating: 5.0,
        text: "excelente atención, un profesional muy capaz y con dedicación personalizada en su trabajo, lleve mi Mac por un problema de software y me tuvo al tanto de todo le que hacia en forma remota. Muy recomendable.",
        author: "Gustavo Messutti"
    },
    {
        rating: 5.0,
        text: "Como siempre, todo impecable.  Velocidad, confianza y solución a tomos mis problemas  informáticos. %100 Recomendables.",
        author: "Facundo Lanciano"
    },
    {
        rating: 5.0,
        text: "Excelente atención y trato personal. Mi computadora quedó de 10. Saludos",
        author: "Graciela Tolisano"
    },
    {
        rating: 5.0,
        text: "Muy buena atención, solución rápida y completa, excelente profesional y precios accesibles. Lo recomiendo 👍",
        author: "Silvana Giordano"
    },
    {
        rating: 5.0,
        text: "Les llevé mi compu porque andaba lenta, me recomendaron que le cambie el disco rígido por uno de estado sólido y ahora vuela! no solo eso, le hicieron una limpieza integral y quedó como nueva. Muchas gracias!",
        author: "Juan Sleiman"
    }
];

let currentIndex = 0;

function updateReview() {
    const review = reviews[currentIndex];

    // Cambia el contenido con transición
    const ratingSection = document.getElementById('rating-section');
    const reviewSection = document.getElementById('review-section');

    // Añadir la clase fade para iniciar la animación de desvanecimiento
    ratingSection.classList.remove('visible');
    reviewSection.classList.remove('visible');

    setTimeout(() => {
        document.getElementById('rating-number').innerHTML = review.rating.toFixed(1);
        document.getElementById('rating-stars').innerHTML = '★'.repeat(Math.floor(review.rating)) + '☆'.repeat(5 - Math.floor(review.rating));
        document.getElementById('review-text').innerHTML = review.text;
        document.getElementById('review-author').innerHTML = review.author;

        // Quitar la clase fade para hacer que aparezcan de nuevo
        ratingSection.classList.add('visible');
        reviewSection.classList.add('visible');
    }, 500); // El tiempo de espera es el mismo que el tiempo de transición

    currentIndex = (currentIndex + 1) % reviews.length; // Ciclo de reseñas
}

// Cambia la reseña cada 5 segundos
setInterval(updateReview, 5000);

// Inicia con la primera reseña
document.getElementById('rating-section').classList.add('visible');
document.getElementById('review-section').classList.add('visible');

function rearrangeReviewButton() {
    const writeReviewButton = document.querySelector('.review-button');
    const reviewSection = document.getElementById('review-section');
    const ratingSection = document.getElementById('rating-section');
    const reviewsDiv = document.querySelector('.reviews');

    if (window.innerWidth <= 799) {
        // Mover el botón después de review-section
        if (writeReviewButton.parentNode !== reviewsDiv) {
            reviewsDiv.insertBefore(writeReviewButton, reviewSection.nextSibling);
        }
    } else {
        // Devolver el botón a rating-section
        if (writeReviewButton.parentNode !== ratingSection) {
            ratingSection.appendChild(writeReviewButton);
        }
    }
}

// Ejecutar al cargar la página
rearrangeReviewButton();

// Ejecutar al cambiar el tamaño de la ventana
window.addEventListener('resize', rearrangeReviewButton);