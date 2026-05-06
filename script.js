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
  let moveCount = 0;
  let maxRound = 3;

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
        ) {return "X" };
         if (grid[0][i] === "O"  && grid[1][i] === "O"  && grid[2][i] === "O" 
        ) {return "O" };
    };

    // horizontal
    for(i = 0; i< 3; i++ ) {
       if (grid[i][0] === "X"  && grid[i][1] === "X" && grid[i][2] === "X" 
        ) {return "X" };
        if (grid[i][0] === "O" && grid[i][1] === "O"  && grid[i][2] === "O" 
        ) {return "O" };
    };

    // diagonal
    if (grid[0][0] === "X" && grid[1][1] === "X" && grid[2][2] === "X" 
        ) {return "X"}
    else if(grid[0][0] === "O" && grid[1][1] === "O" && grid[2][2] === "O"
        ) {return "O"};

     if (grid[0][2] === "X" && grid[1][1] === "X"  && grid[2][0] === "X" 
        ) {return "X"};
     if(grid[0][2] === "O"  && grid[1][1] === "O" && grid[2][0] === "O" 
        ) {return "O"};

    // if(grid.every((row) => row.every((cell) => cell !=="")));

    };

    const checkTie = () => {
      if(grid.every((row) => row.every((cell) => cell !=="")));
      return true;
    }

  const scoreBoard = () => {
    if(players[0] && checkWinner() === "X") {
      playerOnescore ++;
       moveCount++;
      console.log(`${getActivePlayer().name} you Win. Score: ${playerOnescore} Move Count: ${moveCount}`)
    } else if (players[1] && checkWinner() === "O")  {
      playerTwoscore++;
       moveCount++;
        console.log(`${getActivePlayer().name} you Win. Score: ${playerTwoscore} Move Count: ${moveCount}`)
    } ;
    if (moveCount === maxRound) {
      endGame();
    };
    return {moveCount, playerOnescore, playerTwoscore};
  };

  const endGame = () => {
    if (playerOnescore > playerTwoscore ) {
      console.log(`You win. You just beat ${playerTwoName}`)
    } else if ( playerTwoscore > playerOnescore) {
      console.log(`You win. You just beat ${playerOneName}`)
    }
  };

  const getplayerOnescore = () => playerOnescore;
  const getplayerTwoscore = () => playerTwoscore;

  const playRound = (row, column) => {
     
      if(grid[row][column] === "") {
       grid[row].splice(column, 1, getActivePlayer().token);
      } else {
        alert("Already Taken")
        return
      }; 
    checkWinner();
    scoreBoard();
    switchPlayerTurn();
    printNewRound();
  };


  printNewRound();

  return {
    playRound, switchPlayerTurn,getActivePlayer, checkWinner, players , scoreBoard, checkTie,
  getplayerOnescore, getplayerTwoscore, getBoard: board.getBoard, grid, maxRound, moveCount};
};



function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const cellDiv = document.querySelector(".child");
  const board = game.getBoard();
  const playerOnescore = document.querySelector("#playerOnescore");
  const playerTwoscore = document.querySelector("#playerTwoscore");

  var arr = [];

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    playerOnescore.innerHTML = `Player One Score:${game.getplayerOnescore()}`;
    playerTwoscore.innerHTML = `Player Two Score:${game.getplayerTwoscore()}`;

    // Render board squares
    board.forEach((row,column) => {
      row.forEach((cell, index) => {
        const cellButton = document.createElement("div");
        cellButton.classList.add("child");
        cellButton.dataset.column = column;
        cellButton.dataset.row = index  ;
        cellButton.textContent = cell;
        boardDiv.appendChild(cellButton);
      });});

    
  };


  // Add event listener for the board
    function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    console.log(`click ${selectedRow}, ${selectedColumn}`);
     
    if(!selectedRow && !selectedColumn) return;
    
    game.playRound( selectedColumn, selectedRow);
    updateScreen();
    disableGrid()
  
  }
    boardDiv.addEventListener("click", clickHandlerBoard);

    //Stop Grid Execute
    const disableGrid = (e) => {
      if (game.checkWinner() === "X" || game.checkWinner() === "O"){
        boardDiv.removeEventListener("click", clickHandlerBoard);
      }};

  
  // New round game
   function handleNewRound(e){
    document.querySelector('#newRound').addEventListener('click', function(){
     const cells = document.querySelectorAll(".child");
    cells.forEach(cell => {
      cell.innerHTML = "";});
     board.forEach(row => row.fill(""));
      boardDiv.addEventListener("click", clickHandlerBoard);
     })};

  //Reset Game
     function resetGame(e) {
      document.querySelector('#reset').addEventListener('click', function(){
      const cells = document.querySelectorAll(".child");
      cells.forEach(cell => {
      cell.innerHTML = "";});
      board.forEach(row => row.fill(""));
      })
     };
  
     const resetboardGame = (e) => {
      
     }


 

  // Initial render
  updateScreen();
  handleNewRound();
  resetGame();

}

ScreenController();