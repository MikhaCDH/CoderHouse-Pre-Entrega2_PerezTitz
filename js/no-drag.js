document.addEventListener("DOMContentLoaded", function() {
  const elements = document.querySelectorAll("button, img, a");

  elements.forEach(element => {
      element.setAttribute("draggable", "false"); // Deshabilita la funcionalidad de arrastrar
      element.addEventListener("mousedown", function(event) {
          event.preventDefault(); // Evita que se active la selección de texto al hacer clic
      });
      
      // Aplicar estilos para deshabilitar la selección de texto solo a los elementos seleccionados
      element.style.userSelect = "none";
      element.style.webkitUserSelect = "none";
      element.style.MozUserSelect = "none";
      element.style.msUserSelect = "none";
  });
});
