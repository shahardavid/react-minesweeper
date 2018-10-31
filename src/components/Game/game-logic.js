export const createNewGameObject = (width, height, mines) => {
  return {
    gameBoard: generateGameBoard(width, height, mines),
    flags: mines,
    incorrectFlags: 0,
    isWin: false,
    isLose: false,
    isSupermenMode: false,
  }
}

const generateGameBoard = (width, height, mines) => {
  const gameBoard =  Array.from({length: height}, (value, row) => Array.from({length: width}, (value, column) => (
    {
      row,
      column,
      isRevealed: false,
      isMine: false,
      numberOfNearbyMines: 0,
      isFlagged: false
    }
  )));

  setMinesCells(gameBoard, mines);
  setNonMinesCells(gameBoard);
  return gameBoard;
}

const setNonMinesCells = (gameBoard) => {
  gameBoard.forEach((row) => {
    row.forEach((cell) => {
      cell.numberOfNearbyMines = countCellNearbyMines(gameBoard, cell);
    })
  });

  return gameBoard;
}

export const revealBoard = (gameBoard) => {
  gameBoard.forEach(row => row.forEach(cell => cell.isRevealed = true));
}

export const revealCell = (gameBoard, cell) => {
  cell.isRevealed = true;
  if (cell.isMine) {
    return false;
  } else if (cell.numberOfNearbyMines === 0) {
    cell.isRevealed = true;
    let emptyCellsToReveal = [cell];

    do {
      let emptyCellToReveal = emptyCellsToReveal.pop();

      if (emptyCellToReveal.numberOfNearbyMines === 0) {
        let emptyCellsAdjacent = getCellAdjacentCells(gameBoard, emptyCellToReveal).filter(isRevealableCell);
        emptyCellsAdjacent.forEach(cell => cell.isRevealed = true);
        emptyCellsToReveal = emptyCellsToReveal.concat(emptyCellsAdjacent.filter(cell => cell.numberOfNearbyMines === 0))
      }
    } while (emptyCellsToReveal.length !== 0);
  }
}

const isRevealableCell = (cell) => (!cell.isMine && !cell.isRevealed && !cell.isFlagged);

const countCellNearbyMines = (gameBoard, cell) => {
  let nearbyMines = 0;

  if(!cell.isMine) {
    const adjacentCells = getCellAdjacentCells(gameBoard, cell);
    nearbyMines = adjacentCells.reduce((totalMines, cell) => cell.isMine ? totalMines + 1 : totalMines, 0);
  }

  return nearbyMines;
}

const getCellAdjacentCells = (gameBoard, cell) => {
  const gameBoardWidth = gameBoard[0].length;
  const gameBoardHeight = gameBoard.length;
  const { row: cellRow, column : cellColumn} = cell;

  const adjacentCells = [];

  //Top-left
  if(cellRow - 1 >= 0 && cellColumn - 1 >= 0) {
    adjacentCells.push(gameBoard[cellRow - 1][cellColumn - 1]);
  }
  //Top
  if(cellRow - 1 >= 0) {
    adjacentCells.push(gameBoard[cellRow - 1][cellColumn]);
  }
  //Top-right
  if(cellRow - 1 >= 0 && cellColumn + 1 < gameBoardWidth) {
    adjacentCells.push(gameBoard[cellRow - 1][cellColumn + 1]);
  }
  //Right
  if(cellColumn + 1 < gameBoardWidth) {
    adjacentCells.push(gameBoard[cellRow][cellColumn + 1]);
  }
  //Bottom-right
  if(cellRow + 1 < gameBoardHeight && cellColumn + 1 < gameBoardWidth) {
    adjacentCells.push(gameBoard[cellRow + 1][cellColumn + 1]);
  }
  //Bottom
  if(cellRow + 1 < gameBoardHeight) {
    adjacentCells.push(gameBoard[cellRow + 1][cellColumn]);
  }
  //Bottom-left
  if(cellRow + 1 < gameBoardHeight && cellColumn - 1 >= 0) {
    adjacentCells.push(gameBoard[cellRow + 1][cellColumn - 1]);
  }
  //Left
  if(cellColumn - 1 >= 0) {
    adjacentCells.push(gameBoard[cellRow][cellColumn - 1]);
  }

  return adjacentCells;
}

const setMinesCells = (gameBoard, mines) => {
  const minesCellsNumbers = new Set();
  const gameBoardWidth = gameBoard[0].length;
  const gameBoardHeight = gameBoard.length;
  const totalCellsNumber = gameBoardWidth * gameBoardHeight;

  while(mines > 0 ){
    let mineSet = false;
    let randomCellNumber = Math.floor((Math.random() * ((totalCellsNumber) - 1)));
    do {
      if(minesCellsNumbers.has(randomCellNumber)){
        randomCellNumber = (randomCellNumber + 1) % totalCellsNumber;
      } else {
        minesCellsNumbers.add(randomCellNumber);
        mineSet = true;
      }
    } while (!mineSet)

    mines--;
  }

  minesCellsNumbers.forEach(mineCellNumber => gameBoard[Math.floor(mineCellNumber / gameBoardWidth)][mineCellNumber % gameBoardWidth].isMine = true)

  return gameBoard;
}

export const handleChangeCellFlagStatus = (cell, gameBoard, flags, incorrectFlags) => {
  if (!cell.isRevealed && (cell.isFlagged || flags > 0)) {
    cell.isFlagged = !cell.isFlagged;
    let isWin = false;
    const flagsNewValue = flags + (cell.isFlagged ? -1 : 1);

    if (!cell.isMine) {
      incorrectFlags = cell.isFlagged ? incorrectFlags + 1 : incorrectFlags - 1;
    }

    if (flagsNewValue === 0 && incorrectFlags === 0) {
      isWin = true;
      revealBoard(gameBoard);
    }

    return {
      gameBoard,
      isWin,
      flags: flagsNewValue,
      incorrectFlags
    }
  }
}

export const handleRevealCell = (cell, gameBoard) => {
  if (!cell.isFlagged && !cell.isRevealed) {
    let isLose = false;

    if (cell.isMine) {
      isLose = true;
      revealBoard(gameBoard);
    } else {
      revealCell(gameBoard, cell);
    }

    return {
      gameBoard,
      isLose
    }
  }
}