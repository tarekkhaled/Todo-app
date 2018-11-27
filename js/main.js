'use strict'
var todos = getSavedTodos()

console.log(uuidv4())
const filters = {
  searchText : '' ,
  checked : false
}


//make the filter job
renderTodo(todos,filters)

document.getElementById('filter-todo').addEventListener('input' , function(e) {
  filters.searchText = e.target.value ;
  renderTodo(todos,filters);
})

//listen to submit button and push it to our array
document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();
  let newTodo = e.target.elements.text.value
  todos.push({
    id : uuidv4() ,
    text : newTodo ,
    completed : false
  })
  saveTodos(todos)
  renderTodo(todos,filters)
  e.target.elements.text.value = ''
})



// listen for checkbox when it's checked
document.querySelector('#checked').addEventListener('change' , function(e){
  filters.checked = e.target.checked
  renderTodo(todos,filters)

})
