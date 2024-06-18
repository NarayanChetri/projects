let runs = document.querySelector("#runs");
let overs = document.querySelector("#overs");
let wickets = document.querySelector("#wickets");
let one = document.querySelector("#one");
let two = document.querySelector("#two");
let three = document.querySelector("#three");
let four = document.querySelector("#four");
let five = document.querySelector("#five");
let six = document.querySelector("#six");
let dot = document.querySelector("#dot");
let wicket = document.querySelector("#wicket");
let wide = document.querySelector("#wide");
let no_ball = document.querySelector("#no_ball");
let ball = document.querySelector("#ball");
let detail = document.querySelector(".detail");

let r = 0;
let w = 0;
let b = 0;
let o = 0;

// Function to save data to local storage
function saveData() {
    localStorage.setItem('runs', r);
    localStorage.setItem('wickets', w);
    localStorage.setItem('balls', b);
    localStorage.setItem('overs', o);
}

// Function to load data from local storage
function loadData() {
    r = parseInt(localStorage.getItem('runs')) || 0;
    w = parseInt(localStorage.getItem('wickets')) || 0;
    b = parseInt(localStorage.getItem('balls')) || 0;
    o = parseInt(localStorage.getItem('overs')) || 0;

    runs.innerText = r;
    wickets.innerText = w;
    ball.innerText = b;
    overs.innerText = o;
}

// Load data from local storage when the page loads
window.onload = loadData;

one.addEventListener("click", () => {
    r += 1;
    runs.innerText = r;
    b++;
    ball.innerText = b;
    if (b === 6) {
        o += 1;
        ball.innerText = 0;
        b = 0;
        overs.innerText = o;
    }
    saveData();
});

two.addEventListener("click", () => {
    r += 2;
    runs.innerText = r;
    b++;
    ball.innerText = b;
    if (b === 6) {
        o += 1;
        ball.innerText = 0;
        b = 0;
        overs.innerText = o;
    }
    saveData();
});

three.addEventListener("click", () => {
    r += 3;
    runs.innerText = r;
    b++;
    ball.innerText = b;
    if (b === 6) {
        o += 1;
        ball.innerText = 0;
        b = 0;
        overs.innerText = o;
    }
    saveData();
});

four.addEventListener("click", () => {
    r += 4;
    runs.innerText = r;
    b++;
    ball.innerText = b;
    if (b === 6) {
        o += 1;
        ball.innerText = 0;
        b = 0;
        overs.innerText = o;
    }
    saveData();
});

five.addEventListener("click", () => {
    r += 5;
    runs.innerText = r;
    b++;
    ball.innerText = b;
    if (b === 6) {
        o += 1;
        ball.innerText = 0;
        b = 0;
        overs.innerText = o;
    }
    saveData();
});

six.addEventListener("click", () => {
    r += 6;
    runs.innerText = r;
    b++;
    ball.innerText = b;
    if (b === 6) {
        o += 1;
        ball.innerText = 0;
        b = 0;
        overs.innerText = o;
    }
    saveData();
});

dot.addEventListener("click", () => {
    b++;
    ball.innerText = b;
    if (b === 6) {
        o += 1;
        ball.innerText = 0;
        b = 0;
        overs.innerText = o;
    }
    saveData();
});

wide.addEventListener("click", () => {
    r += 1;
    runs.innerText = r;
    saveData();
});

no_ball.addEventListener("click", () => {
    r += 1;
    runs.innerText = r;
    saveData();
});

wicket.addEventListener("click", () => {
    w += 1;
    wickets.innerText = w;
    b++;
    ball.innerText = b;
    if (b === 6) {
        o += 1;
        ball.innerText = 0;
        b = 0;
        overs.innerText = o;
    }
    if (w === 10) {
        alert('All out');
        w = 0;
        wickets.innerText = w;
    }
    saveData();
});
