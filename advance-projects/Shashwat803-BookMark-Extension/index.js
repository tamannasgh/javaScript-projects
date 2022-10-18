let bookMarks = []
let inputEl = document.getElementById("input-el")
let inputBtn = document.getElementById("input-btn")
let ulEl = document.getElementById("ul-el")
let deleteBtn = document.getElementById("delete-btn")
let saveBtn = document.getElementById("save-btn")


const bookMarksFromLocalStorage = JSON.parse(localStorage.getItem("bookMarks"))

if (bookMarksFromLocalStorage) {
    bookMarks = bookMarksFromLocalStorage
    render(bookMarks)
}

saveBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (!bookMarks.includes(tabs[0].url)) {
            bookMarks.unshift(tabs[0].url)
            localStorage.setItem("bookMarks", JSON.stringify(bookMarks))
            render(bookMarks)
        }
    })
})

function render(bookMark) {
    let listItems = ""
    for (let i = 0; i < bookMark.length; i++) {
        listItems += `<li><a target='_blank' href="${bookMark[i]}"> ${bookMark[i]} </a></li>`
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function () {
    localStorage.clear()
    bookMarks = []
    render(bookMarks)
})

inputBtn.addEventListener("click", function () {
    if (!bookMarks.includes(inputEl.value))
        bookMarks.unshift(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks))
    render(bookMarks)

})

