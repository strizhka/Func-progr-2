document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const filterButtons = document.querySelectorAll(".filter-btn");

    let tasks = [];
    let taskId = 1;
    let currentFilter = "all";

    const renderTasks = () => {
        taskList.innerHTML = "";
        tasks
            .filter(task => currentFilter === "all" || (currentFilter === "completed" ? task.completed : !task.completed))
            .forEach(task => {
                const li = document.createElement("li");
                li.classList.toggle("completed", task.completed);
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div>
                        <button class="toggle-btn" data-id="${task.id}">${task.completed ? "↩" : "✔"}</button>
                        <button class="delete-btn" data-id="${task.id}">✖</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        if (text) {
            tasks = [...tasks, { id: taskId++, text, completed: false }];
            taskInput.value = "";
            renderTasks();
        }
    };

    const toggleTask = id => {
        tasks = tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task));
        renderTasks();
    };

    const deleteTask = id => {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    };

    taskList.addEventListener("click", event => {
        const id = Number(event.target.dataset.id);
        if (event.target.classList.contains("toggle-btn")) {
            toggleTask(id);
        } else if (event.target.classList.contains("delete-btn")) {
            deleteTask(id);
        }
    });

    addTaskButton.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", event => {
        if (event.key === "Enter") addTask();
    });

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            currentFilter = button.dataset.filter;
            renderTasks();
        });
    });

    renderTasks();
});

