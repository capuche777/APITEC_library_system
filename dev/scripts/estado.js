let sesion; // Declarada para usar si existe una sesion abierta

// Si existe una sesion iniciada se obtiene el parametro y se declara la variable
if (localStorage.getItem('sesion')) {
    sesion = localStorage.getItem('sesion')
}

// Si no existe usa sesion abierta, automaticamente sera dirijido al formulario de logueo
if (sesion != 1) {
    window.location.href = './index.html';
}

document.querySelector('#salir').addEventListener('click', () => {
    localStorage.setItem('sesion', 0);
    localStorage.removeItem('logged_user');
    window.location.href = './index.html';
});