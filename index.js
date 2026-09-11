let todos = [{
    id: Date.now(),
    text: "go to gym",
    isCompleted: false
},
{
    id: Date.now() + 1,
    text: "Revise Web dev",
    isCompleted: false

},
{
    id: Date.now() + 2,
    text: "Attend classes",
    isCompleted: false
}]

const todoForm = document.querySelector("#todoform")
const todoinput = document.querySelector("#todoinput")
const todoList = document.querySelector("#todoList")
// const btn = document.querySelector("button")
todoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const todovalue = todoinput.value;
    todos.push(todovalue)
    let newtodo = {
        id: Date.now(),
        text: todovalue,
        isCompleted: false
    }
    addtodo(newtodo)

})
function rendertodo() {
    todoList.innerHTML = ""
    todos.forEach(function (todo) {
        addtodo(todo)
    })
}

rendertodo();


function addtodo(todo) {
    const li = document.createElement("li")
    // li.textContent = todo.text
    // todoList.append(li)
    li.dataset.id = todo.id
    li.className = `flex justify-between  gap-5 border px-2 rounded-sm py-2 mt-2`
    li.innerHTML = `
      <div class="flex gap-2  flex-wrap ">
                        <input data-action="toggle" type="checkbox" ${todo.isCompleted === true ? 'checked' : ''} data-id=${todo.id}>
                        <p>${todo.text}</p>
                        </div>
                        <div class="flex gap-2 flex-wrap">
                            <button data-action="edit" data-id=${todo.id}>Edit</button>
                            <button data-action="delete" data-id=${todo.id}>Delete</button>
                        </div>
    `

    todoList.append(li)
}

todoList.addEventListener('click', (e) => {
    let li = e.target.closest('li')
    let btn = e.target.closest('button')
    let action = btn?.dataset.action;
    let id = btn?.dataset.id;
    let checkbox = e.target.closest('input[type ="checkbox"]')
    console.log(checkbox);

    if (action === "edit") {
        console.log("editing...");
    }
    if (action === "delete") {
        deletTodo(e, id)
        // rendertodo();
    }

    if (checkbox) {
        todos = todos.map((todo) => {
            if (todo.id === Number(id)) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }

            }

            return todo

        })
    }
})

function deletTodo(e, id) {
    e.target.closest('li').remove()
    todos = todos.filter((todo) => {
        if (todo.id !== Number(id)) {
            return todo
        }
    })


}


