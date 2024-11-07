document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');

    document.getElementById('next').addEventListener('click', function () {
        changeSlide(currentSlide + 1);
        scrollToTop();
    });

    document.getElementById('prev').addEventListener('click', function () {
        changeSlide(currentSlide - 1);
        scrollToTop();
    });

    function changeSlide(newSlide) {
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].style.opacity = 0;

        currentSlide = (newSlide + slides.length) % slides.length; // Wrap around

        setTimeout(() => {
            slides.forEach(slide => slide.style.display = 'none');
            slides[currentSlide].style.display = 'block';
            setTimeout(() => slides[currentSlide].style.opacity = 1, 50);
            slides[currentSlide].classList.add('active');

            // Check for 'slide-primero' or 'slide-ultimo' class and toggle buttons
            if (slides[currentSlide].classList.contains('slide-primero')) {
                prevButton.style.display = 'none';
            } else {
                prevButton.style.display = 'inline-block'; // Show button
            }

            if (slides[currentSlide].classList.contains('slide-ultimo')) {
                nextButton.style.display = 'none';
            } else {
                nextButton.style.display = 'inline-block'; // Show button
            }
        }, 500); // Wait for opacity transition to finish
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Initialize the first slide
    slides[currentSlide].style.display = 'block';
    slides[currentSlide].style.opacity = 1;

    // Initial check for first and last slide
    if (slides[currentSlide].classList.contains('slide-primero')) {
        prevButton.style.display = 'none';
    }
    if (slides[currentSlide].classList.contains('slide-ultimo')) {
        nextButton.style.display = 'none';
    }
});
