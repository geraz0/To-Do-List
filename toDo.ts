//Purpose: Ensures that the code inside the event listener runs only after the entire HTML document has been completely loaded and parsed.
    //Significance: This ensures that the DOM elements needed for the to-do list application are available when the script runs, preventing errors related to missing elements.
document.addEventListener('DOMContentLoaded', (event) => {
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
//Purpose: Retrieves the HTML elements for the to-do input field, the add button, and the to-do list container.
    //Significance: These variables are used to interact with the DOM elements throughout the script, facilitating user input, displaying to-do items, and adding new items to the list
    
//Purpose: Loads the to-do items from localStorage and adds them to the to-do list.
    //JSON.parse(localStorage.getItem('todos')) retrieves the stored to-do items and converts them from a JSON string back to an array of objects.
    //todos.forEach(todo => { ... }) iterates over the array and adds each to-do item to the list using the addTodoItem function.
    //Ensures that to-do items are persisted across browser sessions and loaded when the application starts.
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            addTodoItem(todo.text, todo.completed);
        });
    }

//Purpose: Saves the current to-do items to localStorage.
    //document.querySelectorAll('#todo-list li').forEach(li => { ... }) selects all list items in the to-do list and iterates over them.
    //Each list item's text content and completion status are pushed into an array.
    //localStorage.setItem('todos', JSON.stringify(todos)) converts the array to a JSON string and saves it in localStorage.
    //Ensures that the current state of the to-do list is saved and can be restored later.
    function saveTodos() {
        const todos = [];
        document.querySelectorAll('#todo-list li').forEach(li => {
            todos.push({
                text: li.textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    //const li = document.createElement('li'); creates a new list item element.
    //li.textContent = text; sets the text content of the list item.
    //if (completed) { li.classList.add('completed'); } adds the 'completed' class if the to-do item is already marked as completed.
    //li.addEventListener('click', () => { ... }); sets up a click event listener to mark the item as completed and remove it after a delay.
    //todoList.appendChild(li); appends the new list item to the to-do list.
    //
    function addTodoItem(text, completed = false) {
        const li = document.createElement('li');
        li.textContent = text;
        if (completed) {
            li.classList.add('completed');
        }
        li.addEventListener('click', () => {
            li.classList.add('completed');
            setTimeout(() => {
                li.remove();
                saveTodos();
            }, 1000);
        });
        todoList.appendChild(li);
    }

//Purpose: Adds a click event listener to the "Add" button to add a new to-do item when the button is clicked.
    //const todoText = todoInput.value.trim(); retrieves and trims the input value.
    //if (todoText) { ... } checks if the input is not empty.
    //addTodoItem(todoText); calls addTodoItem to add the new to-do item to the list.
    //todoInput.value = ''; clears the input field.
    //saveTodos(); saves the updated to-do list to localStorage.
    addTodoButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText) {
            addTodoItem(todoText);
            todoInput.value = '';
            saveTodos();
        }
    });

//Purpose: Adds a keypress event listener to the input field to add a new to-do item when the Enter key is pressed.
    //todoInput.addEventListener('keypress', (event) => { ... }); sets up a function to run when a key is pressed while the input field is focused.
    //if (event.key === 'Enter') { ... } checks if the pressed key is the Enter key.
    //addTodoButton.click(); simulates a click on the "Add" button, triggering the same behavior as clicking the button.
    //
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodoButton.click();
        }
    });

    // Calls the loadTodos function to load and display the saved to-do items when the page is loaded.
    //Ensures that any previously saved to-do items are loaded and displayed when the application starts.
    loadTodos();
});
