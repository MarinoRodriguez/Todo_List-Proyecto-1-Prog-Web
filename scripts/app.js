document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById("input");
    const btnAdd = document.getElementById("btn-add");
    const ul = document.getElementById("li-container");
    const empty = document.getElementById("Empty");
    const userLabel = document.getElementById("user");

    // Verificar si hay un usuario logeado
    let currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        userLabel.textContent = "Invitado";
    }else{
            // Mostrar el nombre de usuario en el label
    userLabel.textContent = `Hola, ${currentUser}`;

    // Cargar tareas guardadas en localStorage para el usuario logeado
    loadTasks();
    }

    // Añadir tarea al presionar Enter
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Añadir tarea al hacer clic en el botón
    btnAdd.addEventListener("click", (e) => {
        e.preventDefault();
        addTask();
    });

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem(`${currentUser}_tasks`)) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }


    function addTask() {
        const text = input.value.trim();
        if (text === "") return;

        const task = { text: text, completed: false };
        addTaskToDOM(task);
        saveTaskToLocalStorage(task);

        input.value = "";
        empty.style.display = "none";
    }

    function addTaskToDOM(task) {
        const li = document.createElement("li");
        const p = document.createElement("p");
        const divBtns = document.createElement("div");

        divBtns.className = "task-buttons mt-2 mt-md-0";
        li.className = "list-group-item d-flex flex-column flex-md-row justify-content-between align-items-center";
        if (task.completed) li.classList.add("completed");

        p.textContent = task.text;
        p.className = "mb-0 task-text";

        li.appendChild(p);
        li.appendChild(divBtns);

        divBtns.appendChild(addCompleteBtn(li, task));
        divBtns.appendChild(addDeleteBtn(li, task));

        ul.appendChild(li);

        if (ul.getElementsByTagName("li").length > 0) {
            empty.style.display = "none";
        }
    }

    function addCompleteBtn(li, task) {
        const checkBtn = document.createElement("button");
        checkBtn.className = "btn-complete btn btn-success";

        const checkImg = document.createElement("img");
        checkImg.src = "Images/check.png";

        checkBtn.appendChild(checkImg);

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
        deleteBtn.className = "btn-delete btn btn-danger";

        const trashImg = document.createElement("img");
        trashImg.src = "Images/borrar blanco.png";

        deleteBtn.appendChild(trashImg);

        deleteBtn.addEventListener("click", () => {
            ul.removeChild(li);
            removeTaskFromLocalStorage(task);

            if (ul.getElementsByTagName("li").length === 0) {
                empty.style.display = "block";
            }
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
        const taskIndex = tasks.findIndex(t => t.text === task.text);
        if (taskIndex !== -1) {
            tasks[taskIndex] = task;
            localStorage.setItem(`${currentUser}_tasks`, JSON.stringify(tasks));
        }
    }

    function removeTaskFromLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem(`${currentUser}_tasks`)) || [];
        tasks = tasks.filter(t => t.text !== task.text);
        localStorage.setItem(`${currentUser}_tasks`, JSON.stringify(tasks));
    }

});