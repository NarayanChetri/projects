let passwordBox = document.querySelector("#passwordBox");
let length = 8;
const upperCase = "QWERTYUIOPASDFGHJKLZXCVBNM";
const lowerCase ="qwertyuiopasdfghjklzxcvbnm";
const number = "1234567890";
const symbols = "!@#$%^&*()_+?<>:";
const all = upperCase + lowerCase + number + symbols;

// function to generate password

function createPassword()
{
let passwordGenerated = "";
passwordGenerated += upperCase[Math.floor(Math.random()*upperCase.length)];
passwordGenerated += lowerCase[Math.floor(Math.random()*lowerCase.length)];
passwordGenerated += number[Math.floor(Math.random()*number.length)];
passwordGenerated += symbols[Math.floor(Math.random()*symbols.length)];

while(passwordGenerated.length<8)
    {
        passwordGenerated += all[Math.floor(Math.random()*all.length)];
    }

passwordBox.value = passwordGenerated;


}

// function to copy generated password

let copy = document.querySelector("#copy");
copy.addEventListener("click",()=>
{

passwordBox.select();
document.execCommand("copy");
showPopup();

})

  // Function to show popup
  function showPopup() {
    let popup = document.querySelector("#popup");
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000); // Popup will be visible for 2 seconds
}

