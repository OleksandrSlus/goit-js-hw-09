const ref ={
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector("button[data-stop]"),
    bodyEl: document.body

}
let timerId = null
ref.stopBtn.disabled = true;
function changeColor() {
    ref.startBtn.disabled = true;
    ref.stopBtn.disabled = false;
    timerId = setInterval(() => {
        ref.bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);

}
ref.startBtn.addEventListener('click', changeColor)

const stopChangeColor = () =>{
    ref.startBtn.disabled = false;
    ref.stopBtn.disabled = true;
        clearInterval(timerId);
    
}
ref.stopBtn.addEventListener('click', stopChangeColor)

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
