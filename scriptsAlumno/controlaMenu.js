document.getElementById('menuToggle').addEventListener('change', function () {
    const menu = document.getElementById('menu');
    const mainContent = document.getElementById('contenedor');
    const contenidoExamen = document.getElementById('ExamClav');
    const conte = document.getElementById('contenidoExamenesClav');
    
    if (this.checked) {
        menu.style.left = '0';
        mainContent.style.marginLeft = '250px';
        contenidoExamen.style.marginLeft='250px';
        conte.style.marginLeft='-30px';
    } else {
        menu.style.left = '-250px';
        mainContent.style.marginLeft = '0';
        contenidoExamen.style.marginLeft='50px';
    }
});