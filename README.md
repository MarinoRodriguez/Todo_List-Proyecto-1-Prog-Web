
# To-Do List Web Application

Este es un proyecto de una aplicación web de lista de tareas (To-Do List) donde los usuarios pueden agregar, marcar como completadas y eliminar tareas. El proyecto está desarrollado con HTML, CSS y JavaScript vanilla, sin necesidad de backend, y utilizando `localStorage` para almacenar la información.

## Características

- **Agregar tareas**: Los usuarios pueden añadir nuevas tareas a la lista.
- **Marcar tareas completadas**: Se puede marcar una tarea como completada, tachando su título.
- **Eliminar tareas**: Las tareas completadas pueden eliminarse con un solo clic.
- **Almacenamiento local**: Las tareas se almacenan localmente en el navegador utilizando `localStorage`.
- **Creación de Usuarios e Inicio de Sección**: Los usuarios pueden crear perfiles en los cuales se vinculan las tareas creadas con el usuario, de modo que varios usuarios pueden tener sus propias tareas en el mismo navegador.
- **Diseño responsivo**: La aplicación es totalmente responsiva y está optimizada para móviles y computadoras.

## Requisitos

Para ejecutar el proyecto, solo se necesita un navegador web y conexión a internet.

## Instalación

1. accede al siguiente enlace: https://todolistproyecto1.netlify.app/

## O...

1. Clona este repositorio en tu máquina local.
   ```bash
   git clone https://github.com/MarinoRodriguez/todo-list.git
   ```
2. Navega a la carpeta del proyecto.
   ```bash
   cd todo-list
   ```
3. Abre el archivo `index.html` en tu navegador.

## Estructura del Proyecto

```bash
.
├── Images
│   ├── borrar blanco.png
│   ├── calendario.png
│   └── check.png
├── scripts
│   ├── app.js
│   ├── login.js
│   ├── navBarLogic.js
│   ├── register.js
│   └── StorageService.js
├── styles
│   ├── loginStyles.css
│   ├── registerStyles.css
│   ├── styles.css
│   └── variables.css
├── .gitattributes
├── index.html
├── info.html
├── login.html
├── README.md
└── register.html

```

## Tecnologías Utilizadas

- **HTML5**: Estructura y maquetación de la aplicación.
- **CSS3**: Estilos y diseño responsivo.
- **JavaScript (ES6)**: Lógica de interacción y manejo del `localStorage`.

## Funcionalidades Futuras

- Posibilidad de editar tareas.
- Filtros para ver tareas completadas, pendientes o todas.
- Sincronización con la nube para acceder a las tareas desde cualquier dispositivo.

## Contribución

Si quieres contribuir a este proyecto, puedes seguir los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama con tu funcionalidad:
   ```bash
   git checkout -b nueva-funcionalidad
   ```
3. Realiza los cambios y haz un commit:
   ```bash
   git commit -m "Añadir nueva funcionalidad"
   ```
4. Haz push a tu rama:
   ```bash
   git push origin nueva-funcionalidad
   ```
5. Abre un pull request en GitHub.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para obtener más información.
