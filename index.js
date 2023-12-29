let myNotes = []
let inputFieldEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-button")
const deleteBtn = document.getElementById("delete-button")
const ulEl = document.getElementById("notes-list")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myNotes"))



if (leadsFromLocalStorage) {
    myNotes = leadsFromLocalStorage
    render(myNotes)
}



function render(notes) {
    ulEl.innerHTML = ""
    for (let i = 0; i < notes.length; i++) {
        const liElement = document.createElement('li')      // <li></li>
        liElement.classList = "note-single"                 // <li class="note-single"></li>
        liElement.innerText = notes[i]                      // <li class="note-single">bread</li>
        ulEl.appendChild(liElement)

        liElement.addEventListener('click', function () {
            const clickedNote = notes[i];
            // Remove the clicked note from localStorage
            // const newNotes = myNotes.filter(note => note !== clickedNote);
            let newNotes = []
            for (let j = 0; j < myNotes.length; j++) {
                if (myNotes[j] !== clickedNote) {
                    newNotes.push(myNotes[j])
                }
            }
            myNotes = newNotes
            localStorage.setItem("myNotes", JSON.stringify(newNotes));
            render(newNotes)
        })
    }
}





deleteBtn.addEventListener("click", function () {
    localStorage.clear()
    myNotes = []
    render(myNotes)
})



addBtn.addEventListener("click", function () {
    myNotes.push(inputFieldEl.value)
    inputFieldEl.value = ""

    localStorage.setItem("myNotes", JSON.stringify(myNotes))
    render(myNotes)
})
