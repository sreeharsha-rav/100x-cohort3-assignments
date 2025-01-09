const todoState = new Map(); // Create a new Map to store todo items
let nextId = 1; // keep track of the next id for a new todo item

// DOM elements
const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

// State management functions
// Add a todo item
const addTodoItem = (text) => {
  const todoItem = {
    id: nextId++,
    text,
    completed: false,
  };
  todoState.set(todoItem.id, todoItem);
  return todoItem;
};

// Toggle todo item completion status
const toggleTodoItem = (id) => {
  const todo = todoState.get(id);
  if (!todo) return;

  // Update todo item completion status
  todo.completed = !todo.completed;
  todoState.set(id, todo);
};

// Delete a todo item
const deleteTodoItem = (id) => {
  todoState.delete(id);
};

// Function to create a new todo item DOM element
function createTodoItem(todo) {
  // Create container for todo item
  const todoItem = document.createElement("div");
  todoItem.className = "todo-item";
  todoItem.setAttribute("id", `todo-${todo.id}`);

  // Create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  // Create text span
  const todoText = document.createElement("span");
  todoText.textContent = todo.text;
  if (todo.completed) {
    todoText.classList.add("completed");
  }

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "×";
  deleteButton.className = "delete-btn";

  // Add event listener for checkbox to toggle completion status
  checkbox.addEventListener("change", () => {
    toggleTodoItem(todo.id);
    todoText.classList.toggle("completed");
  });

  // Add event listener for delete button
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todo.id);
    todoItem.remove();
  });

  // Append elements to todo item
  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(deleteButton);

  return todoItem;
}

// Function to handle input and create new todo item
function handleInput() {
  const text = todoInput.value.trim();
  if (text) {
    const todo = addTodoItem(text);
    const todoItem = createTodoItem(todo);
    todoList.appendChild(todoItem);
    todoInput.value = ""; // Clear input field
  }
}

// Event listeners for input field and add button
addButton.addEventListener("click", handleInput);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleInput();
  }
});
