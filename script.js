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

// Tick
setInterval(() => {
  if (game.running) {
    if (!game.currentPiece) {
      selectPiece();
    }
    drawPiece();
  }
}, 500);

// Game Functions
function selectPiece() {
  game.currentPiece = {
    shape: game.nextPiece,
    position: { x: Math.floor(game.width / 2) - 1, y: 0 },
    color: 'red',
  };
  game.nextPiece = shapes[0];
}

function erasePiece() {}

function drawPiece() {
  let piece = game.currentPiece;
  let x = piece.position.x;
  let y = piece.position.y;
  for (let i = 0; i < piece.shape.length; i++) {
    let tableRow = table.children[i];
    for (let j = 0; j < piece.shape[i].length; j++) {
      let tableCell = tableRow.children[j + x];
      if (piece.shape[i][j]) {
        tableCell.classList.add('red');
      }
    }
  }
}

function useGravity() {
  let piece = game.currentPiece;
  let x = piece.position.x;
  let y = piece.position.y++;
  for (let i = 0; i < piece.shape.length; i++) {
    let pieceRow = piece.shape[i];
    console.log();
    let cells = boardRows[i + y].children;
    for (let j = 0; j < pieceRow.length; j++) {
      boardRows[i + y - 2].children[x + j].classList.remove(piece.color);
      cells[x + j].classList.add(piece.color);
    }
  }
}
