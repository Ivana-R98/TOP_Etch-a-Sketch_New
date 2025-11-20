let container = document.querySelector(".container");
let gridBtn = document.querySelector("#gridBtn");
let colorBtn = document.querySelector("#colorBtn");
let rainbowBtn = document.querySelector("#rainbowBtn");
let shadeBtn = document.querySelector("#shadeBtn");
let eraserBtn = document.querySelector("#eraserBtn");
let resetBtn = document.querySelector("#resetBtn");

let mode = "color";
let color = "black";
let mouseClicked = false;

let cols = 16;
let grid = cols*cols;

function createGrid(grid) {
    for(let i = 0; i < grid; i++) {
        let div = document.createElement("div");
        div.classList.add("grid-square");
        div.style.width = `${100/cols}%`;
        div.style.height = `${100/cols}%`;
        div.style.backgroundColor = "white";
        div.dataset.opacity = 0;
        div["draggable"] = false;
        div.addEventListener("mouseenter", (e) => {
            if(mode === "color" || mode === "rainbow" || mode === "shade") {
                container.style.cursor  = "url('./Assets/icons8-pencil-40.png') 4 40, crosshair";
                if(mode === "color" && mouseClicked) drawColor(e.target, color);  
                else if(mode === "rainbow" && mouseClicked) drawRainbow(e.target);
                else if(mode === "shade" && mouseClicked) drawShade(e.target);
            }
            else if(mode === "eraser") {
                container.style.cursor = "url('./Assets/icons8-eraser-50.png') 4 40, auto";
                if(mouseClicked) eraseColor(e.target);
            }
        });

        container.appendChild(div);
    }
}

document.body.addEventListener("mouseup",  () => mouseClicked = false);
container.addEventListener("dragstart", e =>  e.preventDefault())
// mousedown is fine for document.body instead of container as well
container.addEventListener("mousedown", (e) => {
    e.preventDefault();
    mouseClicked = true;
    if (e.target.classList.contains('grid-square')) {
        // draw here, e.g.
        if (mode === "color") drawColor(e.target, color)
        else if (mode === "rainbow") drawRainbow(e.target)
        else if (mode === "shade") drawShade(e.target)
        else if (mode === "eraser") eraseColor(e.target)
    }
})

colorBtn.addEventListener("change", (e) => {
    color = e.target.value;
    mode = "color";
});
rainbowBtn.addEventListener("click", () => {mode = "rainbow"});
shadeBtn.addEventListener("click", () => {mode = "shade"});
eraserBtn.addEventListener("click", () => {mode = "eraser"});
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
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    el.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function drawShade(el) {
    let alpha = +el.dataset.opacity;
    if(alpha < 1) {
        el.style.backgroundColor = `rgba(${0}, ${0}, ${0}, ${alpha += 0.1})`;
        el.dataset.opacity = Number(alpha.toFixed(1));
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