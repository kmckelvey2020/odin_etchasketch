/* ********************************* //
//         SKETCH FUNCTION           //
// ********************************* */
const sketchEtch = (event) => {
    const currColorType = document.getElementById("color_btn").value;
    //const currColorType = colorBtn.value;
    const currSolid = document.getElementById("color_input").value;
    //const currSolid = colorInput.value;
    const currPowerState = document.querySelector('.grid_power_switch').value;
    //const currPowerState = powerSwitch.value;
    const currFunction = document.querySelector('.function_btn').value;
    //const currFunction = functionSwitch.value;
    if(currPowerState==='on' && currFunction==='draw') {
        switch(currColorType) {
            case 'solid':
                colorBG(event, currSolid);
                break;
            case 'rainbow':
                rainbowBG(event);
                break;
            default:
                break;
        }
    } else if(currPowerState==='on' && currFunction==='erase') {
        eraseBG(event);
    }
}

/* ***************************************** //
// OPTIONS (SOLID DRAW, RAINBOW DRAW, ERASE) //
// ***************************************** */
const colorBG = (event, currColor) => {
    const target_cell = getTargetCell(event);
    if (target_cell) target_cell.style.backgroundColor = `${currColor}`;
}

const rainbowBG = (event) => {
    const colorArr = ['rgb(255, 0, 0)', 'rgb(255, 255, 0)', 'rgb(0, 250, 255)', 'rgb(40, 0, 255)', 'rgb(200, 0, 255)', 'rgb(255, 0, 220)', 'rgb(0, 255, 20)'];
    const rand = Math.floor(Math.random() * 7);
    const target_cell = getTargetCell(event);
    if (target_cell) target_cell.style.backgroundColor = `${colorArr[rand]}`;
}

const eraseBG = (event) => {
    const target_cell = getTargetCell(event);
    if (target_cell) target_cell.style.backgroundColor = 'rgb(155, 175, 185)';
}

const getTargetCell = (event) => {
    if(event.type==='touchmove'){
        const x = event.targetTouches[0].clientX;
        const y = event.targetTouches[0].clientY;
        const grid = document.querySelector('.grid_boundary').getBoundingClientRect();
        if(x>Math.ceil(grid.left)+5 && x<Math.floor(grid.right)-5 && y<Math.floor(grid.bottom)-5 && y>Math.ceil(grid.top)+5) {
            return document.elementFromPoint(x, y);
        } else return;
    } else {
        return document.getElementById(event.target.id);
    }
}

/* ********************************* //
//           ON/OFF TOGGLE           //
// ********************************* */
const toggleOn = (event) => {
    const powerSwitch = document.querySelector('.grid_power_switch');
    powerSwitch.value = 'on';
    sketchEtch(event);
}

const toggleOff = () => {
    const powerSwitch = document.querySelector('.grid_power_switch');
    powerSwitch.value = 'off';
}

/* ********************************* //
//  EVENT LISTENERS FOR GRID CELLS   //
// ********************************* */
const addListeners = () => {
    const gridCells = document.querySelectorAll('.cells');
    gridCells.forEach((gridCell) => {
        gridCell.addEventListener('mousedown', toggleOn);
        gridCell.addEventListener('mouseup', toggleOff);
        gridCell.addEventListener('mouseover', sketchEtch);
        gridCell.addEventListener('touchstart', toggleOn);
        gridCell.addEventListener('touchend', toggleOff);
        gridCell.addEventListener('touchmove', sketchEtch);
    });  
}

/* ********************************* //
//            GRID SIZE              //
// ********************************* */
const handleButtonClickGrid = () => {
    let newGridSize = prompt("Enter desired grid size for the Etch-A-Square-Doodle. (between 16-100)");
    if(!newGridSize.match(/^[\d]+$/) || Number(newGridSize)<16 || Number(newGridSize)>100) {
        alert("Invalid input. Make sure requested grid size is an integer between 16 and 100 inclusive.");
        newGridSize = 30;
    }
    const gridBtn = document.getElementById("grid_btn");
    gridBtn.innerHTML = `${newGridSize}x${newGridSize} Grid`;
    makeGrid(Number(newGridSize), Number(newGridSize));
}

/* ********************************* //
//     FUNCTION TOGGLE DRAW/ERASE    //
// ********************************* */

const handleButtonClickFunction = () => {
    const functionSwitch = document.querySelector('.function_btn');
    if(functionSwitch.value==='draw') {
        functionSwitch.value = 'erase';
        functionSwitch.innerHTML = 'draw/<br><strong>ERASE</strong>';
    } else {
        functionSwitch.value = 'draw';
        functionSwitch.innerHTML = '<strong>DRAW</strong>/<br>erase';
    }
}

/* ********************************* //
//   COLOR TYPE (SOLID OR RAINBOW)   //
// ********************************* */
const handleButtonClickColor = () => {
    const colorBtn = document.getElementById("color_btn");
    if(colorBtn.value==='solid') {
        colorBtn.value = 'rainbow';
        colorBtn.innerHTML = 'solid/<br/><strong>RAINBOW</strong>';
    } else {
        colorBtn.value = 'solid';
        colorBtn.innerHTML = '<strong>SOLID</strong>/<br/>rainbow';
    }
}

/* ********************************* //
//       CLEAR THE GRID (RESET)      //
// ********************************* */
const handleButtonClickClear = () => {
    let gridSize = `${document.getElementById("grid_btn").innerHTML}`;
    gridSize = gridSize.split(' ')[0].split('x')[0];
    makeGrid(Number(gridSize), Number(gridSize));
}

/* ********************************* //
//       BUTTON LISTENERS            //
// ********************************* */
const listenGridButton = () => {
    const gridBtn = document.getElementById("grid_btn");
    gridBtn.addEventListener('click', handleButtonClickGrid);
}

const listenFunctionButton = () => {
    const functionBtn = document.getElementById("function_btn");
    functionBtn.addEventListener('click', handleButtonClickFunction);
}

const listenColorButton = () => {
    const colorBtn = document.getElementById("color_btn");
    colorBtn.addEventListener('click', handleButtonClickColor);
}

const listenClearButton = () => {
    const clearBtn = document.getElementById("clear_btn");
    clearBtn.addEventListener('click', handleButtonClickClear);
}

/* ********************************* //
//        MAKEGRID FUNCTION          //
// ********************************* */
const makeGrid = (rows=30, cells=30) => {
    const main = document.querySelector('.main');

    // Remove old grid and redraw with current squares per grid side (rows x cells)
    const old_grid_container = document.querySelector('.grid_container');
    old_grid_container.remove();
    const grid_container =  document.createElement('div');
    grid_container.className = 'grid_container';
    const grid_boundary =  document.createElement('div');
    grid_boundary.className = 'grid_boundary';

    // Grid will be appended to document before powerSwitch (bottom) section of main
    const powerSwitch = document.querySelector('.grid_power_switch');

    // When grid is redrawn, reset functionSwitch to DRAW
    const functionSwitch = document.querySelector('.function_btn');
    functionSwitch.value = 'draw';
    functionSwitch.innerHTML = '<strong>DRAW</strong>/<br>erase';

    // Create and append new grid
    for(let i=0; i<rows; i++) {
        const newRow = document.createElement('div');
        newRow.className = `rows row${i}`;
        for(let j=0; j<cells; j++) {
            const newCell = document.createElement('div');
            newCell.className = `cells cell${i}_${j}`;
            newCell.id = `cell${i}_${j}`;
            newCell.style.background = 'rgb(155, 175, 185)'
            newCell.style.height = `min(70vw / ${cells}, 60vh / ${cells})`;
            newCell.style.width = `min(70vw / ${cells}, 60vh / ${cells})`;
            newCell.style.touchAction = 'none';
            newRow.appendChild(newCell);
        }
        grid_boundary.appendChild(newRow);
    }

    grid_container.appendChild(grid_boundary);
    main.insertBefore(grid_container, powerSwitch);
    addListeners(); // Set up listeners for each cell
}

listenGridButton();
listenFunctionButton();
listenColorButton();
listenClearButton();
makeGrid();
