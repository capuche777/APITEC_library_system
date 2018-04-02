temas = JSON.parse(localStorage.getItem('temas'));

const tabla =  document.querySelector('.tabla');
let contenidoTabla = '';

let filas = temas.length;

// Objects.keys(objeto) devuelve el numero de propiedades que tiene un objeto, en este caso indico [i], ya que todos los objetos tienen el mismo numero de propiedades
const llaves = Object.keys(temas[0]);

// Crea dinamicamente la tabala
for (var i in temas) {
    if (temas[i] == 0) {
        console.log('tiene vacios');
    } else {
        contenidoTabla += "<tr>"
            contenidoTabla += `<td>${temas[i].tema_id}</td>`
            contenidoTabla += `<td>${temas[i].tema}</td>`
            contenidoTabla += `<td>${temas[i].fecha_ingreso}</td>`
            contenidoTabla += `<td id='edit${temas[i].tema_id}'>Editar</td>`
            contenidoTabla += `<td id='${temas[i].tema_id}' onclick="TemaEliminar(${i})">Eliminar</td>`
    }
};

// Inserta la tabala en el contenedor
tabla.innerHTML = `
    <table border=1>
        <thead>
            <th>#</th>
            <th>Tema</th>
            <th>Fecha de Ingreso</th>
            <th colspan=2>Operaciones</th>
        </thead>
        <tbody>
            ${contenidoTabla}
        </tbody>
    </table>
`;

    function TemaEliminar(tema) {
        temas.splice(tema, 1);
        temas = localStorage.setItem('temas', JSON.stringify(temas));
        window.location.reload();
    }