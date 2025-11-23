const container = document.querySelector(".container");
const gridValue = document.querySelector("#gridValue");
const gridBtn = document.querySelector("#gridBtn");
const colorBtn = document.querySelector("#colorBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const shadeBtn = document.querySelector("#shadeBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const resetBtn = document.querySelector("#resetBtn");
const modeButtons = document.querySelectorAll(".mode-btn");

let mode = "color";
let color = "black";
let mouseClicked = false;
let isDrawing = false;
let activeTouchId = 0;

let cols = 16;
let grid = cols*cols;
let cells = [];

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
    cells = Array.from(document.querySelectorAll('.grid-square'))
}

// EVENTS
document.body.addEventListener("mouseup",  () => {
    mouseClicked = false;
    document.body.style.cursor  = "auto";
});

// mousedown is fine for document.body instead of container as well
container.addEventListener("mousedown", e => {
    e.preventDefault();
    mouseClicked = true;
    if(mode === "eraser") {
        document.body.style.cursor = "url('./Assets/icons8-eraser-50.png') 4 40, auto";
    } 
    else {
        document.body.style.cursor  = "url('./Assets/icons8-pencil-40.png') 4 40, crosshair";
    }
    if (e.target.classList.contains('grid-square')) {
        // draw here, e.g.
        if (mode === "color") {
            drawColor(e.target, color)
        }
        else if (mode === "rainbow") drawRainbow(e.target)
        else if (mode === "shade") drawShade(e.target)
        else if (mode === "eraser") eraseColor(e.target)
    }
})
//For mobile/touch
container.addEventListener("touchstart", e => {
    e.preventDefault();
    isDrawing = true;
    activeTouchId = e.touches[0].identifier;
}, { passive: false })
container.addEventListener("touchmove", e => {
    e.preventDefault();
    let rect = container.getBoundingClientRect();
    let cellWidth = rect.width / cols;
    Array.from(e.touches).forEach(touch => {
        if(touch.identifier === activeTouchId) {
            let localX = touch.clientX - rect.left;
            let localY = touch.clientY - rect.top;
            let columnIndex = Math.floor(localX / cellWidth);
            let rowIndex = Math.floor(localY / cellWidth);
            let index = rowIndex * cols + columnIndex
            let cell = cells[index];
            if (isDrawing
            && columnIndex >= 0 && columnIndex < cols
            && rowIndex >= 0 && rowIndex < cols
            && cell
            && cell.classList.contains('grid-square')) {
                // draw here, e.g.
                if (mode === "color") {
                    drawColor(cell, color)
                }
                else if (mode === "rainbow") drawRainbow(cell)
                else if (mode === "shade") drawShade(cell)
                else if (mode === "eraser") eraseColor(cell)
            }
        }
    })
}, { passive: false })
container.addEventListener("touchend", (e) => {
    Array.from(e.changedTouches).forEach(touch => {
        if(touch.identifier === activeTouchId) {
            isDrawing = false;
            activeTouchId = null;
        }
    })
}, { passive: false });

colorBtn.addEventListener("change", (e) => {
    color = e.target.value;
    mode = "color";
    setActiveButton(colorBtn);   
});
rainbowBtn.addEventListener("click", () => {
    mode = "rainbow";
    setActiveButton(rainbowBtn); 
});
shadeBtn.addEventListener("click", () => {
    mode = "shade";
    setActiveButton(shadeBtn);   
});
eraserBtn.addEventListener("click", () => {
    mode = "eraser";
    setActiveButton(eraserBtn);  
});
resetBtn.addEventListener("click", () => resetGrid(grid));
gridBtn.addEventListener("input", (e) => {
    cols = +e.target.value;
    gridValue.textContent = `Grid: ${cols} * ${cols}`;
    grid = cols*cols;
    resetGrid();
})

container.addEventListener("dragstart", e =>  e.preventDefault());

function setActiveButton(activeBtn) {
    modeButtons.forEach(btn => btn.classList.remove("active"));
    activeBtn.classList.add("active");
}

// Drawing functions
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

// Grid reset
function resetGrid() {
    container.innerHTML = "";
    cells = [];
    isDrawing = false;
    activeTouchId = null;
    createGrid(grid);
}


createGrid(grid);