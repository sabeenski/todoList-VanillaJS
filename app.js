// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

// Functions
function addTodo(event) {
  // 1. create new div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // 2. create new li element
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // add todo to localstorage
  saveLocalTodos(todoInput.value);
  // checkmark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  // delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
  deleteButton.classList.add('trash-btn');
  todoDiv.appendChild(deleteButton);

  // finally append everything to the ul tag ( todo-list)
  todoList.appendChild(todoDiv);

  //clear todoInput value
  todoInput.value = '';
}

function deleteCheck(e) {
  console.log(e.target);
  const item = e.target;
  console.log('item', item);
  // delete todo
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    console.log('todo', todo.childNodes);
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  // checkmark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  console.log(e);
  const todos = todoList.childNodes;
  console.log(todos);
  todos.forEach(function (todo) {
    console.log('todo::', todo);
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // check --anything already exist there?
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach((todo) => {
    // 1. create new div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // 2. create new li element
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
    deleteButton.classList.add('trash-btn');
    todoDiv.appendChild(deleteButton);

    // finally append everything to the ul tag ( todo-list)
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  console.log(todo.children[0].innerText);
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
