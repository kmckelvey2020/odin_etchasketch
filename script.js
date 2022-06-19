/* ********************************* //
//         SKETCH FUNCTIONS          //
// ********************************* */
const sketchEtch = (event) => {
    const colorBtn = document.getElementById("color_btn");
    const currColorType = colorBtn.value;
    const colorInput = document.getElementById("color_input");
    const currSolid = colorInput.value;
    const powerSwitch = document.querySelector('.grid_power_switch');
    const currPowerState = powerSwitch.value;
    const functionSwitch = document.querySelector('.function_btn');
    const currFunction = functionSwitch.value;
    console.log(event.target.id);
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
    const target_cell = document.getElementById(event.target.id);
    target_cell.style.backgroundColor = `${currColor}`;
}

const rainbowBG = (event) => {
    const colorArr = ['rgb(255, 0, 0)', 'rgb(255, 255, 0)', 'rgb(0, 250, 255)', 'rgb(40, 0, 255)', 'rgb(200, 0, 255)', 'rgb(255, 0, 220)', 'rgb(0, 255, 20)'];
    const rand = Math.floor(Math.random() * 7);
    const target_cell = document.getElementById(event.target.id);
    target_cell.style.backgroundColor = `${colorArr[rand]}`;
}

const eraseBG = (event) => {
    const target_cell = document.getElementById(event.target.id);
    target_cell.style.backgroundColor = 'rgb(155, 175, 185)';
}

/* ********************************* //
//           ON/OFF TOGGLE           //
// ********************************* */
const toggleOn = (event) => {
    const powerSwitch = document.querySelector('.grid_power_switch');
    powerSwitch.value = 'on';
}

const toggleOff = () => {
    const powerSwitch = document.querySelector('.grid_power_switch');
    powerSwitch.value = 'off';
}

/* ********************************* //
//  EVENT LISTENERS FOR GRID CELLS   //
// ********************************* */
const listenMouse = () => {
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
        functionSwitch.innerHTML = 'draw/<br>ERASE';
    } else {
        functionSwitch.value = 'draw';
        functionSwitch.innerHTML = 'DRAW/<br>erase';
    }
}

/* ********************************* //
//   COLOR TYPE (SOLID OR RAINBOW)   //
// ********************************* */
const handleButtonClickColor = () => {
    const colorBtn = document.getElementById("color_btn");
    if(colorBtn.value==='solid') {
        colorBtn.value = 'rainbow';
        colorBtn.innerHTML = 'RAINBOW';
    } else {
        colorBtn.value = 'solid';
        colorBtn.innerHTML = 'SOLID';
    }
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

    // Grid will be appended to document before powerSwitch (bottom) section of main
    const powerSwitch = document.querySelector('.grid_power_switch');

    // When grid is redrawn, reset functionSwitch to DRAW
    const functionSwitch = document.querySelector('.function_btn');
    functionSwitch.value = 'draw';
    functionSwitch.innerHTML = 'DRAW/<br>erase';

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
        grid_container.appendChild(newRow);
    }

    main.insertBefore(grid_container, powerSwitch);
    listenMouse(); // Set up mouse listeners for each cell
}

listenGridButton();
listenFunctionButton();
listenColorButton();
makeGrid();
