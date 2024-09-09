document.addEventListener('DOMContentLoaded', () => {
    const userLabel = document.getElementById("user");
    const loginLink = document.getElementById('login');

    // Verificar si hay un usuario logueado
    let currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        currentUser = "Invitado";
    }

    // Mostrar el nombre de usuario en el label
    if (currentUser && currentUser !== 'Invitado') {
        userLabel.textContent = `Bienvenido, ${currentUser}`;
        loginLink.textContent = 'Log out';
        loginLink.href = '#'; // Evitamos la redirección
    } else {
        userLabel.textContent = 'Invitado';
        loginLink.textContent = 'Login';
        loginLink.href = 'login.html'; // Redirige al login
    }

    // Lógica para cerrar sesión con SweetAlert
    loginLink.addEventListener('click', (event) => {
        // Solo mostrar SweetAlert si el botón es de "Log out"
        if (loginLink.textContent === 'Log out') {
            event.preventDefault(); // Prevenir la redirección por defecto

            Swal.fire({
                title: '¿Estás seguro?',
                text: '¡Se cerrará tu sesión actual y volverás a ser un invitado!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, cerrar sesión',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Eliminar usuario logueado
                    localStorage.removeItem('currentUser');
                    Swal.fire(
                        'Sesión cerrada',
                        'Tu sesión ha sido cerrada exitosamente.',
                        'success'
                    ).then(() => {
                        // Recargar la página para reflejar el estado de invitado
                        window.location.reload();
                    });
                }
            });
        }
    });
});
