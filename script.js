let size = 16;

function increaseFont(){
size += 2;
document.body.style.fontSize=size+"px";
}

function decreaseFont(){
size -= 2;
document.body.style.fontSize=size+"px";
}

function toggleContrast(){
document.body.classList.toggle("high-contrast");
}

document
.getElementById("darkBtn")
.addEventListener("click",()=>{

document.body.classList.toggle("dark-mode");

});


document.addEventListener("keydown",function(e){

if(e.key==="d"){
document.body.classList.toggle("dark-mode");
}

if(e.key==="h"){
document.body.classList.toggle("high-contrast");
}

if(e.key==="+"){
increaseFont();
}

});