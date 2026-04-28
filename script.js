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
        return
      };

    if(checkWinner() === true) {
      console.log("it works!")
    };
     
     if(scoreBoard() === true) {
      console.log(" score works!")
    }
    switchPlayerTurn();
    printNewRound();
  };


  printNewRound();

  return {
    playRound, switchPlayerTurn,getActivePlayer, checkWinner, players ,
    getplayerOnescore, getplayerOnescore, getBoard: board.getBoard, grid};
}



function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const cellDiv = document.querySelector(".child")
  var arr = [];

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    // Render board squares
    board.forEach((row,column) => {
      row.forEach((cell, index) => {
        const cellButton = document.createElement("div");
        cellButton.classList.add("child");
        cellButton.dataset.column = column;
        cellButton.dataset.row = index  ;
        cellButton.textContent = cell;
        console.log(column)
        boardDiv.appendChild(cellButton)

      });
    });
  };



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




















  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
}
// function ScreenController() {
//   const game = GameController();
//   const playerTurnDiv = document.querySelector('.turn');
//   const boardDiv = document.querySelector('.board');
//   var arr = [];

//   // const createGrid = (n) => {
//   // for(let i=0; i<n; i++) {
//   //   arr[i] = []
//   //   for (let j=0; j<n; j++) {
//   //     let divChild = document.createElement("div");
//   //     divChild.classList.add("child");
//   //     divChild.setAttribute("row", [i]);
//   //     divChild.setAttribute("column", [j]);
//   //     boardDiv.appendChild(divChild);
//   //     arr[i][j] = divChild;    
//   //   } 
//   // }};
//   // createGrid(3);

//    const children = document.querySelectorAll(".child");

//   const updateScreen = () => {
//     boardDiv.textContent = " ";
//     const board = game.getBoard;
//     const activePlayer = game.getActivePlayer;

//     playerTurnDiv.textContent = `${activePlayer.name}s turn.`;

//         board.forEach(row => {
//       row.forEach((cell, index) => {
//         // Anything clickable should be a button!!
//         const cellButton = document.createElement("div");
//         cellButton.classList.add("child");
//         // Create a data attribute to identify the column
//         // This makes it easier to pass into our `playRound` function 
//         cellButton.dataset.column = index
//         // cellButton.textContent = cell.getValue();
//         boardDiv.appendChild(cellButton);
//       })
//     });

//   };

//   children.forEach(childs => {
//      childs.addEventListener("click", handleClick)
//     });

//   function handleClick(e) {
//     const child = e.target;
//     console.log("hekolo")
//     game.grid;
//     game.checkWinner();
//     game.switchPlayerTurn();
//   }
  
// };

ScreenController();