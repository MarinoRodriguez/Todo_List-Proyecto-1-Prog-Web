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

        localStorage.setItem(username, JSON.stringify(newUser));

        // Guarda el nombre de usuario como el usuario actual para iniciar sesión automáticamente
        localStorage.setItem('currentUser', username);

        // Redirige directamente a la página principal después del registro
        alert('Registro exitoso. Iniciando sesión...');
        window.location.href = 'index.html';
    });
});
