
// Guarda un valor en el localStorage
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Recupera un valor del localStorage
export function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// Elimina un valor del localStorage
export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}
