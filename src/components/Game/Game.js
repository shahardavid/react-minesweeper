import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import GameBoard from "../GameBoard/GameBoard";
import {
  createNewGameObject,
  handleChangeCellFlagStatus,
  handleRevealCell,
} from "./game-logic";
import GameSettings, {DEFAULT_HEIGHT, DEFAULT_MINES, DEFAULT_WIDTH} from "../GameSettings/GameSettings";
import GameBar from "../GameBar/GameBar";
import styled from 'styled-components';
import GameOver from "../GameOver/GameOver";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space:nowrap;
  background-color: #ffffff;
  height: 100vh;
  color: black;
  user-select: none
`
const PERSIST_STORAGE_ID = 'Game';
const NO_FLAGS_LEFT_MESSAGE = 'No flags left';

class Game extends Component {
  constructor(props){
    super(props);

    this.state = {
      ...createNewGameObject(DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_MINES),
      openSnackbar: true,
      snakebarMessage: ''
    }

    this.persistState = this.persistState.bind(this);
    this.handleStartNewGame = this.handleStartNewGame.bind(this);
    this.handleGameBoardCellClick = this.handleGameBoardCellClick.bind(this);
    this.handleSupermanModeChange = this.handleSupermanModeChange.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  handleStartNewGame(width, height, mines){
    this.setState({
      ...createNewGameObject(width, height, mines)
    })
  }

  handleGameBoardCellClick(cellRow, cellColumn, isShiftKey) {
    const {gameBoard, flags, incorrectFlags} = this.state;
    const cell = gameBoard[cellRow][cellColumn];

    if (isShiftKey) {
      const updateGameData =  handleChangeCellFlagStatus(cell, gameBoard, flags, incorrectFlags);

      if(updateGameData != null) {
        this.setState({
          gameBoard: updateGameData.gameBoard,
          isWin: updateGameData.isWin,
          flags: updateGameData.flags,
          incorrectFlags: updateGameData.incorrectFlags
        })
      } else if (!cell.isRevealed) {
        this.openSnakeBar(NO_FLAGS_LEFT_MESSAGE);
      }
    } else {
      const updateGameData = handleRevealCell(cell, gameBoard);

      if(updateGameData != null) {
        this.setState({
          gameBoard: updateGameData.gameBoard,
          isLose: updateGameData.isLose,
        })
      }
    }
  }

  handleSupermanModeChange(isSupermanMode){
    this.setState({isSupermanMode})
  }

  componentDidMount(){
    this.setState({
      ...JSON.parse(localStorage.getItem(PERSIST_STORAGE_ID))
    })

    window.addEventListener('beforeunload', this.persistState);
  }

  componentWillUnmount(){
    window.removeEventListener('beforeunload', this.persistState);
  }

  persistState(){
    localStorage.setItem(PERSIST_STORAGE_ID, JSON.stringify(this.state));
  }

  openSnakeBar(snakebarMessage){
    this.setState({
      openSnackbar: true,
      snakebarMessage
    })
  }

  handleSnackbarClose(){
    this.setState({
      openSnackbar: false
    })
  }

  render() {
    const {gameBoard, flags, isWin, isLose, isSupermanMode, openSnackbar, snakebarMessage} = this.state;

    return (
      <Container>
        <GameSettings onStartNewGame={this.handleStartNewGame}/>
        <GameOver isWin={isWin} isLose={isLose}/>
        <GameBar mines={flags} isSupermanMode={isSupermanMode} onSupermanModeChange={this.handleSupermanModeChange}/>
        <GameBoard board={gameBoard} onCellClick={this.handleGameBoardCellClick} isSupermanMode={isSupermanMode}/>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={this.handleSnackbarClose} message={snakebarMessage}
        />
      </Container>
    );
  }
}

export default Game;