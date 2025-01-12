import { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";

// Define prop types
TodoInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }),
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

// TodoInput component
function TodoInput({ addTodo }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.todoInput;
    const text = input.value.trim();

    if (text) {
      addTodo(text);
      input.value = "";
    }
  };

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        name="todoInput"
        className="todoInput"
        placeholder="Enter a new task"
      />
      <button type="submit" className="addButton">
        Add
      </button>
    </form>
  );
}

// TodoList component
function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div key={todo.id} className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
        ×
      </button>
    </div>
  );
}

function App() {
  // State for managing todos
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Learn Redux", completed: false },
    { id: 3, text: "Build a project", completed: false },
  ]);

  // Function to add a new todo
  function addTodo(text) {
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        text: text,
        completed: false,
      },
    ]);
  }

  // Function to toggle todo completion status
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Function to delete a todo
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // Render the todo application
  return (
    <div>
      <h1>Todo List</h1>
      <TodoInput addTodo={addTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default App;
