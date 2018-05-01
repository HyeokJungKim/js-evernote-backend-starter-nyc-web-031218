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
      let titleDiv = document.createElement('div')
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
    let noteDiv = document.createElement('div')
    noteDiv.innerHTML = renderNote(note)
    notesContainer.append(noteDiv)
  }


  const noteForm = document.getElementById("create-new-note")



    noteForm.addEventListener('click', function(e){
      notesContainer.innerHTML = ""
      createForm()
      e.stopPropagation()
    })

    function renderNewForm(){
      return `<form id=new-note>
      Title:<br>
      <input id="titlefield" type="text" name="title" placeholder="Type Here">
      <br>
      Note Body: <br>
      <input id="bodyfield" type="text" name="note" placeholder="Type Here">
      <br>
      <input type="submit" value="Submit">
      </form>`
    }

    function createForm(){
      let formDiv = document.createElement('div')
      formDiv.innerHTML = renderNewForm()
      notesContainer.append(formDiv)
      let titleField = document.getElementById('titlefield')
      let bodyField = document.getElementById('bodyfield')
      formDiv.addEventListener("submit", (e) => {
        e.preventDefault()
        let data = {title: `${titleField.value}`, body:`${bodyField.value}`, user_id: 1}
        fetch('http://localhost:3000/api/v1/notes', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
          body: JSON.stringify(data)})
            .then(resp => resp.json())
            .then(json => {
              let titleDiv = document.createElement('div')
              titleDiv.innerHTML = renderTitle(json)
              debugger
              titleContainer.append(titleDiv)
            })
        })
      }

    // fetch('http://localhost:3000/api/v1/notes/' ){
    // method: 'POST',
    // body: JSON.stringify(),
    // headers: {'Content-Type': 'application/json'}
    //   .then(resp => resp.json())
    //   .then(json => console.log(resp))}


})
