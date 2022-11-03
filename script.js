let board = document.getElementById('board');
let game = {
  running: false,
  width: 8,
  height: 30,
  score: 0,
  board: [],
};

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
console.log(game.board);
