const listToDo = document.getElementById('list-todo')
const saveData = document.getElementById('save-data')

if(saveData) {
    saveData.addEventListener('click', () => {
        let changes = []
        for(const item of Array.from(listToDo.children)) {
            const data = {
                id: item.id,
                task: item.textContent.trim(),
                status: item.dataset.status
            }
            changes.push(data)
        }

        const data = {
            id: listToDo.dataset.user,
            tasks: changes
        }

        fetch('/sendData', {
            method: 'POST',
            body: JSON.stringify(data, null, 2),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => console.log(res))
    })
}

// Funciones de cada to-Do
const dragToDo = item => {
    if(item) {
        item.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', e.target.id)
            e.target.classList.add('drag-over')
        })
        item.addEventListener('dragenter', e => {
            e.preventDefault()
            const element = document.getElementById(e.dataTransfer.getData('text'))
            let indexTarget
            const indexElement = Array.from(listToDo.children).findIndex(item => item == element)
            if(e.target != item) {
                indexTarget = Array.from(listToDo.children).findIndex(item => item == e.target.parentElement)
            } else {
                indexTarget = Array.from(listToDo.children).findIndex(item => item == e.target)
            }
            if(indexElement > indexTarget) listToDo.children[indexTarget].before(element)
            else listToDo.children[indexTarget].after(element)
        })
        item.addEventListener('dragover', e => e.preventDefault())
        item.addEventListener('drop', e => {
            e.preventDefault()
            if(e.target != item) e.target.parentNode.classList.remove('drag-over')
            else e.target.classList.remove('drag-over')
        })
    }
}

const completedToDo = (item) => {
    item.classList.toggle('todo-completed')
    item.nextElementSibling.classList.toggle('todo-completed')
    if(item.parentElement.dataset.status === 'completed') {
        item.parentElement.dataset.status = 'active'
    } else {
        item.parentElement.dataset.status = 'completed'
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
        else if(e.target == filter.children[2]) filters( e.target)
    })
}


const filters = (target) => {
    Array.from(listToDo.children).filter(item => target.dataset.status == item.dataset.status || target.dataset.status == 'all').map(item => item.classList.remove('todo-hide-item'))
    Array.from(listToDo.children).filter(item => !(target.dataset.status == item.dataset.status || target.dataset.status == 'all')).map(item => item.classList.add('todo-hide-item'))

    Array.from(filter.children).find(item => item.classList.item(0) == 'filter-selected').classList.replace('filter-selected', 'filter-hover')
    target.classList.replace('filter-hover', 'filter-selected')
}

const cleanCompleted = document.getElementById('clean-completed')

if(cleanCompleted) {
    cleanCompleted.addEventListener('click', () => {
        Array.from(listToDo.children).filter(item => item.dataset.status === 'completed').map(item => listToDo.removeChild(item))
    })
}

const itemsLeft = () => {
    const itemLeft = Array.from(listToDo.children).filter(item => item.dataset.status === 'active').length
    document.getElementById('items-left').textContent = `${itemLeft} items left`
}


//Asignar a todos los to-Do eventos
Array.from(listToDo.children).map(item => { 
    dragToDo(item)
    
    if(item.firstElementChild) {
        item.firstElementChild.addEventListener('click', () => {
            completedToDo(item.firstElementChild)
            itemsLeft()
        })
    }
    if(item.lastElementChild) {
        item.lastElementChild.addEventListener('click', () => {
            deleteToDo(item.lastElementChild)
            itemsLeft()
        })
    }
})