const FormLogin = document.getElementById('Login');
const FormRegistro = document.getElementById('Registro');
const botonLogin = document.getElementById('btnlogin');
const botonRegistro = document.getElementById('btnRegistro');

botonLogin.style.borderBlockEnd = '2px solid';
FormRegistro.style.display = 'none';
botonLogin.addEventListener('click', () => {
    FormLogin.style.display = 'block';
    FormRegistro.style.display = 'none';
    botonLogin.style.borderBlockEnd = '2px solid';
    botonRegistro.style.borderBlockEnd = '0px solid';
});

botonRegistro.addEventListener('click', () => {
    FormLogin.style.display = 'none';
    FormRegistro.style.display = 'block';
    botonRegistro.style.borderBlockEnd = '2px solid';
    botonLogin.style.borderBlockEnd = '0px solid';
});

    /* boton modo claro y oscuro*/
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const formulario = document.getElementById('Formu');
    const cuepo = document.getElementById('bodys');
    
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            cuepo.style.backgroundColor = '#ffffff';
            formulario.style.backgroundColor='#273746';
            formulario.style.opacity= 0.900;
          //  'Modo Claro'
        } else {
            cuepo.style.backgroundColor = '#080710';
            formulario.style.backgroundColor='#273746';
            formulario.style.opacity= 0.900;
           //  'Modo Oscuro'
        }
    });
