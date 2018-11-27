'use strict'
// Get the Data from localStorage if exists or [] if not exists
const getSavedTodos  = () =>{
  const todosJSON = localStorage.getItem('todos')  // get savedData on the shape of "string"
  try {
    return todosJSON ? JSON.parse(todosJSON) : []
  } catch (e) {
    return []  // to take care if there is invaild data in localstorage like [
  }

}

// Save the Data to localstorage
function saveTodos(todos) {
localStorage.setItem('todos', JSON.stringify(todos))


}

// Render Todo for every Change happen
const renderTodo =  (todos , filters)=> {
  let filteredTodos  = todos.filter(function(todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  })

  filteredTodos = filteredTodos.filter((todo)=> {
    return  !filters.checked || !todo.completed
  })

  const incompletedTodos = filteredTodos.filter(function(filtertodo){
    return !filtertodo.completed // h return al false ! true = false
  })
  document.querySelector('#results').innerHTML = ''

  document.querySelector('#results').appendChild(generateSummaryDom(incompletedTodos))


  filteredTodos.forEach(function (todo) {
    document.querySelector('#results').appendChild(generateTodoDom(todo))
  })
}

//Create the function of remove
const removeTodo = function (id) {
  const removeIndex  = todos.findIndex((todo) =>{
    return todo.id = id // check the id entered the same id for this todo or not ?
  })
  if(removeIndex > -1) // this is mean he already found the index
  {
    todos.splice(removeIndex , 1) // splice will delete the item from array
  }
}

//toggle the completed value for a given todo
const toggleTodo =  (id)=> {
  const todo = todos.find((todo)=> todo.id === id)
  if (todo) {
    todo.completed  = !todo.completed // change the new .completeted for this object find make this job for us
  }
}


//generate the Dom to shown up on the screen
const generateTodoDom = (todo) => {
  const elGrand = document.createElement('div')
  elGrand.id="todos"
  const elParent = document.createElement('label') // the parent element
  elParent.classList.add("list-item")
  const elDiv = document.createElement('div') // create div inside the label to conatin input
  elDiv.setAttribute("class", "list-item-container")
  const elCheck = document.createElement('input') // check if completed or not
  elCheck.classList.add('check-sign') // give class to input to make access easy from style.css
  const elPharagrahp = document.createElement('span') // just make span to put in it the name of todo
  elPharagrahp.classList.add("title-section") // give class to span to make access easy from style.css
  const elRemove = document.createElement('button') // button to remove the checkbox
  elPharagrahp.textContent = todo.text // set the name of todo
  elRemove.textContent = 'remove' // set the remove button
  elRemove.setAttribute("class" ,"remove-button")

  elCheck.setAttribute("type", "checkbox") // set Attribute to the previous input
  elGrand.appendChild(elParent)
  elParent.appendChild(elDiv)
  elParent.appendChild(elRemove) // make the remove the thirdChild of the div
  elDiv.appendChild(elCheck) // make the input firstChild of div
  elDiv.appendChild(elPharagrahp) // make the span the secondChild of the div


  //make the checkBox change to true if the completed value are true
  elCheck.checked = todo.completed

  //listen to check box when some one click on it
  elCheck.addEventListener('change' , ()=> {
    toggleTodo(todo.id)
    saveTodos(todos)
    renderTodo(todos,filters)

  })
  //listen for the button called remove
    elRemove.addEventListener('click' , ()=> {
    removeTodo(todo.id)
    saveTodos(todos)
    renderTodo(todos,filters)
  })
  return elParent ;

}

//generate The Summary Dom to shown up on the screen
const generateSummaryDom =  (incompletedTodos)=> {
  const summary = document.createElement('h2')
  summary.textContent = `you have ${incompletedTodos.length} todos left  `
  return summary

}
