//selectors//

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filteroption = document.querySelector(".filter-todo");

//event listeners//
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filteroption.addEventListener("click", filtertodo);

//functions//

function addTodo(event) {
  //stop form from submiting//
  event.preventDefault();
  //todo div//
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create LI//
  const newList = document.createElement("li");
  newList.innerText = todoInput.value;
  newList.classList.add("todo-item");
  todoDiv.appendChild(newList);
  //add todo to localstorage//
  saveLocalTodos(todoInput.value);
  //check mark button//
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //check trash button//
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //append to list//
  todoList.appendChild(todoDiv);
  //clear todo input value//
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //Delete Todo//
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //animation//
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filtertodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        }
        else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        }
        else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo){
   const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create LI//
  const newList = document.createElement("li");
  newList.innerText = todo;
  newList.classList.add("todo-item");
  todoDiv.appendChild(newList);
 
  //check mark button//
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //check trash button//
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //append to list//
  todoList.appendChild(todoDiv);
  
  });
}

function removeLocalTodos(todo){
  //check --hey i already have things in here?//
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem("todos",JSON.stringify(todos));

}



