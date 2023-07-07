import "./styles.css";

// get DOM elements (make into a function to deam with DOM manipulation)

const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");

const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitleElement = document.querySelector("[data-list-title]");
const taskCountElement = document.querySelector("[data-list-count]");
const taskContainer = document.querySelector("[data-tasks]");
const taskTemplate = document.getElementById("task-template");
const newTaskForm = document.querySelector("[data-new-task-form]");
const newTaskInput = document.querySelector("[data-new-task-input]");
const clearCompleteTasksButton = document.querySelector(
  "[data-clear-complete-tasks-button"
);

const LOCAL_STORAGE_LIST_KEY = "project.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "project.selectedListId";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

listsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

taskContainer.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const taskDiv = e.target.closest(".task");
    const label = taskDiv.querySelector("label");
    if (e.target.checked) {
      taskDiv.classList.add("task-div");
    } else {
      taskDiv.classList.remove("task-div");
    }
  }

  if (e.target.type === "checkbox") {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(
      (task) => task.id === e.target.id
    );
    selectedTask.complete = e.target.checked;
    save();
    renderTaskCount(selectedList);
  }
  if (e.target.type === "date") {
    console.log(e.target.value);
    const selectedList = lists.find((list) => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(
      (task) => task.id === e.target.id
    );
    selectedTask.date = e.target.value;
    save();
  }
});

clearCompleteTasksButton.addEventListener("click", (e) => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
  saveAndRender();
});

deleteListButton.addEventListener("click", (e) => {
  // set list equal to new list, minus the active project when delete button is pressed
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});

newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectName = newListInput.value;
  if (projectName == null || projectName === "") {
    return;
  } // early return if blank
  const list = createList(projectName);
  newListInput.value = null;
  lists.unshift(list);
  saveAndRender();
});

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  const taskDate = "";
  if (taskName == null || taskName === "") {
    return;
  } // early return if blank
  const task = createTask(taskName, taskDate);
  newTaskInput.value = null; // reset the form input
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
});

function createList(name) {
  return { id: Date.now().toString(), name, tasks: [] };
}
function createTask(name, date) {
  return {
    id: Date.now().toString(),
    name,
    complete: false,
    dueDate: date,
  };
}

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render() {
  clearElement(listsContainer);
  renderLists();

  const selectedList = lists.find((list) => list.id === selectedListId);
  if (!selectedListId || !selectedList) {
    listDisplayContainer.style.display = "none";
  } else {
    listDisplayContainer.style.display = "";
    listTitleElement.textContent = selectedList.name || "";
    renderTaskCount(selectedList);
    clearElement(taskContainer);
    renderTasks(selectedList);
  }
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach((task) => {
    // render the template in html for each task in list
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkBox = taskElement.querySelector(".checkbox");
    const dateInput = taskElement.querySelector(".date-input");
    const theTask = taskElement.querySelector(".task");
    checkBox.id = task.id;
    checkBox.checked = task.complete;
    dateInput.id = task.id;
    dateInput.setAttribute("data", "data-input-due-date");
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    dateInput.value = task.date;
    label.append(task.name);
    if (checkBox.checked) {
      theTask.classList.add("task-div");
    } else {
      theTask.classList.remove("task-div");
    }

    taskContainer.appendChild(taskElement);
  });
}

function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  taskCountElement.textContent = `${incompleteTaskCount} ${taskString} remaining`;
}

function renderLists() {
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.textContent = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    listsContainer.appendChild(listElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/* newTaskInput.addEventListener("focus", () => {
  console.log("inputting");
  const thisButton = document.querySelector("button");
  thisButton.classList.add("show");
}); */

render();
