// Función para alternar la visibilidad del menú
function toggleMenu(menuId) {
    const submenu = document.getElementById(menuId);
    if (submenu.style.display === 'none' || submenu.style.display === '') {
        submenu.style.display = 'block';
    } else {
        submenu.style.display = 'none';
    }
}

// Función para cargar contenido basado en el contentId
function loadContent(contentId) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    // Dependiendo del contentId, cargamos el contenido apropiado
    if (contentId === 'course-list') {
        content.innerHTML = '<h2>List Courses</h2><div id="courseList"></div>';
        loadCourses();
    } else if (contentId === 'course-create') {
        content.innerHTML = `
            <h2>Create Course</h2>
            <form id="createCourseForm">
                <label for="title">Title</label>
                <input type="text" id="title" name="title">
                <label for="description">Description</label>
                <textarea id="description" name="description"></textarea>
                <label for="duration">Duration</label>
                <input type="number" id="duration" name="duration">
                <button type="submit">Create Course</button>
            </form>
        `;
        document.getElementById('createCourseForm').addEventListener('submit', createCourse);
    } else if (contentId === 'task-list') {
        content.innerHTML = '<h2>List Tasks</h2><div id="taskList"></div>';
        loadTasks();
    } else if (contentId === 'task-create') {
        content.innerHTML = `
            <h2>Create Task</h2>
            <form id="createTaskForm">
                <label for="taskTitle">Title</label>
                <input type="text" id="taskTitle" name="taskTitle">
                <label for="taskDescription">Description</label>
                <textarea id="taskDescription" name="taskDescription"></textarea>
                <label for="taskStatus">Status</label>
                <input type="text" id="taskStatus" name="taskStatus">
                <button type="submit">Create Task</button>
            </form>
        `;
        document.getElementById('createTaskForm').addEventListener('submit', createTask);
    } else if (contentId === 'user-list') {
        content.innerHTML = '<h2>List Users</h2><div id="userList"></div>';
        loadUsers();
    } else if (contentId === 'user-create') {
        content.innerHTML = `
            <h2>Create User</h2>
            <form id="createUserForm">
                <label for="username">Username</label>
                <input type="text" id="username" name="username">
                <label for="email">Email</label>
                <input type="email" id="email" name="email">
                <button type="submit">Create User</button>
            </form>
        `;
        document.getElementById('createUserForm').addEventListener('submit', createUser);
    }
    // Añadir más secciones para otros microservicios si es necesario
}

// Función para crear un curso
function createCourse(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const duration = document.getElementById('duration').value;

    fetch('/api/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, duration })
    })
    .then(response => response.json()) 
    .then(data => {
        console.log('Course created:', data);
        loadCourses(); // Recargar la lista de cursos
    })
    .catch(error => console.error('Error:', error));
}

// Función para cargar la lista de cursos
function loadCourses() {
    fetch('/api/courses')
    .then(response => response.json())
    .then(courses => {
        const courseList = document.getElementById('courseList');
        courseList.innerHTML = courses.map(course => `
            <div>
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <p>Duration: ${course.duration}</p>
            </div>
        `).join('');
    })
    .catch(error => console.error('Error:', error));
}

// Función para crear una tarea
function createTask(event) {
    event.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value;

    fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, status })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Task created:', data);
        loadTasks(); // Recargar la lista de tareas
    })
    .catch(error => console.error('Error:', error));
}

// Función para cargar la lista de tareas
function loadTasks() {
    fetch('/api/tasks')
    .then(response => response.json())
    .then(tasks => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = tasks.map(task => `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Status: ${task.status}</p>
            </div>
        `).join('');
    })
    .catch(error => console.error('Error:', error));
}

// Función para crear un usuario
function createUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email })
    })
    .then(response => response.json())
    .then(data => {
        console.log('User created:', data);
        loadUsers(); // Recargar la lista de usuarios
    })
    .catch(error => console.error('Error:', error));
}

// Función para cargar la lista de usuarios
function loadUsers() {
    fetch('/api/users')
    .then(response => response.json())
    .then(users => {
        const userList = document.getElementById('userList');
        userList.innerHTML = users.map(user => `
            <div>
                <h3>${user.username}</h3>
                <p>${user.email}</p>
            </div>
        `).join('');
    })
    .catch(error => console.error('Error:', error));
}
