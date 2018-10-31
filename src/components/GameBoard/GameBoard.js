import React, { Component } from 'react';
import styled from 'styled-components';
import GameBoardCell from "./GameBoardCell";

const Container = styled.div`
  border: 2px solid #d6d6d6;
  border-radius: 2px;
  margin: 10px;
`

class GameBoard extends Component {

  render() {
    const {board, onCellClick, isSupermanMode} = this.props;
    return (
      <Container>
        {
          board.map((row, rowIndex) => (
            <div key={rowIndex}>
              {
                row.map((cell, columnIndex)=>
                  <GameBoardCell  key={columnIndex} {...cell} onClick={onCellClick} isSupermanMode={isSupermanMode}/>)
              }
            </div>
          ))
        }
      </Container>
    );
  }
}

export default GameBoard;