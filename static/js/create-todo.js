const newTodo = document.getElementById('new-todo')
let id = parseInt(listToDo.firstElementChild.id.slice(5)) + 1
console.log(id);

if(newTodo) {
    newTodo.addEventListener('keyup', e => {
        if(newTodo.value.trim().length > 0) {
            if(e.key == 'Enter') {
                const toDo = document.createElement('li')
                const toDoCircle = document.createElement('div')
                const toDoText = document.createElement('p')
                const toDoImg = document.createElement('img')

                const fragment = document.createDocumentFragment()

                toDo.classList.add('todo-item')
                toDo.setAttribute('data-status', 'active')
                toDo.setAttribute('draggable', true)
                toDo.setAttribute('id', `item-${id}`)
                
                toDoCircle.classList.add('todo-circle')
                
                toDoText.classList.add('todo-text')
                toDoText.textContent = newTodo.value

                toDoImg.classList.add('todo-img')
                toDoImg.src = '/static/img/icon-cross.svg'
                toDoImg.alt = 'Drop Item'

                fragment.append(toDoCircle, toDoText, toDoImg)
                toDo.append(fragment)

                listToDo.prepend(toDo)

                itemsLeft()

                if(toDoCircle){
                    toDoCircle.addEventListener('click', () => {
                        completedToDo(toDoCircle)
                        itemsLeft()
                    })
                }
                
                if(toDoImg){
                    toDoImg.addEventListener('click', () => {
                        deleteToDo(toDoImg)
                        itemsLeft()
                    })
                }

                if(toDo) {
                    dragToDo(toDo)
                }

                newTodo.value = ''
                id++
            }
        }
    })
}