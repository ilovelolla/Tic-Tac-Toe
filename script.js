function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];


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
  const grid = board.getBoard(); 

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
    //vertical
    for(i = 0; i< 3; i++ ) {
       if (grid[0][i]  && grid[1][i] && grid[2][i] != "" 
        ) return true ;
    };
    // horizontal
    for(i = 0; i< 3; i++ ) {
       if (grid[i][0]  && grid[i][1]&& grid[i][2] != "" 
        ) return true ;
    };

    //diagonal
    if (grid[0][0]  && grid[1][1] && grid[2][2] != "" 
        ) return true ;

    else if (grid[0][2]  && grid[1][1] && grid[2][0] != "" 
        ) return true ;

    return false;
  }


  const playRound = (row, column) => {
     
      if(grid[row][column] === "") {
       grid[row].splice(column, 1, getActivePlayer().token);
      } else {
        console.log("Already Taken");
        return;
      }

    if(checkWinner()== true) {
      console.log("it works!")
    };
    switchPlayerTurn();
    printNewRound();
  };


  printNewRound();

  return {
    playRound,
    getActivePlayer,
    checkWinner
  };
}

const game = GameController();
// horizontal
// game.playRound(1,0)
// game.playRound(0,0)
// game.playRound(2,0)
// game.playRound(0,1)
// game.playRound(2,2)
// game.playRound(0,2)


