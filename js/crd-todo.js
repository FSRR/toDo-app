const newTodo = document.getElementById('new-todo')
const listToDo = document.getElementById('list-todo')
let id = 0

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
                toDo.setAttribute('data-all', 'all')
                toDo.setAttribute('data-active', 'active')
                toDo.setAttribute('draggable', true)
                toDo.setAttribute('id', `item-${id}`)
                
                toDoCircle.classList.add('todo-circle')
                
                toDoText.classList.add('todo-text')
                toDoText.textContent = newTodo.value

                toDoImg.classList.add('todo-img')
                toDoImg.src = 'img/icon-cross.svg'
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
                    toDo.addEventListener('dragstart', e => {
                        e.dataTransfer.setData('text/plain', e.target.id)
                        e.target.classList.add('drag-over')
                    })
                    toDo.addEventListener('dragenter', e => {
                        e.preventDefault()
                        const element = document.getElementById(e.dataTransfer.getData('text'))
                        let indexTarget
                        const indexElement = Array.from(listToDo.children).findIndex(item => item == element)
                        if(e.target != toDo) {
                            indexTarget = Array.from(listToDo.children).findIndex(item => item == e.target.parentElement)
                        } else {
                            indexTarget = Array.from(listToDo.children).findIndex(item => item == e.target)
                        }
                        if(indexElement > indexTarget) listToDo.children[indexTarget].before(element)
                        else listToDo.children[indexTarget].after(element)
                    })
                    toDo.addEventListener('dragover', e => e.preventDefault())
                    toDo.addEventListener('drop', e => {
                        e.preventDefault()
                        if(e.target != toDo) e.target.parentNode.classList.remove('drag-over')
                        else e.target.classList.remove('drag-over')
                    })
                }

                newTodo.value = ''
                id++
            }
        }
    })
}

const completedToDo = (item) => {
    item.classList.toggle('todo-completed')
    item.nextElementSibling.classList.toggle('todo-completed')

    if(item.parentElement.dataset.completed) {
        item.parentElement.removeAttribute('data-completed')
        item.parentElement.setAttribute('data-active', 'active')
    } else {
        item.parentElement.removeAttribute('data-active')
        item.parentElement.setAttribute('data-completed', 'completed')
    }
}

const deleteToDo = (item) => {
    listToDo.removeChild(item.parentElement)
}

const filter = document.getElementById('filter')

if(filter) {
    filter.addEventListener('click', e => {
        if(e.target == filter.children[0]) filters(e.target)
        else if(e.target == filter.children[1]) filters(e.target)
        else if(e.target == filter.children[2]) filters(e.target)
    })
}


const filters = (target) => {
    Array.from(listToDo.children).filter(item => item.dataset[target.dataset.status]).map(item => item.classList.remove('todo-hide-item'))
    Array.from(listToDo.children).filter(item => !item.dataset[target.dataset.status]).map(item => item.classList.add('todo-hide-item'))

    Array.from(filter.children).find(item => item.classList.item(0) == 'filter-selected').classList.replace('filter-selected', 'filter-hover')
    target.classList.replace('filter-hover', 'filter-selected')
}

const cleanCompleted = document.getElementById('clean-completed')

if(cleanCompleted) {
    cleanCompleted.addEventListener('click', () => {
        Array.from(listToDo.children).filter(item => item.dataset.completed).map(item => listToDo.removeChild(item))
    })
}

const itemsLeft = () => {
    const itemLeft = Array.from(listToDo.children).filter(item => item.dataset.active).length
    document.getElementById('items-left').textContent = `${itemLeft} items left`
}

addEventListener('touchstart', console.log('hola'))