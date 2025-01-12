let nextId = 1;
let todos = [
  {
    id: nextId++,
    text: "Learn JavaScript",
    completed: false,
  },
  {
    id: nextId++,
    text: "Learn React",
    completed: false,
  },
  {
    id: nextId++,
    text: "Build a project",
    completed: false,
  },
  {
    id: nextId++,
    text: "Get a job",
    completed: false,
  },
  {
    id: nextId++,
    text: "Get paid",
    completed: false,
  },
];

export async function getAllTodo(req, res, next) {
  return res.status(200).json(todos);
}

export async function createTodo(req, res, next) {
  const { text } = req.body;
  const newTodo = {
    id: nextId++,
    text,
    completed: false,
  };
  todos.push(newTodo);
  return res.status(201).json(newTodo);
}

export async function updateTodo(req, res, next) {
  const { id } = req.params;
  const { text, completed } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === Number(id));

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    text: text || todos[todoIndex].text,
    completed: completed || todos[todoIndex].completed,
  };

  return res.status(200).json(todos[todoIndex]);
}

export async function deleteTodoById(req, res, next) {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id === Number(id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todos.splice(todoIndex, 1);
  return res.status(204).json();
}

export async function searchTodo(req, res, next) {
  const { q } = req.query;
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(q.toLowerCase())
  );
  return res.status(200).json(filteredTodos);
}
