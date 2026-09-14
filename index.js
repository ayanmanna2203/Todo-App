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
const formBtn = document.querySelector("#form-btn")
const taskCount = document.querySelector("#task-count")
const completeCount = document.querySelector("#complete-count")

let editTodoid = null;




todoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const todovalue = todoinput.value.trim();
    // todos.push(todovalue)
    // let newtodo = {
    //     id: Date.now(),
    //     text: todovalue,
    //     isCompleted: false
    // }

    if(!todovalue){
        return
    }
     if(editTodoid){
        todos = todos.map((todo)=>{
            if(todo.id === Number(editTodoid)){
                return{
                    ...todo,
                    text: todovalue
                }
            }
            return todo
        })
    }
    else{
           let newtodo = {
        id: Date.now(),
        text: todovalue,
        isCompleted: false
    }
     todos.push(newtodo)
    }
   todoinput.value = ""
    rendertodo();

    

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
                        <p class="flex-1 ${todo.isCompleted ? "line-through":""} ">${todo.text}</p>
                        </div>
                        <div class="flex gap-2 flex-wrap">
                            <button data-action="edit" data-id=${todo.id}>Edit</button>
                            <button data-action="delete" data-id=${todo.id}>Delete</button>
                        </div>
    `

    todoList.append(li)
    taskCount.textContent = `TASKS(${todos.length})`
    completeCount.textContent = `COMPLETED:${todos.filter((todo)=> todo.isCompleted).length}`

}

todoList.addEventListener('click', (e) => {
    let li = e.target.closest('li')
    let btn = e.target.closest('button')
    let action = e.target.dataset.action;
    let id = li.dataset.id;
    let checkbox= e.target.closest('input[type ="checkbox"]')
    // console.log(id);
    // console.log(checkbox);

    if (action === "edit") {
        // console.log("editing...");
        // let currentTodo = todos.find((todo)=>{
        //     if(todo.id === Number(id)){
        //         return todo
        //     }
        // })

        // todoinput.value = currentTodo.text

        // formBtn.textContent ="update"

        startEdit(id)
        // formBtn.textContent="Add"

    }
    if (action === "delete") {
        deletTodo(e, id)
        // rendertodo();
    }

    if (action === "toggle") {
        // console.log(action);
        todos = todos.map((todo) => {
            if (todo.id === Number(id)) {
                return {
                    ...todo,
                    isCompleted:!todo.isCompleted   
                }

            }
            // console.log(todos);
            return todo;

        })
        rendertodo()
        // formBtn.textContent="Add"
        // console.log(todos);
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

function startEdit(id){
   editTodoid = id;
    let currentTodo = todos.find((todo)=>{
            if(todo.id === Number(id)){
                return todo
            }
        })

        todoinput.value = currentTodo.text

        formBtn.textContent ="update"

 
}




// console.log(todos);