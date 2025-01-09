import { createTodoItem } from "./components/todoItem";
import { addTodoItem, toggleTodoItem, deleteTodoItem } from "./state/todoState";

export function setupTodoApp(todoInput, addButton, todoList) {
  // Function to handle input and create new todo item
  function handleInput() {
    const text = todoInput.value.trim();
    if (text) {
      const todo = addTodoItem(text);
      const todoItem = createTodoItem(todo, { onToggle, onDelete });
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

  // Handlers for toggle and delete actions
  function onToggle(id) {
    toggleTodoItem(id);
  }

  function onDelete(id) {
    deleteTodoItem(id);
    document.getElementById(`todo-${id}`).remove();
  }
}
