let container = document.querySelector(".container");
let cols = 100;
let grid = cols*cols;
function createGrid(grid) {
    for(let i = 0; i < grid; i++) {
        let div = document.createElement("div");
        div.style.width = `${100/cols}%`
        div.addEventListener("mouseover", () => {
            div.style.backgroundColor = "black";
        })
        container.appendChild(div);
    }
}

createGrid(grid);