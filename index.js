const form = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')

const LOCALSTORAGE_TODOS_KEY = 'TODOS'

/**
 * @typedef {Object} Todo
 * @property {number} id - The ID of the todo.
 * @property {string} title - The title of the todo.
 */

/** @type {Todo[]} */
let todos = []

initialize()

function initialize() {
  const localStorageTodos = restoreTodoList()

  if (localStorageTodos && localStorageTodos.length > 0) {
    todos = localStorageTodos
    renderTodoList()
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    /**
     * @type {Todo}
     */
    const todoObject = {
      title: todoInput.value,
      id: new Date().getTime(),
    }
    todos.push(todoObject)

    localStorage.setItem(LOCALSTORAGE_TODOS_KEY, JSON.stringify(todos))
    todoInput.value = ''

    renderTodoList()
  })
}

function restoreTodoList() {
  const localStorageTodos = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_TODOS_KEY)
  )

  return localStorageTodos
}

function renderTodoList() {
  if (todoList.hasChildNodes()) todoList.innerHTML = ''

  todos.forEach((todoObject) => {
    todoList.appendChild(getTodo(todoObject))
  })
}

/**
 * @param {Todo} todoObject
 * @returns {HTMLLIElement}
 */
function getTodo(todoObject) {
  const todo = document.createElement('li')

  const span = document.createElement('span')
  span.textContent = todoObject.title
  span.addEventListener('click', function () {
    span.classList.toggle('done')
  })

  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('todo-button-container')

  const deleteButton = document.createElement('button')
  deleteButton.textContent = '삭제하기'
  deleteButton.addEventListener('click', function () {
    const targetTodoIndex = todos.findIndex((todo) => todo.id === todoObject.id)
    todos.splice(targetTodoIndex, 1)
    localStorage.setItem(LOCALSTORAGE_TODOS_KEY, JSON.stringify(todos))

    renderTodoList()
  })

  const updateButtonContainer = document.createElement('div')
  const updateButton = document.createElement('button')
  updateButton.textContent = '수정하기'

  function handleClickUpdateButton() {
    const updateInput = document.createElement('input')
    updateInput.type = 'text'
    updateInput.placeholder = '할 일을 다시 입력해주세요.'

    updateButtonContainer.insertBefore(updateInput, updateButton)

    updateButton.removeEventListener('click', handleClickUpdateButton)

    updateButton.addEventListener('click', function () {
      const targetTodoIndex = todos.findIndex(
        (todo) => todo.id === todoObject.id
      )
      todos[targetTodoIndex].title = updateInput.value
      localStorage.setItem(LOCALSTORAGE_TODOS_KEY, JSON.stringify(todos))

      renderTodoList()
    })
  }

  updateButton.addEventListener('click', handleClickUpdateButton)
  updateButtonContainer.appendChild(updateButton)
  updateButtonContainer.classList.add('todo-update-button-container')

  buttonContainer.appendChild(deleteButton)
  buttonContainer.appendChild(updateButtonContainer)

  todo.appendChild(span)
  todo.appendChild(buttonContainer)

  return todo
}
