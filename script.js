$(document).ready(function () {
    const taskList = $('#taskList');
    const taskInput = $('#taskInput');
    const addTaskBtn = $('#addTaskBtn');

    loadTasks();

    addTaskBtn.click(function () {
        const taskText = taskInput.val().trim();
        if (taskText !== '') {
            const task = {
                id: Date.now(),
                text: taskText
            };
            saveTask(task);
            taskInput.val('');
        }
    });

    taskList.on('click', '.delete-btn', function () {
        const taskId = $(this).data('id');
        deleteTask(taskId);
    });

    taskList.on('click', '.edit-btn', function () {
        const taskId = $(this).data('id');
        const taskText = prompt('Edit Task:', $(this).siblings('input').val());
        if (taskText !== null) {
            updateTask(taskId, taskText);
        }
    });

    function saveTask(task) {
        const tasks = getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }

    function deleteTask(taskId) {
        const tasks = getTasks();
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        loadTasks();
    }

    function updateTask(taskId, updatedText) {
        const tasks = getTasks();
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                task.text = updatedText;
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        loadTasks();
    }

    function getTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    function loadTasks() {
        const tasks = getTasks();
        taskList.empty();
        tasks.forEach(task => {
            taskList.append(`
                <div class="task my-2">
                    <input type="text" value="${task.text}" disabled>
                    <button class="btn edit-btn edit-btn" data-id="${task.id}">Edit</button>
                    <button class="btn delete-btn delete-btn" data-id="${task.id}">Delete</button>
                </div>
            `);
        });
    }
});
