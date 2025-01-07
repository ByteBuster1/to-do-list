// Get DOM elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task to the list
addTaskButton.addEventListener('click', addTask);

// Add task from pressing Enter key
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        displayTask(task.text, task.completed);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        displayTask(taskText, false);
        saveTask(taskText, false);
        taskInput.value = ''; // Clear input field
    }
}

function displayTask(text, completed) {
    const li = document.createElement('li');
    li.classList.toggle('completed', completed);

    const taskSpan = document.createElement('span');
    taskSpan.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(li, text));

    // Mark task as completed
    taskSpan.addEventListener('click', () => toggleComplete(taskSpan, text));

    li.appendChild(taskSpan);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function saveTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskElement, taskText) {
    taskList.removeChild(taskElement);
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function toggleComplete(taskSpan, taskText) {
    taskSpan.classList.toggle('completed');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.text === taskText);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
