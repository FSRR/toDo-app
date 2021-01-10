const newTodo = document.getElementById('new-todo')
const listToDo = document.getElementById('list-todo')

if(newTodo) {
    newTodo.addEventListener('keyup', e => {
        if(newTodo.value) {
            if(e.key == 'Enter') {
                const toDo = document.createElement('li')
                const toDoCircle = document.createElement('div')
                const toDoText = document.createElement('p')
                const toDoImg = document.createElement('img')

                const fragment = document.createDocumentFragment()

                toDo.classList.add('todo-item')
                toDo.setAttribute('data-all', 'all')
                toDo.setAttribute('data-active', 'active')

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

                newTodo.value = ''
            }
        }
    })
}

const completedToDo = (item) => {
    item.classList.toggle('todo-completed')
    item.nextElementSibling.classList.toggle('todo-completed')

    if(item.parentElement.getAttribute('data-completed')) {
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
    Array.from(listToDo.children).filter(item => item.getAttribute(`data-${target.getAttribute('data-status')}`)).map(item => item.classList.remove('todo-hide-item'))
    Array.from(listToDo.children).filter(item => !item.getAttribute(`data-${target.getAttribute('data-status')}`)).map(item => item.classList.add('todo-hide-item'))

    Array.from(filter.children).find(item => item.classList.item(0) == 'filter-selected').classList.replace('filter-selected', 'filter-hover')
    target.classList.replace('filter-hover', 'filter-selected')
}

const cleanCompleted = document.getElementById('clean-completed')

if(cleanCompleted) {
    cleanCompleted.addEventListener('click', () => {
        Array.from(listToDo.children).filter(item => item.getAttribute('data-completed')).map(item => listToDo.removeChild(item))
    })
}

const itemsLeft = () => {
    const itemLeft = Array.from(listToDo.children).filter(item => item.getAttribute('data-active')).length
    document.getElementById('items-left').textContent = `${itemLeft} items left`
}