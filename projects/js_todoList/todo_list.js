// Selectors:
const todoInput = document.querySelector(`.todo-input`);
const todoBtn = document.querySelector(`.todo-btn`);
const todoList = document.querySelector(`.todo-list`);



// Event Listners:
document.addEventListener(`DOMContentLoaded`, getTodos);

todoBtn.addEventListener(`click`, addTodo);
todoList.addEventListener(`click`, deleteCheck);




// Functions:
function addTodo(run) {
    run.preventDefault();//prevent the page keeps refreshing(due to form submitting)

    // !Create todo div
    const todoContainer = document.createElement(`div`);
    todoContainer.classList.add(`todo`);

    // Create li
    const newTodo = document.createElement(`li`);
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add(`todo-item`);
    todoContainer.appendChild(newTodo);

    // !add todo to local storage
    saveLocalTodos(todoInput.value);


    //Check mark button
    const completedButton = document.createElement(`button`);
    completedButton.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
    completedButton.classList.add(`complete-btn`);
    todoContainer.appendChild(completedButton);


    //Check delete button
    const deleteButton = document.createElement(`button`);
    deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    deleteButton.classList.add(`delete-btn`);
    todoContainer.appendChild(deleteButton);


    //Append todo div to the list
    todoList.appendChild(todoContainer);


    //clear todo input value
    todoInput.value = "";
}



// Delete button
function deleteCheck(e) {
    const item = e.target; //targeted point = item

    //delete todo
    if (item.classList[0] === `delete-btn`) {
        const list = item.parentElement;
        removeLocalTodos(list); //remove it from local strage
        list.remove()
    }

    //check mark
    if (item.classList[0] === `complete-btn`) {
        const list = item.parentElement;
        list.classList.toggle(`completed`);
    }
}



// Save the list to the local storage
function saveLocalTodos(todo) {
    //check! do I already have thing in there?
    let todos;
    if (localStorage.getItem(`todos`) === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem(`todos`));
    }
    todos.push(todo);
    localStorage.setItem(`todos`, JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem(`todos`) === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem(`todos`));
    }
    todos.forEach(function (todo) {
        const todoContainer = document.createElement(`div`);
        todoContainer.classList.add(`todo`);

        //Create li
        const newTodo = document.createElement(`li`);
        newTodo.innerHTML = todo;
        newTodo.classList.add(`todo-item`);
        todoContainer.appendChild(newTodo);

        //Check mark button
        const completedButton = document.createElement(`button`);
        completedButton.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
        completedButton.classList.add(`complete-btn`);
        todoContainer.appendChild(completedButton);

        //Check delete button
        const deleteButton = document.createElement(`button`);
        deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
        deleteButton.classList.add(`delete-btn`);
        todoContainer.appendChild(deleteButton);

        //Append todo Div to the list
        todoList.appendChild(todoContainer);

    })
}


// Delete lists from the local storage
function removeLocalTodos(todo) {
    //check! do I already have thing in there?
    let todos;
    if (localStorage.getItem(`todos`) === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem(`todos`));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem(`todos`, JSON.stringify(todos));
}




/* filter : not working
const filterOption = document.querySelector(`.filter-todo`);
filterOption.addEventListener(`click`, filterTodo);
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "checked":
                if (todo.classList.contains(`checked`)) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = `none`;
                }
                break;
            case "unchecked":
                if (!todo.classList.contains(`unchecked`)) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = `none`;
                }
                break;
        }
    });
}
*/



