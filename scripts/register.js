document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Verifica que los campos no estén vacíos
        if (!username || !password || !confirmPassword) {
            alert('Por favor, complete todos los campos');
            return;
        }

        // Verifica que las contraseñas coincidan
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Comprueba si el usuario ya existe en el localStorage
        const existingUser = localStorage.getItem(username);
        if (existingUser) {
            alert('El nombre de usuario ya existe. Por favor, elija otro nombre.');
            return;
        }

        // Almacena el nuevo usuario en localStorage
        const newUser = {
            password: password,
            createdAt: new Date().toISOString()
        };
        
        // Usa JSON.stringify sólo al guardar objetos complejos
        saveToLocalStorage(username, newUser); 

        // Transfiere las tareas del usuario "Invitado" al nuevo usuario registrado
        const guestTasks = localStorage.getItem('Invitado_tasks');
        if (guestTasks) {
            // Asigna las tareas del invitado al nuevo usuario
            localStorage.setItem(`${username}_tasks`, guestTasks);
            // Elimina las tareas del usuario "Invitado"
            localStorage.removeItem('Invitado_tasks');
        }

        // Guarda el nombre de usuario como el usuario actual para iniciar sesión automáticamente
        localStorage.setItem('currentUser', username);
        // console.log(localStorage.getItem("currentUser"));
        
        // Redirige directamente a la página principal después del registro
        alert('Registro exitoso...Redireccionando');
        window.location.href = 'index.html';
    });
});

// Guarda un valor en el localStorage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));  // JSON.stringify solo cuando guardas objetos
}

// Recupera un valor del localStorage
function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}
