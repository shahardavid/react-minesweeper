import React, {Component} from 'react';
import styled from "styled-components";
import Bomb from '../../assets/svg/bomb.svg';
import SupermanModeOn from "../../assets/svg/superman_symbol_color.svg";
import SupermanModeOff from "../../assets/svg/superman_symbol_gray.svg";

const Container = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  width: 140px;
`

const BarItem = styled.div`
  padding: 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;   
`

const BombImage = styled.img`
  width: 23px;
`

const SupermanModeImage = styled.img`
  width: 25px;
  cursor: pointer;
`

class GameBar extends Component {
  constructor(){
    super();

    this.handleSupermanModeChange = this.handleSupermanModeChange.bind(this);
  }

  handleSupermanModeChange(){
    const {onSupermanModeChange, isSupermanMode} = this.props;


    onSupermanModeChange(!isSupermanMode)
  }

  render() {
    const {mines, isSupermanMode} = this.props;

    return (
      <Container>
        <BarItem>
          <BombImage src={Bomb} alt='Bombs to flag'/> : {mines}
        </BarItem>
        <BarItem>
          <SupermanModeImage src={isSupermanMode? SupermanModeOn : SupermanModeOff} alt='Superman mode' onClick={this.handleSupermanModeChange}/>
        </BarItem>
      </Container>
    );
  }
}

export default GameBar;