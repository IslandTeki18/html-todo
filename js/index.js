const modal = document.getElementById("modal");
const backdrop = document.getElementById("backdrop");
const modalPanel = document.getElementById("modal-panel");

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
function deleteTask(index) {
  let tasks = fetchTasks();
  if (index >= 0 && index < tasks.length) {
    tempTasks = tasks.filter((task) => task !== tasks[index]);
    saveTasks(tempTasks);
    window.location.reload();
  } else {
    console.error("Invalid index provided for deleting task.");
  }
}

// Function to mark a task as complete by index
function markTaskAsComplete(index) {
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
function unmarkTaskAsComplete(index) {
  let tasks = fetchTasks();
  if (index >= 0 && index < tasks.length) {
    tasks[index].isComplete = false;
    saveTasks(tasks);
    window.location.reload();
  } else {
    console.error("Invalid index provided for unmarking task as complete.");
  }
}

// Functino to open modal
function showModal() {
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

// Function to submit task creation form
window.addEventListener("submit", function (event) {
  event.preventDefault();
  let tasks = fetchTasks();
  const taskName = document.getElementById("task-name").value;
  const taskDescription = document.getElementById("task-description").value;
  const taskDate = document.getElementById("task-due-date").value;
  const task = {
    name: taskName,
    description: taskDescription,
    date: taskDate,
    isComplete: false,
  };
  tasks.push(task);
  saveTasks(tasks);
  hideModal();
  this.window.location.reload();
});

function showDropdown(index) {
  const dropdown = document.getElementById(`dropdown-${index}`);
  if (dropdown) {
    dropdown.classList.toggle("hidden");
  }
}

function goToDetails(index) {
  window.location.href = `/html-todo/details.html?id=${index}`;
}

// Function to render tasks
window.addEventListener("DOMContentLoaded", function () {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  let tasks = fetchTasks();
  function displayTasks() {
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("div");
      taskItem.innerHTML = `
      <div class="p-4 ${
        task.isComplete ? "bg-primary" : "bg-secondary"
      } w-full relative text-white">
        <div class="flex flex-col min-h-[96px] justify-between  text-left">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold hover:text-white/80 hover:cursor-pointer ${
              task.isComplete ? "text-black" : "text-white"
            }" onclick="goToDetails(${index})">${task.name}</h3>
            <button class="text-2xl ${
              task.isComplete ? "text-black" : "text-white"
            }" onclick="showDropdown(${index})">...</button>
          </div>
          ${
            task.isComplete
              ? `<p class="text-base ${
                  task.isComplete ? "text-black" : "text-white"
                }">Completed!</p>`
              : `<p class="text-base ${
                  task.isComplete ? "text-black" : "text-white"
                }">Due Date: ${task.date}</p>`
          }
        </div>
        <div id="dropdown-${index}" class="hidden absolute right-10 top-10 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="py-1" role="none">
            <button onclick="deleteTask(${index})" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Delete</button>
            ${
              task.isComplete
                ? `<button onclick="unmarkTaskAsComplete(${index})" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">Unmark Complete</button>`
                : `<button onclick="markTaskAsComplete(${index})" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">Mark Complete</button>`
            }
          </div>
        </div>
      </div>
    `;
      taskList.appendChild(taskItem);
    });
  }
  displayTasks();
});
