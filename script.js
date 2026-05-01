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

  return { getBoard, printBoard, board };
};

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two") 
  {
  
  const board = Gameboard();
  let grid = board.getBoard(); 
  let playerOnescore = 0;
  let playerTwoscore = 0;
  let isGameOver = false

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
        ) {return true};
     if(grid[0][2] === "O"  && grid[1][1] === "O" && grid[2][0] === "0" 
        ) {return true};

    if(grid.every((row) => row.every((cell) => cell !=="")))
      return isGameOver = true;

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

  // const endGame = () => {
  //   if (playerOnescore > playerTwoscore) {
  //     isGameOver = true;
  //     grid.splice(0);
  //     console.log(grid)
  //     switchPlayerTurn(GameController);
  //   }
  // };

  const getplayerOnescore = () => playerOnescore;
  const getplayeTwoscore = () => playerTwoscore;

  const playRound = (row, column) => {
     
      if(grid[row][column] === "") {
       grid[row].splice(column, 1, getActivePlayer().token);
      } else {
        console.log("Already Taken");
        return
      };

   if(checkWinner === true) {
    isGameOver = true;
   }
     scoreBoard();
    //  endGame();
    switchPlayerTurn();
    printNewRound();
  };


  printNewRound();

  return {
    playRound, switchPlayerTurn,getActivePlayer, checkWinner, players , scoreBoard,
    getplayerOnescore, getplayerOnescore, getBoard: board.getBoard, grid};
}



function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const cellDiv = document.querySelector(".child");
  const board = game.getBoard();
  var arr = [];

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;


    // if (game.scoreBoard === true) {
    //   playerTurnDiv.textContent = `${activePlayer.name}'s you Win...`
    // }

    // Render board squares
    board.forEach((row,column) => {
      row.forEach((cell, index) => {
        const cellButton = document.createElement("div");
        cellButton.classList.add("child");
        cellButton.dataset.column = column;
        cellButton.dataset.row = index  ;
        cellButton.textContent = cell;
        boardDiv.appendChild(cellButton);

      });
    });
    
  };


   const clearGame = () => {
    const cells = document.querySelectorAll(".child");
    cells.forEach(cell => {
      cell.innerHTML = "";
    });
    board.forEach(row => row.fill(""));
   };

   function handleReset(e){
    document.querySelector('#reset').addEventListener('click', function(){
     clearGame();
     console.log(board);
     
    });
}

handleReset();



  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    console.log(`click ${selectedRow}, ${selectedColumn}`);

  
    if(!selectedRow && !selectedColumn) return;
    
    game.playRound( selectedColumn, selectedRow);
    updateScreen();
  }

  
  boardDiv.addEventListener("click", clickHandlerBoard);
 

  // Initial render
  updateScreen();

}

ScreenController();