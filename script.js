// Game State and Classes
let game = {
  running: false,
  width: 15,
  height: 30,
  score: 0,
  board: [],
};

// class Piece {
//   constructor(shape, color) {
//     (this.shape = shape), (this.color = color), (this.x = game.width / 2);
//     this.y = 0;
//   }
// }

// let shapes = {
//   square: [
//     [1, 1],
//     [1, 1],
//   ],
//   leftL: [
//     [0, 1],
//     [0, 1],
//     [0, 1],
//     [1, 1],
//   ],
//   rightL: [
//     [1, 0],
//     [1, 0],
//     [1, 0],
//     [1, 1],
//   ],
// };

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
let board = document.getElementById('board');
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
  board.appendChild(row);
}

// Tick
setInterval(() => {
  if (game.running) {
    console.log('running...');
  }
}, 500);
