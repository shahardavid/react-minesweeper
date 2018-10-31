import React, {PureComponent} from 'react';
import styled, { css } from 'styled-components';
import Flag from '../../assets/svg/flag.svg';
import Bomb from '../../assets/svg/bomb.svg';

const Container = styled.div`
  display: inline-flex;
  border: solid 1px;
  height: 30px;
  width: 30px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 2px;
  justify-content: center;
  border: 1px outset white;
  background-color: #d8d8d8;
  
  ${({isRevealed, isFlagged, isSupermanMode}) => !isRevealed && !isFlagged && isSupermanMode &&
  css`
    opacity: 0.5
  `};
  
  :hover {
    background-color: #d1dbff;
  }
  
  ${({isRevealed}) => isRevealed &&
  css`
    cursor: default;
    border: 1px solid #909090;
    background-color: #cacaca;
    
    :hover {
      background-color: #cacaca;
    }
  `};
`

const Item = styled.div`
  display: inline-block;
  align-self: center;
  user-select: none;
  font-weight: 600;
  color: black;
`

const FlagImage = styled.img`
  width: 13px;
`

const BombImage = styled.img`
  width: 13px;
`

class GameBoardCell extends PureComponent {
  constructor(){
    super();

    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleCellClick(event){
    const {onClick, row, column} = this.props;
    const isShiftKey = event.shiftKey === true;

    onClick(row, column, isShiftKey);
  }

  renderItemContent(){
    const {isRevealed, isMine, numberOfNearbyMines, isFlagged, isSupermanMode} = this.props;
    let ItemContent = '\u00a0';

    if(isFlagged) {
      ItemContent = <FlagImage src={Flag} alt='Flag'/>
    } else if(isRevealed || isSupermanMode) {
      if(isMine){
        ItemContent = <BombImage src={Bomb} alt='Bomb'/>;
      } else if (numberOfNearbyMines > 0){
        ItemContent = <span style={{color: this.getNumberOfNearbyMinesItemContentColor()}}>{numberOfNearbyMines}</span>
      }
    }

    return ItemContent;
  }

  getNumberOfNearbyMinesItemContentColor(){
    const {numberOfNearbyMines} = this.props;

    let color = '';
    switch (numberOfNearbyMines) {
      case 1:
        color = '#0a3fff';
        break;
      case 2:
        color = '#08abb3';
        break;
      case 3:
        color = '#ff0000';
        break;
      case 4:
        color = '#ff00f7';
        break;
      case 5:
        color = '#ff8100';
        break;
      case 6:
        color = '#000000';
        break;
      case 7:
        color = '#6baf12';
        break;
      case 8:
        color = '#0bca69';
        break;
      default:
    }

    return color;
  }

  render() {
    const {isRevealed, isSupermanMode, isFlagged} = this.props;

    return (
      <Container onClick={this.handleCellClick} isRevealed={isRevealed} isFlagged={isFlagged} isSupermanMode={isSupermanMode}>
        <Item>
          {this.renderItemContent()}
        </Item>
      </Container>
    );
  }

}

export default GameBoardCell;