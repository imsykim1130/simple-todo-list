// variables
const input = document.querySelector("#input");
const btn = document.querySelector("#button");
const list = document.querySelector("#list");
let todoList = JSON.parse(localStorage.getItem("data")) || [];
const clearBtn = document.querySelector("#clear");
const message = document.querySelector(".message");
const cnt = document.querySelector(".count");

// list observer
const observer = new MutationObserver(listCount);

const config = {
  childList: true,
};

observer.observe(list, config);

// event listeners
window.addEventListener("load", render);
btn.addEventListener("click", (e) => {
  const value = input.value;
  const done = false;

  addTodo(value, done);
});
document.addEventListener("keydown", enterKey);
list.addEventListener("dblclick", remove);
list.addEventListener("click", isDone);
clearBtn.addEventListener("click", clear);

// functions
function render() {
  if (todoList.length === 0) return;
  todoList.forEach((list) => {
    showList(list.value, list.done);
  });
  listCount();
}

function showList(value, done) {
  if (value === "") return;
  const todo = document.createElement("li");
  todo.innerHTML = value;
  list.appendChild(todo);
}

function addTodo(value, done) {
  todoList.push({ value: `${value}`, done: done });
  saveToLocalstorage(todoList);
  showList(value);
  setTimeout(() => {
    input.value = "";
  }, 0);
}

function saveToLocalstorage(todoList) {
  localStorage.setItem("data", JSON.stringify(todoList));
}

function remove(event) {
  const lists = [...document.querySelectorAll("li")];
  const index = lists.indexOf(event.target);
  console.log(index);
  todoList.splice(index, 1);
  saveToLocalstorage(todoList);

  setTimeout(() => {
    list.removeChild(event.target);
  }, 0);
}

function enterKey(event) {
  if (event.keyCode === 13) {
    addTodo(input.value, false);
  }
}

function isDone(event) {
  event.target.classList.add();
  const lists = [...document.querySelectorAll("li")];
  const index = lists.indexOf(event.target);
  todoList[index].done = !todoList[index].done;
  event.target.classList.toggle("done");
  saveToLocalstorage(todoList);
}

function clear() {
  localStorage.clear();
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
  todoList.length = 0; // clear todo list
}

function listCount() {
  cnt.innerHTML = todoList.length;
  console.log("change");
}
