const sketchEtch = (event) => {
    const optionsBtn = document.getElementById("color_options_btn");
    const currAction = optionsBtn.value;
    const currColor = 'black';
    const powerSwitch = document.querySelector('.grid_power_switch');
    const currPowerState = powerSwitch.id;
    if(currPowerState==='on') {
        switch(currAction) {
            case 'colorBG':
                colorBG(event, currColor);
                break;
            case 'rainbowBG':
                rainbowBG(event);
                break;
            case 'eraseBG':
                eraseBG(event);
                break;
            default:
                break;
        }
    }
}

const colorBG = (event, currColor) => {
    const target_cell = document.getElementById(event.target.id);
    target_cell.style.backgroundColor = `${currColor}`;
}

const rainbowBG = (event) => {
    const colorArr = ['rgb(0, 250, 255)', 'rgb(40, 0, 255)', 'rgb(255, 0, 220)', 'rgb(0, 255, 20)'];
    const rand = Math.floor(Math.random() * 4);
    const target_cell = document.getElementById(event.target.id);
    target_cell.style.backgroundColor = `${colorArr[rand]}`;
}

const eraseBG = (event) => {
    const target_cell = document.getElementById(event.target.id);
    target_cell.style.backgroundColor = 'rgb(155, 175, 185)';
}

const toggleOn = () => {
    const powerSwitch = document.querySelector('.grid_power_switch');
    powerSwitch.id = 'on';
}

const toggleOff = () => {
    const powerSwitch = document.querySelector('.grid_power_switch');
    powerSwitch.id = 'off';
}

const listenMouseOver = () => {
    const gridCells = document.querySelectorAll('.cells');
    gridCells.forEach((gridCell) => {
        gridCell.addEventListener('mousedown', toggleOn);
        gridCell.addEventListener('mouseup', toggleOff);
        gridCell.addEventListener('mouseover', sketchEtch);
    });  
}

const handleButtonClickGrid = (event) => {
    let newGridSize = prompt("Enter desired grid size for the Etch-A-Square-Doodle. (between 16-100)");
    if(!newGridSize.match(/^[\d]+$/) || Number(newGridSize)<16 || Number(newGridSize)>100) {
        alert("Invalid input. Make sure requested grid size is an integer between 16 and 100 inclusive.");
        newGridSize = 16;
    }
    makeGrid(Number(newGridSize), Number(newGridSize));
}

const listenGridButton = () => {
    const gridBtn = document.getElementById("grid_btn");
    gridBtn.addEventListener('click', handleButtonClickGrid);
}

// Still working on color change option
const listenColorButton = () => {
    const optionsBtn = document.getElementById("color_options_btn");
    optionsBtn.addEventListener('click', handleButtonClickGrid);
}

const makeGrid = (rows=16, cells=16) => {
    const main = document.querySelector('main');
    const old_grid_container = document.querySelector('.grid_container');
    old_grid_container.remove();
    const grid_container =  document.createElement('div');
    grid_container.className = 'grid_container';
    const bottomGrid = document.querySelector('bottom_grid');
    
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
            newRow.appendChild(newCell);
        }
        grid_container.appendChild(newRow);
    }

    main.insertBefore(grid_container, bottomGrid);
    listenMouseOver();
}

listenGridButton();
listenColorButton();
makeGrid();
