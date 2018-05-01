/**
 * Contiene la funcion para realizar busquedas dentro del DOM, se ha creado un archivo aparte para no repetir
 * codigo
 */
let buscarPor = document.querySelector('#slc_buscar');
const buscarBarra = document.querySelector('#txt_buscar');
/**
 * 
 */
buscarBarra.addEventListener('keyup', (e) => {
    const _busqueda = e.target.value.toLowerCase();
    let b = buscarPor.value;
    
    for (const t in tr) {
        const autor = tr[t].children[b].innerText;
        if (autor.toLowerCase().indexOf(_busqueda) != -1) {
            tr[t].classList.remove('ocultar');
        } else {
            tr[0].classList.remove('ocultar');
            tr[t].classList.add('ocultar');
        }
    }
    
})