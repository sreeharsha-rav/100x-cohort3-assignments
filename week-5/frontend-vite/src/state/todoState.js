const todoState = new Map(); // Create a new Map to store todo items
let nextId = 1; // keep track of the next id for a new todo item

// Add a todo item
export function addTodoItem(text) {
  const todoItem = {
    id: nextId++,
    text,
    completed: false,
  };
  todoState.set(todoItem.id, todoItem);
  return todoItem;
}

// Toggle todo item completion status
export function toggleTodoItem(id) {
  const todo = todoState.get(id);
  if (!todo) return;

  // Update todo item completion status
  todo.completed = !todo.completed;
  todoState.set(id, todo);
}

// Delete a todo item
export function deleteTodoItem(id) {
  todoState.delete(id);
}
