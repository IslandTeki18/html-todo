const modal = document.getElementById("modal");
const backdrop = document.getElementById("backdrop");
const modalPanel = document.getElementById("modal-panel");

function goBackToList() {
  window.location.href = "index.html";
}

// Function to fetch tasks from localStorage
function fetchTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks;
}

// Function to save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to delete a task by index
function deleteTask() {
  const urlParams = new URLSearchParams(window.location.search);
  const index = urlParams.get("id");
  let tasks = fetchTasks();
  if (index >= 0 && index < tasks.length) {
    tempTasks = tasks.filter((task) => task !== tasks[index]);
    saveTasks(tempTasks);
    window.location.href = "index.html";
  } else {
    console.error("Invalid index provided for deleting task.");
  }
}

// Function to mark a task as complete by index
function markTaskAsComplete() {
  const urlParams = new URLSearchParams(window.location.search);
  const index = urlParams.get("id");
  let tasks = fetchTasks();
  if (index >= 0 && index < tasks.length) {
    tasks[index].isComplete = true;
    saveTasks(tasks);
    window.location.reload();
  } else {
    console.error("Invalid index provided for marking task as complete.");
  }
}

// Function to unmark a task as complete by index
function unmarkTaskAsComplete() {
  const urlParams = new URLSearchParams(window.location.search);
  const index = urlParams.get("id");
  let tasks = fetchTasks();
  if (index >= 0 && index < tasks.length) {
    tasks[index].isComplete = false;
    saveTasks(tasks);
    window.location.reload();
  } else {
    console.error("Invalid index provided for unmarking task as complete.");
  }
}

function getTask() {
  const urlParams = new URLSearchParams(window.location.search);
  const index = urlParams.get("id");
  const tasks = fetchTasks();

  // populate the task title
  const titleElement = document.getElementById("task-title");
  // populate the task description
  const descriptionElement = document.getElementById("task-description");
  // populate the task due date
  const dueDateElement = document.getElementById("task-due-date");
  // populate mark complete button
  const markCompleteButton = document.getElementById("mark-complete-button");

  descriptionElement.innerHTML = tasks[index].description;
  dueDateElement.innerHTML = tasks[index].date;
  titleElement.innerText = tasks[index].name;
  if (tasks[index].isComplete) {
    markCompleteButton.innerText = "Task Completed";
    markCompleteButton.classList.remove("bg-primary", "text-black");
    markCompleteButton.classList.add(
      "border-2",
      "border-primary",
      "text-primary"
    );
    markCompleteButton.onclick = () => unmarkTaskAsComplete(index);
  }
}
getTask();

// Function to populate input fields with task details
function populateTaskDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const index = urlParams.get("id");
  const tasks = fetchTasks();
  const task = tasks[index];
  document.getElementById("input-name").value = task.name;
  document.getElementById("textarea-description").value = task.description;
  document.getElementById("input-due-date").value = task.date;
}

// Functino to open modal
function showModal() {
  populateTaskDetails();
  modal.classList.remove("hidden");
  // Remove classes from backdrop and modal panel
  backdrop.classList.remove("hidden", "ease-in", "duration-200", "opacity-0");
  modalPanel.classList.remove(
    "hidden",
    "ease-in",
    "duration-200",
    "opacity-0",
    "translate-y-4",
    "sm:translate-y-0",
    "sm:scale-95"
  );
  // Add classes to backdrop and modal panel
  backdrop.classList.add("block", "ease-out", "duration-300", "opacity-100");
  modalPanel.classList.add(
    "block",
    "opacity-100",
    "translate-y-0",
    "sm:scale-100"
  );
}

// Function to close modal
function hideModal() {
  // Remove classes from backdrop and modal panel
  backdrop.classList.remove("block", "ease-out", "duration-300", "opacity-100");
  modalPanel.classList.remove(
    "block",
    "opacity-100",
    "translate-y-0",
    "sm:scale-100"
  );
  modal.classList.add("hidden");
  // Add classes to backdrop and modal panel
  backdrop.classList.add("hidden", "ease-in", "duration-200", "opacity-0");
  modalPanel.classList.add(
    "hidden",
    "ease-in",
    "duration-200",
    "opacity-0",
    "translate-y-4",
    "sm:translate-y-0",
    "sm:scale-95"
  );
}

// Function to close modal if user clicks outside the modal content area
window.addEventListener("click", function (event) {
  if (event.target.id === "modal-panel-container") {
    hideModal();
  }
});

// Function to submit task edit form
window.addEventListener("submit", function (event) {
  event.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const index = urlParams.get("id");
  const tasks = fetchTasks();
  const task = tasks[index];

  const title = document.getElementById("input-name").value;
  const desc = document.getElementById("textarea-description").value;
  const dueDate = document.getElementById("input-due-date").value;

  task.name = title || task.name;
  task.description = desc || task.description;
  task.date = dueDate || task.date;

  saveTasks(tasks);

  hideModal();
  this.window.location.reload();
});
