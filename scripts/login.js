
// import { getFromLocalStorage, saveToLocalStorage } from './StorageService.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById("loginBtn");
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    loginBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Verifica que los campos no estén vacíos
        if (!username || !password) {
            alert('Por favor, complete ambos campos');
            return;
        }
        
        // Recupera el usuario del localStorage
        const storedUser = getFromLocalStorage(username);
        
        // Verifica si el usuario existe y la contraseña es correcta
        if (!storedUser || storedUser.password !== password) {
            alert('Nombre de usuario o contraseña incorrectos');
            return;
        }
        
        // Si el login es exitoso, guarda el usuario actual en localStorage
        saveToLocalStorage('currentUser', username);
        
        // Redirecciona a la página principal
        window.location.href = 'index.html';
    });
});

// Guarda un valor en el localStorage
 function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Recupera un valor del localStorage
 function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// Elimina un valor del localStorage
 function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}
