# TOP_Etch-a-Sketch_New
A new project for The Odin Project — Etch-a-Sketch built with HTML, CSS, and JavaScript.

## Development Notes

1. Create a webpage with a container `<div>` and generate a **16×16 grid** of square cells using JavaScript.
    - Use **Flexbox** for responsive grid layout.
    - Create boolean variables for: color mode, eraser mode, reset, rainbow mode, shade mode.

2. Add drawing behavior:
    - Each cell changes color when the mouse hovers over it.
    - Add an event listener to every cell to update its background color.
    - Add **mousedown** and **mouseup** listeners so it works like a pen (only draw when mouse is held down).
    - Bonus logic:
        - On `mousedown`: set `mouseClicked = true` and allow drawing.
        - On `mouseup`: set `mouseClicked = false` and stop drawing.

3. Add a **Grid Size** button (min 16, max 100) that creates a new grid of `n × n` cells.
    - Use a prompt to get the desired grid size.
    - Re-generate the grid.

4. Add an **Eraser** button that restores the cell color to default.
    - Add an event listener that activates eraser mode.
    - Set other modes (color, rainbow, shade) to false.

5. Add a **Reset** button that clears or refreshes the grid.
    - Add an event listener that resets everything.

### Bonus Features

1. **Rainbow Mode**
    - Generate random `red`, `green`, and `blue` values using `Math.random() * 255`.
    - When rainbow mode is active, each cell uses:
      ```js
      div.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
      ```
    - Activate via event listener and disable other modes.

2. **Shade Mode**
    - Start with base color black (`rgb(0, 0, 0)`).
    - Increase opacity by `0.1` each time the cell is hovered.
    - Example:
      ```js
      div.style.backgroundColor = `rgba(0, 0, 0, opacity)`;
      ```
    - Activate via event listener and disable other modes.

#### BONUS: Style 
1. Slider input to select the grid size dynamically;
    - Displays the current grid size as text;
2. Color picker for selecting the drawing color in color mode;

#### BONUS: Mobile Support 
1. **Single-Finger Drawing**
    - `touchstart`: 
        - Set `isDrawing = true` and allow drawing;
        - Also set `activeTouchId` to identify the first finger.
    - `touchmove`: 
        - Prevent default scrolling behavior: 
        ```js 
        e.preventDefault();
        ```
        - Get the grid’s bounding rectangle `getBoundingClientRect()` to know its position and size.
        - Calculate the width of a single cell (`cellWidth = grid width / number of columns`).
        - Loop through all current touches and select the one matching `activeTouchId`.
            - Convert the finger’s position to row and column indices:
            ```js 
            columnIndex = Math.floor(localX / cellWidth)
            rowIndex = Math.floor(localY / cellWidth)
            index = rowIndex * cols + columnIndex
            cell = cells[index]
            ```
            - Draw if: 
                - `isDrawing = true`;
                - Row and column are within bounds (0 to cols - 1);
                - The cell exists and has the correct class;
                - Apply the current drawing mode (color, rainbow, shade, or eraser).
    - `touchend`: 
        - Loop through `changedTouches` (fingers that just lifted).
        - If the lifted finger matches `activeTouchId`: 
            - Set `isDrawing = false` and stop drawing; 
            - Clear `activeTouchId` (the active finger).