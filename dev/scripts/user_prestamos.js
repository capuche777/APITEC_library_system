
document.querySelector('.pagina').textContent = 'Prestamos'; // Cambia el titulo de la pagina
const prestamos = JSON.parse(localStorage.getItem('prestamos')); // Trae el objeto de prestamos
const libros = JSON.parse(localStorage.getItem('libros')); // Trae el objeto de libros
const temas = JSON.parse(localStorage.getItem('temas')); // Trae el objeto de temas
const autores = JSON.parse(localStorage.getItem('autores')); // Trae el objeto de autores

