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
