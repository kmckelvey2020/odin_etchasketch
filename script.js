const changeBG = (event) => {
    const target_cell = document.getElementById(event.target.id);
    target_cell.style.backgroundColor = 'black';
}

const listenMouseOver = () => {
    const gridCells = document.querySelectorAll('.cells');
    gridCells.forEach((gridCell) => {
        gridCell.addEventListener('mouseover', changeBG);
    });  
}

const handleButtonClickGrid = (event) => {
    const newGridSize = Number(prompt("Enter desired grid size for the Etch-A-Square-Doodle. (between 16-100)"));
    if(typeof newGridSize!=='number' ||newGridSize<16 || newGridSize>100) {
        alert("Invalid input. Make sure requested grid size is an integer between 16 and 100 inclusive.");
        handleButtonClickGrid(event);
    }
    makeGrid(newGridSize, newGridSize);
}

const listenGridButton = () => {
    const gridBtn = document.getElementById("grid_btn");
    gridBtn.addEventListener('click', handleButtonClickGrid);
}

// Still working on color change option
const listenColorButton = () => {
    const colorBtn = document.getElementById("color_btn");
    colorBtn.addEventListener('click', handleButtonClickGrid);
}

const makeGrid = (rows=16, cells=16) => {
    const main = document.querySelector('main');
    const old_grid_container = document.querySelector('.grid_container');
    old_grid_container.remove();
    const grid_container =  document.createElement('div');
    grid_container.className = 'grid_container';
    const btn_group = document.querySelector('btn_group');
    
    for(let i=0; i<rows; i++) {
        const newRow = document.createElement('div');
        newRow.className = `rows row${i}`;
        for(let j=0; j<cells; j++) {
            const newCell = document.createElement('div');
            newCell.className = `cells cell${i}_${j}`;
            newCell.id = `cell${i}_${j}`;
            newCell.style.height = `min(80vw / ${cells}, 2rem)`;
            newCell.style.width = `min(80vw / ${cells}, 2rem)`;
            newRow.appendChild(newCell);
        }
        grid_container.appendChild(newRow);
    }

    main.insertBefore(grid_container, btn_group);
    listenMouseOver();
}

listenGridButton();
listenColorButton();
makeGrid();
