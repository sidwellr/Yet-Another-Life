// Global constants
const gridSize = 1000000; // life grid is gridSize x gridSize cells

// The global generation counter
let generation = 1;

// Number of live cells (updated every generation)
let liveCells = 0;

// The life grid, a sparse array.
// Empty cells are, of course, empty
// Cells with a positive value are empty
// Cells with a negative value are alive
// The absolute value of non-empty cells is the
// generation the cell last changed
let grid = [];

let showGrid = true;
let showTrails = false;

// Display window, defines the visible part of the grid
let displayX = Math.round(gridSize / 2); // grid cell at horizontal center
let displayY = Math.round(gridSize / 2); // grid cell at vertical center
let cellSize = 10; // size of displayed cells in pixels
let borderSize = 1; // size of cell borders in pixels

let fr = 15; // Frame rate
let latent = 20; // Number of generations to keep dead cells in grid

let appTitle;
let genDisplay;
let cellDisplay;
let gridButton;
let trailsButton;
let speedSlider;
let latentSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createControls();
  frameRate(fr);
  initGrid();
}

function createControls() {
  appTitle = createP("Yet Another Life");
  appTitle.position(10, -20);
  appTitle.style("font-size", "19pt");
  appTitle.style("font-weight", "bold");

  createP("Generation: ").position(10, 15);
  genDisplay = createP(generation);
  genDisplay.position(125, 15);

  createP("Alive:").position(10, 35);
  cellDisplay = createP(liveCells);
  cellDisplay.position(125, 35)

  gridButton = createCheckbox("Grid");
  gridButton.position(10, 85);
  gridButton.style("font-size","14pt");
  gridButton.checked(showGrid);
  gridButton.changed(() => showGrid = !showGrid);

  trailsButton = createCheckbox("Trails");
  trailsButton.position(75, 85);
  trailsButton.style("font-size","14pt");
  trailsButton.checked(showTrails);
  trailsButton.changed(() => showTrails = !showTrails);

  createP("Speed").position(10,90);
  speedSlider = createSlider(0, 5, log(fr));
  speedSlider.position(10, 130);
  speedSlider.style("width","180px");
  speedSlider.input(() => {
    fr = exp(speedSlider.value());
    frameRate(fr);
  });

  createP("Trail length").position(10, 135);
  latentSlider = createSlider(0, 200, latent);
  latentSlider.position(10, 175);
  latentSlider.style("width","180px");
  latentSlider.input(() => latent = latentSlider.value());

  createP("Drag to pan").position(10,180);
  createP("Scroll wheel to zoom").position(10,200);
}

function drawControls() {
  fill(230, 220, 235, 240);
  rect(0, 0, 200, 250);
  genDisplay.html(generation);
  cellDisplay.html(liveCells);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawGrid();
}

function draw() {
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      displayX -= Math.round(movedX / 4);
      displayY -= Math.round(movedY / 4);
    } else if (mouseButton === RIGHT) {
      displayX = Math.round(gridSize / 2);
      displayY = Math.round(gridSize / 2);
    }
  }
  newGeneration();
  drawGrid();
  drawControls();
}

function mouseWheel(event) {
  cellSize -= event.delta / 100;
  if (cellSize < 3) cellSize = 3;
  return false;
}

function keyTyped() {
  if (key === 'g') {
    showGrid = !showGrid;
    gridButton.checked(showGrid);
  } else if (key === 'r') {
    initGrid();
  } else if (key === 'c') {
    displayX = Math.round(gridSize / 2);
    displayY = Math.round(gridSize / 2);
  } else if (key === 't') {
    showTrails = !showTrails;
    trailsButton.checked(showTrails);
  } else if (key === '1') {
    initGrid1();
  } else if (key === '2') {
    initGrid2();
  } else if (key === '3') {
    initGrid3();
  } else if (key === '4') {
    initGrid4();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    fr *= 2;
    frameRate(fr);
    speedSlider.value(log(fr));
  } else if (keyCode === DOWN_ARROW) {
    fr /= 2;
    frameRate(fr);
    speedSlider.value(log(fr));
  } else if (keyCode === LEFT_ARROW) {
    latent -= 2;
    if (latent < 0) latent = 0;
    latentSlider.value(latent);
  } else if (keyCode === RIGHT_ARROW) {
    latent += 2;
    latentSlider.value(latent);
  }
}

// Get grid index for (x,y) location
function index(x, y) {
  return x * gridSize + y;
}

// Get x location of a grid index
function gridx(i) {
  return Math.floor(i / gridSize);
}

// Get y location of a grid index
function gridy(i) {
  return Math.floor(i % gridSize)
}

// Initialize grid with some cells
function initGrid() {
  // Randomly for now...
  grid = [];
  for (let i = 0; i < 5000; i++) {
    let x = Math.round(random(-75, 75));
    let y = Math.round(random(-75, 75));
    grid[index(displayX + x, displayY + y)] = -1;
  }
}

// Initialize grid with a pattern (block laying engine)
function initGrid1() {
  grid = [];
  grid[index(displayX + 30, displayY + 30)] = -1;
  grid[index(displayX + 30, displayY + 31)] = -1;
  grid[index(displayX + 31, displayY + 30)] = -1;
  grid[index(displayX + 31, displayY + 31)] = -1;
  grid[index(displayX + 40, displayY + 30)] = -1;
  grid[index(displayX + 41, displayY + 29)] = -1;
  grid[index(displayX + 41, displayY + 31)] = -1;
  grid[index(displayX + 43, displayY + 29)] = -1;
  grid[index(displayX + 43, displayY + 32)] = -1;
  grid[index(displayX + 44, displayY + 31)] = -1;
  grid[index(displayX + 44, displayY + 32)] = -1;
  grid[index(displayX + 45, displayY + 32)] = -1;
  drawGrid();
}

// Initialize grid with a pattern (lightweight spaceship)
function initGrid2() {
  grid = [];
  grid[index(displayX + 30, displayY - 2)] = -1;
  grid[index(displayX + 29, displayY - 1)] = -1;
  grid[index(displayX + 29, displayY)] = -1;
  grid[index(displayX + 29, displayY + 1)] = -1;
  grid[index(displayX + 30, displayY + 1)] = -1;
  grid[index(displayX + 31, displayY + 1)] = -1;
  grid[index(displayX + 32, displayY + 1)] = -1;
  grid[index(displayX + 33, displayY)] = -1;
  grid[index(displayX + 33, displayY - 2)] = -1;
  drawGrid();
}

// Initialize grid with a pattern (R-pentomino)
function initGrid3() {
  grid = [];
  grid[index(displayX - 1, displayY)] = -1;
  grid[index(displayX, displayY - 1)] = -1;
  grid[index(displayX, displayY)] = -1;
  grid[index(displayX, displayY + 1)] = -1;
  grid[index(displayX + 1, displayY - 1)] = -1;
  drawGrid();
}

// Initialize grid with a pattern (Bunnies)
function initGrid4() {
  grid = [];
  grid[index(displayX - 4, displayY - 2)] = -1;
  grid[index(displayX - 3, displayY + 1)] = -1;
  grid[index(displayX - 2, displayY - 1)] = -1;
  grid[index(displayX - 2, displayY)] = -1;
  grid[index(displayX - 1, displayY + 1)] = -1;
  grid[index(displayX + 1, displayY)] = -1;
  grid[index(displayX + 2, displayY - 1)] = -1;
  grid[index(displayX + 2, displayY - 2)] = -1;
  grid[index(displayX + 3, displayY)] = -1;
  drawGrid();
}

// Draw/redraw the visible part of the grid
function drawGrid() {
  let size = cellSize + borderSize
  let leftCell = Math.floor(displayX - (width / 2) / size);
  let rightCell = Math.ceil(displayX + (width / 2) / size);
  let topCell = Math.floor(displayY - (height / 2) / size);
  let bottomCell = Math.ceil(displayY + (height / 2) / size);

  push();
  translate(width / 2, height / 2);

  // Draw grid lines
  background(220);
  if (showGrid) {
    stroke(150);
    strokeWeight(borderSize);
    for (x = (leftCell - displayX) * size - size / 2; x <= (rightCell - displayX) * size; x += size) {
      line(x, -height, x, height);
    }
    for (y = (topCell - displayY) * size - size / 2; y <= (bottomCell - displayY) * size; y += size) {
      line(-width, y, width, y);
    }
  }

  // Draw (and count) live cells
  liveCells = 0;
  noStroke();
  for (let cell in grid) {
    let cellX = gridx(cell);
    let cellY = gridy(cell);
    if (grid[cell] < 0) {
      liveCells++;
      fill(0);
      circle((cellX - displayX) * size, (cellY - displayY) * size, cellSize - 1);
    } else {
      if (showTrails) {
        fill(255);
        circle((cellX - displayX) * size, (cellY - displayY) * size, cellSize - 1);
      }
    }
  }

  pop();
}

// Compute a new generation
function newGeneration() {
  let size = cellSize + borderSize
  let neighborCount = []; // Sparse array; need to check for undefined values
  
  function increment(cellX, cellY) {
    if (cellX >= 0 && cellX < gridSize && cellY >= 0 && cellY < gridSize) {
      let cell = index(cellX, cellY);
      if (neighborCount[cell] == undefined)
        neighborCount[cell] = 1;
      else
        neighborCount[cell]++;
    }
  }

  generation += 1;

  // Add up number of neighbors for each cell
  for (let cell in grid) {
    if (grid[cell] < 0) {
      let cellX = gridx(cell);
      let cellY = gridy(cell);
      increment(cellX - 1, cellY - 1);
      increment(cellX, cellY - 1);
      increment(cellX + 1, cellY - 1);
      increment(cellX - 1, cellY);
      increment(cellX + 1, cellY);
      increment(cellX - 1, cellY + 1);
      increment(cellX, cellY + 1);
      increment(cellX + 1, cellY + 1);
    }
  }

  // Birth new cell (or keep existing one) when there are 3 neighbors
  for (let cell in neighborCount) {
    if (neighborCount[cell] === 3) {
      if (grid[cell] === undefined || grid[cell] > 0) {
        grid[cell] = -generation;
      }
    }
  }

  // Kill cells with less than 2 or more than 3 neighbors
  for (let cell in grid) {
    if (grid[cell] < 0) {
      if (neighborCount[cell] === undefined ||
        neighborCount[cell] < 2 || neighborCount[cell] > 3) {
        grid[cell] = generation;
      }
    } else {
      if (grid[cell] < generation - latent) {
        delete grid[cell]; // Delete cells that have been dead for awhile
      }
    }
  }
}
