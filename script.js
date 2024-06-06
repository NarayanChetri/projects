var btn = document.querySelector("#modeToggle");

btn.addEventListener('click',()=> {

document.body.classList.toggle("dark-theme");
if(document.body.classList.contains("dark-theme"))
    {
    
       btn.style.backgroundColor="orange";
       btn.innerText="LIGHT MODE";

    }
else
{
    btn.style.backgroundColor="AQUA";
    btn.innerText="DARK MODE";
}

})