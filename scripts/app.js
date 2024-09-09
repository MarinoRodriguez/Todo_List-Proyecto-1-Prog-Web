document.addEventListener('DOMContentLoaded', () => {

    const btnNewTask = document.getElementById("btn-create-task");
    const ul = document.getElementById("li-container");
    const empty = document.getElementById("Empty");

    let currentUser = localStorage.getItem('currentUser');
    // Cargar tareas guardadas en localStorage para el usuario logueado
    loadTasks();

    // Abrir modal de SweetAlert para añadir tarea
    btnNewTask.addEventListener("click", () => {
        Swal.fire({
            title: 'Crear nueva tarea',
            html:
                '<input id="swal-input-title" class="swal2-input" placeholder="Título">' +
                '<textarea id="swal-input-desc" class="swal2-textarea" placeholder="Descripción"></textarea>' +
                '<input id="swal-input-date" type="datetime-local" class="swal2-input">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Añadir',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const title = document.getElementById('swal-input-title').value.trim();
                const desc = document.getElementById('swal-input-desc').value.trim();
                const date = document.getElementById('swal-input-date').value.trim();

                if (!title) {
                    Swal.showValidationMessage('El título es obligatorio');
                    return false;
                }

                if (isTaskDuplicate(title)) {
                    Swal.showValidationMessage('Una tarea con el mismo título ya existe');
                    return false;
                }

                return { title: title, desc: desc, date: date };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const task = {
                    title: result.value.title,
                    desc: result.value.desc,
                    date: result.value.date,
                    completed: false
                };
                addTaskToDOM(task);
                saveTaskToLocalStorage(task);
                Swal.fire('Añadida', 'La tarea ha sido añadida', 'success');
            }
        });
    });

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem(`${currentUser}_tasks`)) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }

    function addTaskToDOM(task) {
        const li = document.createElement("li");
        const divHeader = document.createElement("div");
        const divTitle = document.createElement("div");
        const pTitle = document.createElement("p");
        const divDate = document.createElement("div");
        const pDate = document.createElement("span");
        const iconCalendar = document.createElement("span");
        const pDesc = document.createElement("p");
        const divBtns = document.createElement("div");
    
        // Formatear la fecha de forma más legible
        const date = new Date(task.date);
        const formattedDate = date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }) + " " + date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    
        // Crear contenedores para el título y la fecha
        divHeader.className = "task-header";
        divTitle.className = "task-title-container";
        divDate.className = "task-date-container";
        
        divBtns.className = "task-buttons";
        li.className = "list-group-item";
        if (task.completed) li.classList.add("completed");
    
        // Crear icono de calendario y agregarlo junto a la fecha
        iconCalendar.className = "calendar-icon";
        iconCalendar.textContent = "📅"; // Usar ícono de calendario directamente
    
        // Crear título, fecha y descripción
        pTitle.textContent = task.title;
        pDate.textContent = formattedDate;
        pDesc.textContent = task.desc;
    
        pTitle.className = "mb-0 task-text";
        pDate.className = "mb-0 task-date";
        pDesc.className = "mb-0 task-desc";
    
        // Añadir elementos a los contenedores correspondientes
        divTitle.appendChild(pTitle);
        divDate.appendChild(iconCalendar);
        divDate.appendChild(pDate);
    
        divHeader.appendChild(divTitle);
        divHeader.appendChild(divDate);
        li.appendChild(divHeader);
        li.appendChild(pDesc);
        li.appendChild(divBtns);
    
        // Añadir botones de completar y eliminar tarea
        if (!task.completed) divBtns.appendChild(addCompleteBtn(li, task));
        divBtns.appendChild(addDeleteBtn(li, task));
    
        // Añadir la tarea al contenedor de la lista
        ul.appendChild(li);
    
        // Si hay tareas, ocultar el mensaje de "No tienes tareas Pendientes"
        if (ul.getElementsByTagName("li").length > 0) {
            empty.style.display = "none";
        }
    }
    
    
    function addCompleteBtn(li, task) {
        const checkBtn = document.createElement("button");
        checkBtn.className = "btn-complete";

        checkBtn.textContent = "✔ Completar";

        checkBtn.addEventListener("click", () => {
            li.classList.add("completed");
            task.completed = true;
            updateTaskInLocalStorage(task);
            checkBtn.remove(); // Elimina el botón de completar
        });

        return checkBtn;
    }

    function addDeleteBtn(li, task) {
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-delete";

        deleteBtn.textContent = "🗑 Eliminar";

        deleteBtn.addEventListener("click", () => {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarla'
            }).then((result) => {
                if (result.isConfirmed) {
                    ul.removeChild(li);
                    removeTaskFromLocalStorage(task);
                    Swal.fire('Eliminada', 'La tarea ha sido eliminada', 'success');
                    if (ul.getElementsByTagName("li").length === 0) {
                        empty.style.display = "block";
                    }
                }
            });
        });

        return deleteBtn;
    }

    function saveTaskToLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem(`${currentUser}_tasks`)) || [];
        tasks.push(task);
        localStorage.setItem(`${currentUser}_tasks`, JSON.stringify(tasks));
    }

    function updateTaskInLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem(`${currentUser}_tasks`)) || [];
        const taskIndex = tasks.findIndex(t => t.title === task.title);
        if (taskIndex !== -1) {
            tasks[taskIndex] = task;
            localStorage.setItem(`${currentUser}_tasks`, JSON.stringify(tasks));
        }
    }

    function removeTaskFromLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem(`${currentUser}_tasks`)) || [];
        tasks = tasks.filter(t => t.title !== task.title);
        localStorage.setItem(`${currentUser}_tasks`, JSON.stringify(tasks));
    }

    function isTaskDuplicate(title) {
        const tasks = JSON.parse(localStorage.getItem(`${currentUser}_tasks`)) || [];
        return tasks.some(task => task.title === title);
    }

});
