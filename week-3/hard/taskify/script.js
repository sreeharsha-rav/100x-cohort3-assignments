let tasks = [
  {
    name: "Complete project report",
    description:
      "Finish the final report for the project and submit it to the manager.",
    type: "IN PROGRESS",
  },
  {
    name: "Team meeting",
    description: "Attend the weekly team meeting to discuss project updates.",
    type: "TODO",
  },
  {
    name: "Code review",
    description: "Review the code submitted by the team and provide feedback.",
    type: "DONE",
  },
  {
    name: "Client presentation",
    description: "Prepare and deliver the presentation to the client.",
    type: "TODO",
  },
  {
    name: "Update documentation",
    description: "Update the project documentation with the latest changes.",
    type: "IN PROGRESS",
  },
];

// function to create task element
function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.draggable = "true";

  const taskTitleDiv = document.createElement("div");
  taskTitleDiv.className = "task-title";

  const taskName = document.createElement("h3");
  taskName.textContent = task.name;

  const taskActionsDiv = document.createElement("div");
  taskActionsDiv.className = "task-actions";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", () => {
    taskDiv.remove();
  });

  taskActionsDiv.appendChild(deleteBtn);
  taskTitleDiv.appendChild(taskName);
  taskTitleDiv.appendChild(taskActionsDiv);

  const taskDescription = document.createElement("p");
  taskDescription.className = "task-description";
  taskDescription.textContent = task.description;

  taskDiv.appendChild(taskTitleDiv);
  taskDiv.appendChild(taskDescription);

  return taskDiv;
}

// function to render tasks
function renderTasks() {
  const todoSection = document.getElementById("todo-section");
  const inProgressSection = document.getElementById("in-progress-section");
  const doneSection = document.getElementById("done-section");

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    if (task.type === "TODO") {
      todoSection.appendChild(taskElement);
    } else if (task.type === "IN PROGRESS") {
      inProgressSection.appendChild(taskElement);
    } else if (task.type === "DONE") {
      doneSection.appendChild(taskElement);
    }
  });
}

renderTasks();
