let container = document.querySelector(".container");
let gridBtn = document.querySelector("#gridBtn");
let colorBtn = document.querySelector("#colorBtn");
let rainbowBtn = document.querySelector("#rainbowBtn");
let shadeBtn = document.querySelector("#shadeBtn");
let eraserBtn = document.querySelector("#eraserBtn");
let resetBtn = document.querySelector("#resetBtn");

let mode = "color";
let color = "black";

let cols = 16;
let grid = cols*cols;

function createGrid(grid) {
    for(let i = 0; i < grid; i++) {
        let div = document.createElement("div");
        div.style.width = `${100/cols}%`;
        div.style.height = `${100/cols}%`;
        div.style.backgroundColor = "white";
        div.dataset.opacity = 0;
        div.addEventListener("mouseenter", (e) => {
            switch(mode) {
                case "color": 
                    drawColor(e.target, color); 
                    break;
                case "rainbow":
                    drawRainbow(e.target);
                    break;
                case "shade":
                    drawShade(e.target);
                    break;
                case "eraser":
                    eraseColor(e.target);
                    break;
                default:
                    drawColor(e.target, color); 
            }
        });

        container.appendChild(div);
    }
}

colorBtn.addEventListener("click", () => mode = "color");
rainbowBtn.addEventListener("click", () => mode = "rainbow");
shadeBtn.addEventListener("click", () => mode = "shade");
eraserBtn.addEventListener("click", () => mode = "eraser");
resetBtn.addEventListener("click", () => resetGrid(grid));

gridBtn.addEventListener("click", () => {
    cols = +prompt("Grid size: ", "16");
    grid = cols*cols;
    resetGrid(grid);
})

function drawColor(el, color) {
    el.style.backgroundColor = color;
}
function drawRainbow(el) {
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    el.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function drawShade(el) {
    let alpha = +el.dataset.opacity;
    if(alpha < 1) {
        el.style.backgroundColor = `rgba(${0}, ${0}, ${0}, ${alpha += 0.1})`;
        el.dataset.opacity = alpha;
    }
}

function eraseColor(el) {
    el.style.backgroundColor = "white";
}

function resetGrid(grid) {
    container.innerHTML = "";
    createGrid(grid);
}

createGrid(grid);