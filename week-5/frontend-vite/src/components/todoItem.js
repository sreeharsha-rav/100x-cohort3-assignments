export function createTodoItem(todo, { onToggle, onDelete }) {
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
    onToggle(todo.id);
    todoText.classList.toggle("completed");
  });

  // Add event listener for delete button
  deleteButton.addEventListener("click", () => {
    onDelete(todo.id);
  });

  // Append elements to todo item
  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(deleteButton);

  return todoItem;
}
