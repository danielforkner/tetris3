// Game State and Classes
let game = {
  running: false,
  width: 15,
  height: 30,
  score: 0,
  board: [],
  currentPiece: false,
  nextPiece: [
    [1, 1],
    [1, 1],
  ],
};

let shapes = [
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1],
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  [
    [1, 0],
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
];

// DOM Elements
let table = document.getElementById('board');
let boardRows = board.children;
let playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', () => {
  game.running = !game.running;
  if (game.running) {
    playBtn.innerText = 'pause';
  } else {
    playBtn.innerText = 'Play';
  }
});

// Create Game Boards
for (let i = 0; i < game.height; i++) {
  game.board.push([]);
  let row = document.createElement('tr');
  for (let j = 0; j < game.width; j++) {
    game.board[i].push(0);
    let cell = document.createElement('td');
    cell.classList.add('cell');
    row.appendChild(cell);
  }
  table.appendChild(row);
}

window.addEventListener('keypress', (e) => {
  let piece = game.currentPiece;
  switch (e.key) {
    case 'a':
      erasePiece();
      piece.position.x--;
      drawPiece();
  }
});

// Tick
setInterval(() => {
  if (game.running) {
    if (!game.currentPiece) {
      selectPiece();
    }
    erasePiece();
    useGravity();
    drawPiece();
    if (checkBelow() && checkTop()) {
      console.log('you lose');
      game.running = false;
    } else if (checkBelow()) {
      selectPiece();
    }
  }
}, 100);

// Game Functions
function selectPiece() {
  let colors = ['red', 'blue', 'green'];
  game.currentPiece = {
    shape: game.nextPiece,
    position: { x: Math.floor(game.width / 2) - 1, y: -1 },
    color: colors[Math.floor(Math.random() * 3)],
  };
  game.nextPiece = shapes[Math.floor(Math.random() * shapes.length)];
}

function erasePiece() {
  let piece = game.currentPiece;
  let x = piece.position.x;
  let y = piece.position.y;
  let counter = 0;
  for (let i = piece.shape.length - 1; i >= 0; i--) {
    if (y - counter < 0) {
      break;
    }
    let tableRow = table.children[y - counter];
    for (let j = 0; j < piece.shape[i].length; j++) {
      let tableCell = tableRow.children[j + x];
      if (piece.shape[i][j]) {
        tableCell.classList.remove(piece.color);
        game.board[y - counter][j + x] = 0;
      }
    }
    counter++;
  }
}

function drawPiece() {
  let piece = game.currentPiece;
  let x = piece.position.x;
  let y = piece.position.y;
  let counter = 0;
  for (let i = piece.shape.length - 1; i >= 0; i--) {
    if (y - counter < 0) {
      break;
    }
    let tableRow = table.children[y - counter];
    for (let j = 0; j < piece.shape[i].length; j++) {
      let tableCell = tableRow.children[j + x];
      if (piece.shape[i][j]) {
        tableCell.classList.add(piece.color);
        game.board[y - counter][j + x] = 1;
      }
    }
    counter++;
  }
}

function useGravity() {
  let piece = game.currentPiece;
  piece.position.x;
  piece.position.y++;
}

function checkBelow() {
  let piece = game.currentPiece;
  let bottomRow = piece.shape[piece.shape.length - 1];
  let x = piece.position.x;
  let y = piece.position.y;
  if (y >= game.board.length - 1) {
    return true;
  }
  if (bottomRow[0] && game.board[y + 1][x]) {
    return true;
  }
  if (bottomRow[1] && game.board[y + 1][x + 1]) {
    return true;
  }
  return false;
}

function checkTop() {
  let piece = game.currentPiece;
  let y = piece.position.y;
  // check if the top row of the piece is above the ceiling
  if (y - piece.shape.length < 0) {
    return true;
  }
  return false;
}
