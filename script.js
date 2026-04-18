function Gameboard() {
  const rows = 3;
  const columns = 3;
  let board = [];


  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push("");
    }
  }

  const getBoard = () => board;

  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell))
    console.log(boardWithCellValues);
  };

  return { getBoard, printBoard };
};

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  
  const board = Gameboard();
  let grid = board.getBoard(); 
  let playerOnescore = 0;
  let playerTwoscore = 0;
  let gameOver = false;

  const players = [
    {
      name: playerOneName,
      token: "O"
    },
    {
      name: playerTwoName,
      token: "X"
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;
  

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const checkWinner = () => {
    // //vertical
    for(i = 0; i< 3; i++ ) {
       if (grid[0][i] === "X"   && grid[1][i] === "X"  && grid[2][i] === "X" 
        ) {return true };
         if (grid[0][i] === "O"  && grid[1][i] === "O"  && grid[2][i] === "O" 
        ) {return true };
    };

    // horizontal
    for(i = 0; i< 3; i++ ) {
       if (grid[i][0] === "X"  && grid[i][1] === "X" && grid[i][2] === "X" 
        ) {return true };
        if (grid[i][0] === "O" && grid[i][1] === "O"  && grid[i][2] === "O" 
        ) {return true };
    };

    // diagonal
    if (grid[0][0] === "X" && grid[1][1] === "X" && grid[2][2] === "X" 
        ) {return true}
    else if(grid[0][0] === "O" && grid[1][1] === "O" && grid[2][2] === "O"
        ) {return true};

     if (grid[0][2] === "X" && grid[1][1] === "X"  && grid[2][0] === "X" 
        ) {return true}
      else if(grid[0][2] === "O"  && grid[1][1] === "O" && grid[2][0] === "0" 
        ) {return true};

    if(grid.every((row) => row.every((cell) => cell !=="")))
      return gameOver = true;

    return false;
  }

  const scoreBoard = () => {
    if(players[0] && checkWinner() === true) {
      playerOnescore ++;
      console.log(`${getActivePlayer().name} you Win.`)
      return true;
    } else if (players[1] && checkWinner() === true ) {
      playerTwoscore;
        console.log(`${getActivePlayer().name} you Win.`)
      return true;
    } 
    
  };

  const getplayerOnescore = () => playerOnescore;
  const getplayeTwoscore = () => playerTwoscore;

  const playRound = (row, column) => {
     
      if(grid[row][column] === "") {
       grid[row].splice(column, 1, getActivePlayer().token);
      } else {
        console.log("Already Taken");
        return;
      }

    if(checkWinner() === true) {
      console.log("it works!")
    };
     
     if(scoreBoard() === true) {
      console.log(" score works!")
    };
    // resetBoard();
    switchPlayerTurn();
    printNewRound();
  };


  printNewRound();

  return {
    playRound, switchPlayerTurn,getActivePlayer, checkWinner, getplayerOnescore, getplayerOnescore, getBoard: board.getBoard, grid};
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const createGrid = (n) => {
  for(let i=0; i<n; i++) {
    for (let j=0; j<n; j++) {
      let divChild = document.createElement("div");
      divChild.classList.add("child");
      divChild.id = `cell-${i}-${j}`;
      boardDiv.appendChild(divChild);
      console.log(boardDiv)
    } 
  }};
  createGrid(3);

  const updateScreen = () => {
    boardDiv.textContent = " ";
    const board = game.getBoard;
    const activePlayer = game.getActivePlayer;

    playerTurnDiv.textContent = `${activePlayer.name}s turn.`;

    children.forEach(child => {
      child.addEventListener("click", handleClick)
    })
  };

  function handleClick(e) {
    const child = e.target;
    const index = child.getAttribute('id');

     if (board[index] !== "" || gameOver) {
    return;
    
    checkWinner();
    switchPlayerTurn();
  }

  }

  const children = document.getElementsByClassName(".child");

};

ScreenController();