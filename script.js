// GAME STATE
let game = {
  playing: false,
  timer: 0,
  currentPiece: [
    [1, 1],
    [1, 1],
  ],
  positionY: 0,
};

// DOM Elements
let playBtn = document.getElementById('play');
let timer = document.getElementById('timer');
let table = document.getElementById('table');

playBtn.addEventListener('click', function () {
  game.playing = !game.playing;
  if (game.playing) {
    playBtn.innerText = 'Pause';
  } else {
    playBtn.innerText = 'Start';
  }
});

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
      document
        .getElementById(j + '-' + (i + game.positionY))
        .classList.add('red');
    }
  }
}

function invokeGravity() {
  game.positionY++;
}

function removePiece() {
  let piece = game.currentPiece;
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      let cell = document.getElementById(j + '-' + (i + game.positionY));
      cell.classList.remove('red');
    }
  }
}

// Tick
setInterval(function () {
  if (!game.playing) return;
  advanceTime();
  removePiece();
  invokeGravity();
  drawPiece();
}, 1000);
