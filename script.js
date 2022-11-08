// GAME STATE
const colors = ['red', 'purple', 'yellow', 'green', 'orange'];
const shapes = [
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
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
];
const game = {
  playing: false,
  timer: 0,
  currentPiece: shapes[Math.floor(Math.random() * shapes.length)],
  // refactor this
  currentColor: colors[Math.floor(Math.random() * colors.length)],
  positionY: -2,
  positionX: 0,
};

// DOM Elements
const playBtn = document.getElementById('play');
const timer = document.getElementById('timer');
const table = document.getElementById('table');
const loseTxt = document.getElementById('lose');

// Game Board
for (let i = 0; i < 30; i++) {
  let row = document.createElement('tr');
  table.appendChild(row);
  for (let j = 0; j < 15; j++) {
    let cell = document.createElement('td');
    cell.id = j + '-' + i;
    row.appendChild(cell);
  }
}

// Game Functions
function advanceTime() {
  if (game.playing === false) {
    return;
  }
  timer.innerText = ++game.timer;
}

function drawPiece() {
  let piece = game.currentPiece;
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      let cell = document.getElementById(
        j + game.positionX + '-' + (i + game.positionY)
      );
      if (cell && game.currentPiece[i][j]) {
        cell.classList.add(game.currentColor);
      }
    }
  }
  let atBottom = checkBottom();
  let atTop = checkTop();
  if (atBottom && atTop) {
    game.playing = false;
    loseTxt.innerText = 'YOU LOSE';
  } else if (atBottom) {
    selectNewPiece();
  }
}

function invokeGravity() {
  game.positionY++;
}

function selectNewPiece() {
  game.currentPiece = shapes[Math.floor(Math.random() * shapes.length)];
  game.currentColor = colors[Math.floor(Math.random() * colors.length)];
  game.positionY = -1 * game.currentPiece.length;
}

function removePiece() {
  let piece = game.currentPiece;
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      let cell = document.getElementById(
        j + game.positionX + '-' + (i + game.positionY)
      );
      if (cell) {
        cell.className = '';
      }
    }
  }
}

function checkBottom() {
  let piece = game.currentPiece;
  let tableBottom = table.children.length - 1;
  let pieceBottom = piece.length - 1 + game.positionY;
  // check bottom of table
  if (pieceBottom === tableBottom) {
    return true;
  }
  // check piece below
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (
        (piece[i][j] && i + 1 !== piece.length && !piece[i + 1][j]) || // edge piece, not bottom
        (i === piece.length - 1 && piece[i][j]) // bottom piece
      ) {
        let beneathX = j + game.positionX;
        let beneathY = i + game.positionY + 1;
        if (
          document.getElementById(beneathX + '-' + beneathY).classList.length
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkTop() {
  if (game.positionY < 0) {
    return true;
  }
  return false;
}

// Event Listeners
playBtn.addEventListener('click', function () {
  game.playing = !game.playing;
  if (game.playing) {
    playBtn.innerText = 'Pause';
  } else {
    playBtn.innerText = 'Start';
  }
});

window.addEventListener('keydown', (e) => {
  let piece = game.currentPiece;
  if (e.key === 'a' || e.key === 'ArrowLeft') {
    removePiece();
    game.positionX--;
    drawPiece();
  }
  if (e.key === 'd' || e.key === 'ArrowRight') {
    removePiece();
    game.positionX++;
    drawPiece();
  }
  if (e.key === 's' || e.key === 'ArrowDown') {
    removePiece();
    invokeGravity();
    drawPiece();
  }
});

// Tick
setInterval(function () {
  if (!game.playing) return;
  advanceTime();
  removePiece();
  invokeGravity();
  drawPiece();
}, 100);
