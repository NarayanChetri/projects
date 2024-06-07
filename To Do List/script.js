const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");

function addTask() {
    if (inputBox.value == '') {
        alert("you must write something !");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // hexadecimal code for x
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName == "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// store data so it doesn't vanish 
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// show saved data when browser is opened
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
