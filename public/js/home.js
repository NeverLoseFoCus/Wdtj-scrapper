const checkbox = document.getElementById("checkbox-toggle")
const note = document.querySelector(".note")

checkbox.addEventListener("input", () => {
    note.classList.toggle("show")
})