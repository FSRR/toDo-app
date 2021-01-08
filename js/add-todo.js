console.log('hola');

const newTodo = document.getElementById('new-todo')
const listToDo = document.getElementById('list-todo')

if(newTodo) {
    newTodo.addEventListener('keyup', e => {
        if(e.key == 'Enter') {
            const toDo = document.createElement('li')
            const toDoCircle = document.createElement('div')
            const toDoText = document.createElement('p')
            const toDoImg = document.createElement('img')
    
            const fragment = document.createDocumentFragment()
    
            toDo.classList.add('todo-item')
    
            toDoCircle.classList.add('todo-circle')
            
            toDoText.classList.add('todo-text')
            toDoText.textContent = newTodo.value
    
            toDoImg.classList.add('todo-img')
            toDoImg.src = 'img/icon-cross.svg'
            toDoImg.alt = 'Drop Item'
    
            fragment.append(toDoCircle, toDoText, toDoImg)
            toDo.append(fragment)
    
            listToDo.prepend(toDo)
    
            newTodo.value = ''
        }
    })
}