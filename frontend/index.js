document.addEventListener('DOMContentLoaded', () => {

  const titleContainer = document.getElementById("title-container")
  const notesContainer = document.getElementById("notes-container")
  var notes = []

  //find ID in notes
  function findById(array, id) {
    return array.filter(note => note.id == id)[0]
  }

  //index
  fetch('http://localhost:3000/api/v1/notes/')
    .then(resp => resp.json())
    .then(json => {json.forEach(n=>notes.push(n)) ;createTitles(json)})

  function createTitles(json){
    json.forEach(note => {
      const titleDiv = document.createElement('div')
      titleDiv.innerHTML = renderTitle(note)
      titleContainer.append(titleDiv)
    })
  }

  function renderTitle(note){
    return `<a id =${note["id"]}>${note["title"]} </a>`
  }
  //show

  titleContainer.addEventListener('click', (event) => {
    notesContainer.innerHTML = " "
    if(event.target.tagName == "A"){
      let note = findById(notes, event.target.id)
      createNotes(note)}
  })

  function renderNote(note){
    return `<div id=${note["id"]}><h3> Title: ${note["title"]} </h3><br> <p> Body: ${note["body"]}</p><br><p>User: ${note["user"]["name"]}</p></div>`
  }

  function createNotes(note){
    const noteDiv = document.createElement('div')
    noteDiv.innerHTML = renderNote(note)
    notesContainer.append(noteDiv)
  }








})
