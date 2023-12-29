import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playing-around-17c5e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const notesAppinDB = ref(database, "notesList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const notesList = document.getElementById("notes-list")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    push(notesAppinDB, inputValue)
    clearInputField()
})


onValue(notesAppinDB, function (snapshot) {


    if (snapshot.exists()) {

        let itemsArray = Object.entries(snapshot.val())


        clearNotesList()

        for (let i = 0; i < itemsArray.length; i++) {

            let currentItem = itemsArray[i]

            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            notesListValues(currentItem)
        }
    } else {
        notesList.innerHTML = `<p> No items here... yet </p>`
    }



})


function clearNotesList() {
    notesList.innerHTML = ""
}


function clearInputField() {
    inputFieldEl.value = ""
}


function notesListValues(item) {
    // groceryList.innerHTML += `<li>${itemValue}</li>`

    // console.log(item)

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `notesList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    notesList.append(newEl)
}