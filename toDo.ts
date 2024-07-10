document.addEventListener('DOMContentLoaded', (event) => {
    const todoInput = document.getElementById('todo-input') as HTMLInputElement | null;
    const addTodoButton = document.getElementById('add-todo') as HTMLButtonElement | null;
    const todoList = document.getElementById('todo-list') as HTMLUListElement | null;

    if (!todoInput || !addTodoButton || !todoList) {
        console.error("One or more elements are missing");
        return;
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]') as { text: string, completed: boolean }[];
        todos.forEach(todo => {
            addTodoItem(todo.text, todo.completed);
        });
    }

    function saveTodos() {
        const todos: { text: string, completed: boolean }[] = [];
        document.querySelectorAll<HTMLLIElement>('#todo-list li').forEach(li => {
            todos.push({
                text: li.textContent || '',
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function addTodoItem(text: string, completed = false) {
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
        todoList!.appendChild(li);
    }

    addTodoButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText) {
            addTodoItem(todoText);
            todoInput.value = '';
            saveTodos();
        }
    });

    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodoButton.click();
        }
    });

    loadTodos();
});
